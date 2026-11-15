/* M4th offline learning UI. No remote scripts, analytics or account required. */
(function () {
  "use strict";
  var lessons = window.UNIT2.slice();
  var screen = "home", activeId = "2.1", current = null, notice = "";
  var defaults = {skills:{},byDay:{},lastActive:"",lastLesson:"2.1",reminder:false,reminderTime:"18:00",imports:[]};
  function read() {
    try {
      var raw = window.M4th ? window.M4th.load() : localStorage.getItem("m4th-state");
      var data = JSON.parse(raw || "{}");
      return Object.assign({},defaults,data);
    } catch(e) { return Object.assign({},defaults); }
  }
  var state = read();
  if (!state.skills || typeof state.skills !== "object") state.skills={};
  if (!state.byDay || typeof state.byDay !== "object") state.byDay={};
  if (!Array.isArray(state.imports)) state.imports=[];
  function save() {
    var json=JSON.stringify(state);
    try { if(window.M4th) window.M4th.save(json); else localStorage.setItem("m4th-state",json); }
    catch(e){console.log("M4thSaveError "+e.message);}
  }
  function day(time) {
    var d=new Date(time === undefined ? Date.now():time);
    return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  }
  function shiftDays(key,num) {
    var a=key.split("-").map(Number),d=new Date(a[0],a[1]-1,a[2]+num);
    return day(d.getTime());
  }
  function streak() {
    var d=day(),count=0;
    if ((state.byDay[d]||0)<3) d=shiftDays(d,-1);
    for(var i=0;i<365;i++) {
      if ((state.byDay[d]||0)<3) break;
      count++;d=shiftDays(d,-1);
    }
    return count;
  }
  function escape(s) {
    return String(s === undefined ? "":s).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function rich(s) {
    return escape(s).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>");
  }
  function find(id) { return lessons.find(function(l){return l.id===id;}); }
  function skill(id) {
    if(!state.skills[id]) state.skills[id]={attempts:0,correct:0,tiers:[0,0,0],recent:[],proficientAt:0,reviewSuccess:0,mastered:false,dueAt:0,lastTemplate:-1};
    return state.skills[id];
  }
  function status(id) {
    var p=skill(id);
    return p.mastered?"Mastered":p.proficientAt?"Proficient":p.attempts?"Learning":"New";
  }
  function due(id) {
    var p=skill(id);
    return p.proficientAt && p.dueAt && Date.now()>=p.dueAt;
  }
  function dueCount() { return lessons.filter(function(l){return due(l.id);}).length; }
  function masteredCount() { return lessons.filter(function(l){return skill(l.id).mastered;}).length; }
  function record(question,correct) {
    var p=skill(activeId), today=day();
    state.lastActive=today;
    state.lastLesson=activeId;
    state.byDay[today]=(state.byDay[today]||0)+1;
    var keys=Object.keys(state.byDay);
    if (keys.length>100) keys.sort().slice(0,keys.length-100).forEach(function(k){delete state.byDay[k];});
    if (!current.hintUsed) {
      p.attempts++;if(correct) {p.correct++;p.tiers[question.tier-1]++;}
      p.recent.push(Boolean(correct));p.recent=p.recent.slice(-5);
      if (!p.proficientAt && p.attempts>=8 && p.tiers.every(function(v){return v>=2;}) &&
          p.recent.filter(Boolean).length>=4) {
        p.proficientAt=Date.now();p.dueAt=Date.now()+86400000;
      } else if (p.proficientAt && p.dueAt && Date.now()>=p.dueAt) {
        if (correct) {
          p.reviewSuccess++;
          if (p.reviewSuccess>=2) {
            p.mastered=true;p.dueAt=Date.now()+7*86400000;
          } else p.dueAt=Date.now()+3*86400000;
        } else {
          p.reviewSuccess=Math.max(0,p.reviewSuccess-1);
          p.mastered=false;p.dueAt=Date.now()+86400000;
        }
      }
    }
    save();
  }
  function action(a,id) {
    notice="";
    if(a==="home"||a==="library"||a==="reviews"||a==="settings") {
      screen=a;current=null;draw();return;
    }
    if(a==="lesson") { activeId=id;state.lastLesson=id;save();screen="lesson";current=null;draw();return; }
    if(a==="practice") {activeId=id||activeId;screen="practice";current=null;next();return;}
    if(a==="next") {next();return;}
    if(a==="hint" && current && !current.done) {current.hintUsed=true;draw();return;}
    if(a==="choice" && current && !current.done) {
      current.selected=Number(id);draw();return;
    }
    if(a==="check" && current && !current.done) {
      var answer = current.q.kind==="choice" ? current.selected :
        (document.getElementById("answer")||{}).value;
      if (answer===undefined || answer===null || String(answer).trim()==="") {notice="Enter an answer first.";drawNotice();return;}
      var right=window.Engine.check(current.q,answer);
      current.done=true;current.correct=right;current.submitted=String(answer);
      record(current.q,right);draw();return;
    }
    if(a==="key") {insertKey(id);return;}
    if(a==="import") {importCourse();return;}
  }
  function pickTemplate(lesson) {
    var p=skill(lesson.id);
    var needed=[];
    if(!p.proficientAt) {
      lesson.problems.forEach(function(q,i){if(p.tiers[q.tier-1]<2)needed.push(i);});
    }
    var pool=needed.length ? needed : lesson.problems.map(function(_,i){return i;});
    var eligible=pool.filter(function(i){return i!==p.lastTemplate;});
    if(eligible.length)pool=eligible;
    var which=pool[Math.floor(Math.random()*pool.length)];
    p.lastTemplate=which;
    return which;
  }
  function next() {
    var lesson=find(activeId);
    if(!lesson) {screen="home";draw();return;}
    var which=pickTemplate(lesson);
    var seed=Math.floor(Math.random()*2147483647)+1;
    try {
      current={q:window.Engine.generate(lesson,which,seed),selected:null,done:false,hintUsed:false,correct:false};
    } catch(e) {notice="Problem generator failed: "+e.message;current=null;}
    screen="practice";draw();
  }
  function insertKey(key) {
    var el=document.getElementById("answer");
    if(!el)return;
    var start=el.selectionStart,end=el.selectionEnd,s=el.value;
    if(key==="back") {
      if(start===end && start>0)start--;
      el.value=s.slice(0,start)+s.slice(end);
    } else {
      el.value=s.slice(0,start)+key+s.slice(end);start+=key.length;
    }
    el.focus();el.setSelectionRange(start,start);notice="";
  }
  function header() {
    return '<div class="top"><div class="brand">M<span>4</span>th</div><div class="right">'+
      '<span class="muted" style="font-size:13px">◷ '+streak()+' day streak</span>'+
      '<button class="gear" data-action="settings" aria-label="Settings">⚙</button></div></div>';
  }
  function nav() {
    var items=[["home","⌂","Learn"],["reviews","↻","Review"],["library","▦","Courses"]];
    return '<nav class="bottomnav">'+items.map(function(t){return '<button data-action="'+t[0]+'" class="'+
      ((screen===t[0]||(screen==="lesson"&&t[0]==="library")||(screen==="practice"&&t[0]==="reviews"))?"current":"")+
      '"><span class="nav-icon">'+t[1]+'</span>'+t[2]+'</button>';}).join("")+'</nav>';
  }
  function progressBar(pct) {return '<div class="progress"><div style="width:'+Math.max(0,Math.min(100,pct))+'%"></div></div>';}
  function lessonCard(l) {
    var st=status(l.id);
    return '<button class="lesson-card" data-action="lesson" data-id="'+escape(l.id)+'">'+
      '<div class="row"><span class="lesson-number">'+escape(l.id)+'</span>'+
      '<span class="pill '+(st==="Mastered"?"good":"")+'">'+escape(st)+'</span></div>'+
      '<h3>'+escape(l.title)+'</h3><p>'+escape(l.subtitle)+'</p></button>';
  }
  function home() {
    var done=masteredCount(),last=find(state.lastLesson)||lessons[0];
    return '<div class="eyebrow">Your mathematics workspace</div><h1>Learn at your own pace.</h1>'+
      '<p class="subtitle">Short lessons, endless practice, and explanations when you need them.</p>'+
      '<div class="stats"><div class="stat"><strong>'+done+'/15</strong><small>Mastered</small></div>'+
      '<div class="stat"><strong>'+dueCount()+'</strong><small>Due for review</small></div>'+
      '<div class="stat"><strong>'+streak()+'</strong><small>Day streak</small></div></div>'+
      '<div class="panel"><div class="eyebrow">Continue learning</div><h2>'+escape(last.title)+'</h2>'+
      '<p class="muted">'+escape(last.subtitle)+'</p>'+progressBar(done/15*100)+
      '<button class="btn primary block" data-action="lesson" data-id="'+escape(last.id)+'">Continue lesson →</button></div>'+
      '<div class="row" style="margin-top:27px"><h2>Up next</h2><button class="btn minimal" data-action="library">All lessons →</button></div>'+
      lessons.filter(function(l){return !skill(l.id).mastered;}).slice(0,3).map(lessonCard).join("")+
      (done===15?'<div class="banner success">All 15 lessons mastered. Keep reviewing to retain them.</div>':'');
  }
  function library() {
    return '<div class="eyebrow">Course library</div><h1>Precalculus</h1>'+
      '<p class="subtitle">Unit 2 · Exponential and Logarithmic Functions. '+lessons.length+' complete lessons, with new generated problems every time.</p>'+
      progressBar(masteredCount()/Math.max(1,lessons.length)*100)+
      lessons.map(lessonCard).join("")+
      '<div class="panel"><h3>Author your own course</h3><p>Other courses can be added as versioned JSON with the same lesson blocks and question templates.</p>'+
      '<button class="btn" data-action="settings">Import a course →</button></div>';
  }
  function visualBlock(l) {
    if(!l.visual)return "";
    return '<div class="visual" id="visual"></div><small>Graphs and diagrams are drawn locally from the lesson data.</small>';
  }
  function lesson() {
    var l=find(activeId);if(!l)return home();
    var p=skill(l.id);
    var st=status(l.id);
    return '<div class="row"><button class="btn minimal" data-action="library">← Courses</button>'+
      '<span class="pill '+(st==="Mastered"?"good":"")+'">'+st+'</span></div>'+
      '<div class="eyebrow" style="margin-top:18px">Unit 2 · Lesson '+escape(l.id)+'</div>'+
      '<h1>'+escape(l.title)+'</h1><p class="subtitle">'+escape(l.subtitle)+'</p>'+
      (p.proficientAt?'<div class="banner '+(p.mastered?"success":"")+'">'+
      (p.mastered?"Mastered through spaced practice.":"Proficient. Delayed review is required for mastery.")+
      '</div>':'')+
      visualBlock(l)+
      '<div class="panel"><div class="eyebrow">Concepts and methods</div>'+
      l.sections.map(function(s){return '<section class="section"><h3>'+escape(s.title)+'</h3><p>'+rich(s.text)+'</p></section>';}).join("")+
      '</div><div class="panel"><div class="eyebrow">Worked examples</div>'+
      l.worked.map(function(w,i){return '<div class="worked"><strong>Example '+(i+1)+'</strong><p>'+rich(w.prompt)+'</p>'+
      w.steps.map(function(s,j){return '<div class="step"><span class="step-index">'+(j+1)+'.</span>'+rich(s)+'</div>';}).join("")+'</div>';}).join("")+
      '</div><div class="panel"><h3>Common mistakes</h3><ul>'+l.pitfalls.map(function(m){return '<li><p>'+rich(m)+'</p></li>';}).join("")+'</ul></div>'+
      '<div class="panel"><h3>Practice this skill</h3><p>Three difficulty levels. Fresh values, immediate feedback, and explanations after each answer.</p>'+
      '<button class="btn primary block" data-action="practice" data-id="'+escape(l.id)+'">Start unlimited practice →</button></div>';
  }
  function answerKeyboard() {
    var keys=[["7","7"],["8","8"],["9","9"],["/","÷"],["^","xʸ"],["sqrt(","√"],
      ["4","4"],["5","5"],["6","6"],["*","×"],["(","("],[")",")"],
      ["1","1"],["2","2"],["3","3"],["-","−"],["pi","π"],["log(","log"],
      ["0","0"],[".", "."],["+","+"],["e","e"],["ln(","ln"],["back","⌫"]];
    return '<div class="math-keys">'+keys.map(function(k){return '<button class="key" data-action="key" data-id="'+escape(k[0])+'" type="button">'+escape(k[1])+'</button>';}).join("")+'</div>';
  }
  function feedback() {
    if(!current || !current.done)return "";
    var q=current.q,good=current.correct;
    return '<div class="banner '+(good?"success":"error")+'"><strong>'+(good?"Correct.":"Not quite.")+'</strong>'+
      (!good && q.kind==="number"?'<p>Expected: '+escape(window.Engine.fmt(q.answer))+'</p>':"")+
      '<div style="margin-top:13px"><strong>Explanation</strong></div><ol class="steps">'+
      q.steps.map(function(s){return '<li>'+rich(s)+'</li>';}).join("")+'</ol>'+
      (!good?'<p>Try a new variation of this skill to check your understanding.</p>':"")+
      (current.hintUsed?'<small>Hints help learning; this attempt does not increase your mastery score.</small>':"")+
      '</div><button class="btn primary block" data-action="next">Next problem →</button>';
  }
  function practice() {
    var l=find(activeId),p=skill(activeId);
    if(!l)return home();
    var q=current&&current.q;
    var top='<div class="row"><button class="btn minimal" data-action="lesson" data-id="'+escape(activeId)+'">← Lesson</button>'+
      '<span class="pill">'+escape(status(activeId))+'</span></div>'+
      '<div class="eyebrow" style="margin-top:18px">Practice · '+escape(l.id)+'</div><h2>'+escape(l.title)+'</h2>'+
      '<small>'+p.correct+' correct of '+p.attempts+' independent attempts · difficulty coverage '+p.tiers.map(function(x){return Math.min(2,x);}).join("/")+'</small>';
    if(!q)return top+'<div class="banner error">'+escape(notice||"Problem unavailable")+'</div><button class="btn" data-action="next">Try another</button>';
    var body='<div class="problem">'+rich(q.prompt)+'</div>'+
      '<div class="muted" style="font-size:13px;margin-bottom:9px">Level '+q.tier+' of 3</div>';
    if(q.kind==="choice") {
      body+='<div class="choices">'+q.options.map(function(o,i){
        return '<button class="choice '+(current.selected===i?"selected":"")+'" data-action="choice" data-id="'+i+'" '+(current.done?"disabled":"")+'>'
          +rich(o.label)+'</button>';}).join("")+'</div>';
    } else {
      body+='<label for="answer" class="muted" style="display:block;margin-bottom:8px">Your answer</label>'+
        '<input id="answer" class="answer" type="text" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="e.g. 3/2 or sqrt(2)" aria-label="Mathematical answer" '+
        (current.done?'disabled value="'+escape(current.submitted)+'"':"")+'>'+
        (current.done?"":answerKeyboard())+
        '<small>You can type fractions, exponents (^), roots, pi, and log expressions. The math keys also work with your normal keyboard.</small>';
    }
    if(!current.done)body+='<div style="display:flex;gap:8px;margin-top:18px">'+
      '<button class="btn primary" style="flex:2" data-action="check">Check answer</button>'+
      '<button class="btn" style="flex:1" data-action="hint">Hint</button></div>'+
      (current.hintUsed?'<div class="banner"><strong>Hint:</strong> '+rich(q.steps[0])+'</div>':"");
    else body+=feedback();
    return top+body;
  }
  function reviews() {
    var list=lessons.filter(function(l){return due(l.id);});
    var learning=lessons.filter(function(l){return skill(l.id).attempts>0 && !skill(l.id).mastered && !due(l.id);});
    return '<div class="eyebrow">Spaced retrieval</div><h1>Review</h1>'+
      '<p class="subtitle">Short, delayed practice confirms that skills stick. Correct answers with hints do not count toward mastery.</p>'+
      (list.length?'<h2>Due now · '+list.length+'</h2>'+list.map(function(l){return '<button class="lesson-card" data-action="practice" data-id="'+escape(l.id)+'"><h3>'+escape(l.title)+'</h3><p>Tap to review →</p></button>';}).join(""):
      '<div class="banner success">Nothing is due right now. You can still practice any lesson whenever you want.</div>')+
      (learning.length?'<h2 style="margin-top:25px">Still learning</h2>'+learning.slice(0,8).map(lessonCard).join(""):"");
  }
  function settings() {
    return '<div class="eyebrow">Preferences</div><h1>Settings</h1><div class="panel">'+
      '<div class="settings-row"><div><strong>Daily reminder</strong><p class="muted" style="font-size:13px">At most one gentle reminder a day.</p></div>'+
      '<input type="checkbox" id="reminder" '+(state.reminder?"checked":"")+'></div>'+
      '<div class="settings-row"><label for="reminderTime">Reminder time</label><input type="time" id="reminderTime" value="'+escape(state.reminderTime||"18:00")+'"></div>'+
      '<div class="settings-row"><div><strong>Streak</strong><p class="muted" style="font-size:13px">Three completed attempts per day counts. Missing a day never erases mastery.</p></div><strong>'+streak()+' days</strong></div>'+
      '</div><div class="panel"><h3>How mastery works</h3><p>Complete at least eight independent questions across all three difficulty levels, with two correct in each and four of the most recent five correct.</p>'+
      '<p>That marks the lesson proficient. A correct review after at least one day and another correct review after a later interval confirms mastery.</p>'+
      '<p>Use hints and worked solutions as often as you want. Hinted attempts help you learn but do not count toward mastery thresholds.</p></div>'+
      '<div class="panel"><h3>Import a course</h3><p>Paste a JSON course package with a <strong>lessons</strong> array following the same schema as Unit 2. Math expressions use the restricted template language, not executable JavaScript.</p>'+
      '<input id="courseFile" type="file" accept=".json,application/json" style="width:100%;margin:10px 0 12px;color:var(--muted)"><textarea id="courseJson" rows="4" style="width:100%;background:#121823;color:var(--text);border:1px solid var(--stroke);border-radius:12px;padding:12px" placeholder="{&quot;id&quot;:&quot;my-course&quot;,&quot;title&quot;:&quot;My Course&quot;,&quot;lessons&quot;:[...]}"></textarea>'+
      '<button class="btn" data-action="import" style="margin-top:10px">Validate and import</button></div>'+
      '<footer>Offline-first · No ads · No login · Your practice history stays on this device.</footer>';
  }
  function importCourse() {
    var text=(document.getElementById("courseJson")||{}).value||"";
    try {
      var p=JSON.parse(text);
      if(!p || typeof p.id!=="string" || !/^[a-z0-9_.-]{3,40}$/i.test(p.id) ||
         typeof p.title!=="string" || p.title.length>100 || !Array.isArray(p.lessons) ||
         p.lessons.length<1 || p.lessons.length>100)throw Error("Expected a course ID, title, and 1–100 lessons.");
      if(JSON.stringify(p).length>250000)throw Error("The course file is too large for this version.");
      window.Engine.validateCourse(p.lessons);
      p.lessons.forEach(function(l){l.id=p.id+":"+l.id;});
      if(p.lessons.some(function(l){return find(l.id);}))throw Error("One or more lesson IDs already exist.");
      state.imports.push(p);lessons=lessons.concat(p.lessons);save();
      notice="Imported "+p.lessons.length+" lessons.";screen="library";draw();
    } catch(e) {notice="Import failed: "+e.message;drawNotice();}
  }
  function drawNotice(){
    var e=document.getElementById("notice");
    if(e)e.innerHTML=notice?'<div class="banner error">'+escape(notice)+'</div>':"";
  }
  function draw() {
    var page={home:home,library:library,lesson:lesson,practice:practice,reviews:reviews,settings:settings}[screen]||home;
    document.getElementById("app").innerHTML='<div class="shell">'+header()+'<div id="notice"></div>'+page()+'</div>'+nav();
    drawNotice();
    if (screen==="lesson") {
      var l=find(activeId);if(l&&l.visual)visual(l.visual);
    }
    if(typeof window.renderMathInElement==="function") {
      try{window.renderMathInElement(document.getElementById("app"),{delimiters:[
        {left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false,trust:false});}
      catch(e){console.log("M4thMathRenderError "+e.message);}
    }
    if(screen==="practice" && current && !current.done && current.q.kind==="number") {
      var inp=document.getElementById("answer");
      if(inp) inp.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();action("check");}});
    }
    window.scrollTo(0,0);
  }
  function visual(v) {
    var host=document.getElementById("visual");if(!host)return;
    if(v.kind==="flow") {
      host.innerHTML='<div class="flow">'+v.nodes.map(function(n,i){
        return (i?'<span class="flow-arrow">→</span>':"")+'<div class="flow-item">'+escape(n)+'</div>';
      }).join("")+'</div>';return;
    }
    if(v.kind!=="graph")return;
    var W=360,H=225,left=40,right=12,top=12,bottom=32,innerW=W-left-right,innerH=H-top-bottom;
    var xmin=v.xMin,xmax=v.xMax,ymin=v.yMin,ymax=v.yMax;
    var axisMin=v.semiLog?Math.log10(Math.max(1e-12,ymin)):ymin;
    var axisMax=v.semiLog?Math.log10(ymax):ymax;
    function xx(x){return left+(x-xmin)/(xmax-xmin)*innerW;}
    function yy(y){var z=v.semiLog?Math.log10(y):y;return top+(axisMax-z)/(axisMax-axisMin)*innerH;}
    var out=['<svg viewBox="0 0 360 225" role="img" aria-label="Function graph with axes and plotted curves">',
      '<rect x="0" y="0" width="360" height="225" rx="8" fill="#10141b"/>'];
    for(var i=0;i<=5;i++){
      var gx=left+i*innerW/5, gy=top+i*innerH/5;
      out.push('<path d="M'+gx.toFixed(2)+' '+top+'V'+(top+innerH)+' M'+left+' '+gy.toFixed(2)+'H'+(left+innerW)+'" stroke="#27313e" stroke-width="1"/>');
      out.push('<text x="'+gx.toFixed(1)+'" y="211" font-size="10" text-anchor="middle" fill="#a3acba">'+
        window.Engine.fmt(xmin+(xmax-xmin)*i/5)+'</text>');
      var tick=axisMax-(axisMax-axisMin)*i/5;
      out.push('<text x="34" y="'+(gy+3).toFixed(1)+'" font-size="9" text-anchor="end" fill="#a3acba">'+
        (v.semiLog?window.Engine.fmt(Math.pow(10,tick)):window.Engine.fmt(tick))+'</text>');
    }
    var colors=["#8cb8ff","#e8b071","#b79bf7","#a4d9b3"];
    (v.functions||[]).forEach(function(fn,index){
      var path="",drawing=false,previousY=0;
      for(var j=0;j<=800;j++){
        var x=xmin+(xmax-xmin)*j/800,y;
        try{y=window.Engine.evaluate(fn,{x:x});}catch(err){drawing=false;continue;}
        if(!Number.isFinite(y)||(v.semiLog&&y<=0)){drawing=false;continue;}
        var px=xx(x),py=yy(y);
        if(!Number.isFinite(py)||py<top-800||py>top+innerH+800){drawing=false;continue;}
        if(drawing&&Math.abs(previousY-py)>innerH*0.70)drawing=false;
        path+=(drawing?"L":"M")+px.toFixed(2)+","+py.toFixed(2);
        drawing=true;previousY=py;
      }
      out.push('<path d="'+path+'" fill="none" stroke="'+colors[index%colors.length]+'" stroke-width="2.2" stroke-linecap="round"/>');
    });
    out.push('<text x="348" y="218" fill="#a3acba" font-size="10" text-anchor="end">x</text>');
    if(v.semiLog)out.push('<text x="182" y="11" fill="#a3acba" font-size="10" text-anchor="middle">logarithmic vertical scale</text>');
    out.push('</svg>');
    host.innerHTML=out.join("");
  }
  document.getElementById("app").addEventListener("click",function(event){
    var node=event.target.closest("[data-action]");if(!node)return;
    action(node.getAttribute("data-action"),node.getAttribute("data-id"));
  });
  document.getElementById("app").addEventListener("change",function(event){
    var t=event.target;
    if(t.id==="courseFile" && t.files && t.files[0]) {
      var file=t.files[0];
      if(file.size>250000) {notice="Course file exceeds the current 250 KB import limit.";drawNotice();return;}
      var reader=new FileReader();
      reader.onload=function(){var box=document.getElementById("courseJson");if(box)box.value=String(reader.result);notice="Course loaded. Tap Validate and import.";drawNotice();};
      reader.onerror=function(){notice="Unable to read the selected file.";drawNotice();};
      reader.readAsText(file);return;
    }
    if(t.id==="reminder"||t.id==="reminderTime"){
      var cb=document.getElementById("reminder"),clock=document.getElementById("reminderTime");
      state.reminder=Boolean(cb&&cb.checked);
      state.reminderTime=(clock&&clock.value)||"18:00";
      save();
      var parts=state.reminderTime.split(":").map(Number);
      if(window.M4th)window.M4th.reminder(parts[0],parts[1],state.reminder);
    }
  });
  if(state.imports.length) {
    state.imports.forEach(function(pack){
      if(pack && Array.isArray(pack.lessons))pack.lessons.forEach(function(l){if(l && !find(l.id))lessons.push(l);});
    });
  }
  if(!window.Engine||!window.UNIT2||!window.renderMathInElement) {
    console.log("M4thFatal: missing bundled engine, content or KaTeX");
  } else {
    try {
      window.Engine.validateCourse(window.UNIT2);
      draw();
      console.log("M4thReady "+window.UNIT2.length+" lessons");
    } catch(e) {
      document.getElementById("app").textContent="Content validation failed: "+e.message;
      console.log("M4thFatal "+e.message);
    }
  }
  window.m4thBack=function() {
    if(screen==="practice") {screen="lesson";current=null;draw();return true;}
    if(screen==="lesson"||screen==="settings"||screen==="library"||screen==="reviews"){screen="home";draw();return true;}
    return false;
  };
})();