/* M4th declarative math practice engine. Course data is never evaluated as JS. */
(function (root) {
  "use strict";
  function evaluate(source, variables) {
    var s = String(source).replace(/π/g,"pi").replace(/−/g,"-").replace(/×/g,"*").replace(/÷/g,"/").replace(/\s+/g,"");
    var tokens = [], offset = 0, match;
    while (offset < s.length) {
      match = /^(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[A-Za-z_][A-Za-z_0-9]*|[+\-*/^(),])/.exec(s.slice(offset));
      if (!match) throw Error("Unrecognized math token");
      tokens.push(match[0]); offset += match[0].length;
    }
    if (!tokens.length || tokens.length > 120) throw Error("Invalid expression");
    var p = 0;
    function eat(t) { if (tokens[p] === t) { p++; return true; } return false; }
    function expect(t) { if (!eat(t)) throw Error("Expected " + t); }
    function primary() {
      var t = tokens[p++];
      if (!t) throw Error("Missing value");
      if (t === "(") { var v = sum(); expect(")"); return v; }
      if (/^(?:\d|\.)/.test(t)) return Number(t);
      if (!/^[A-Za-z_][A-Za-z_0-9]*$/.test(t)) throw Error("Unexpected symbol");
      if (eat("(")) {
        var a = [];
        if (!eat(")")) { do { a.push(sum()); } while (eat(",")); expect(")"); }
        if (t === "sqrt" && a.length === 1) return Math.sqrt(a[0]);
        if (t === "abs" && a.length === 1) return Math.abs(a[0]);
        if (t === "ln" && a.length === 1) return Math.log(a[0]);
        if (t === "exp" && a.length === 1) return Math.exp(a[0]);
        if (t === "sin" && a.length === 1) return Math.sin(a[0]);
        if (t === "cos" && a.length === 1) return Math.cos(a[0]);
        if (t === "tan" && a.length === 1) return Math.tan(a[0]);
        if (t === "log" && a.length === 1) return Math.log10(a[0]);
        if (t === "log" && a.length === 2) return Math.log(a[1])/Math.log(a[0]);
        if (t === "pow" && a.length === 2) return Math.pow(a[0],a[1]);
        if (t === "round" && (a.length === 1 || a.length === 2)) { var places = a.length === 2 ? a[1] : 0; if (!Number.isInteger(places) || places < 0 || places > 8) throw Error("Invalid rounding"); var scale = Math.pow(10,places); return Math.round((a[0]+Number.EPSILON)*scale)/scale; }
        throw Error("Unsupported function: " + t);
      }
      if (t === "pi") return Math.PI;
      if (t === "e") return Math.E;
      if (variables && Object.prototype.hasOwnProperty.call(variables,t)) return Number(variables[t]);
      throw Error("Unknown variable: " + t);
    }
    function power() {
      var v = primary(); if (eat("^")) v = Math.pow(v, unary()); return v;
    }
    function unary() { if (eat("+")) return unary(); if (eat("-")) return -unary(); return power(); }
    function product() {
      var v = unary();
      while (true) { if (eat("*")) v *= unary(); else if (eat("/")) v /= unary(); else break; }
      return v;
    }
    function sum() {
      var v = product();
      while (true) { if (eat("+")) v += product(); else if (eat("-")) v -= product(); else break; }
      return v;
    }
    var out = sum();
    if (p !== tokens.length || !Number.isFinite(out)) throw Error("Expression not finite or malformed");
    return out;
  }
  function rng(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a += 0x6D2B79F5;
      var t = a; t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function fmt(n) { return Number.isInteger(n) ? String(n) : String(Number(n.toPrecision(8))); }
  function replace(text, values) {
    return String(text).replace(/\{\{([^{}]+)\}\}/g, function (_, exp) {
      return fmt(evaluate(exp, values));
    });
  }
  function generate(lesson, which, seed) {
    var p = lesson.problems[which], rand = rng(seed);
    if (!p) throw Error("Missing problem template");
    var vars = {};
    Object.keys(p.vars || {}).forEach(function (name) {
      var r = p.vars[name];
      if (Array.isArray(r)) {
        if (r.length !== 2 || !Number.isInteger(r[0]) || !Number.isInteger(r[1]) || r[0] > r[1]) throw Error("Bad range: " + name);
        vars[name] = r[0] + Math.floor(rand() * (r[1] - r[0] + 1));
      } else if (r && Array.isArray(r.values) && r.values.length) {
        vars[name] = Number(r.values[Math.floor(rand() * r.values.length)]);
      } else throw Error("Invalid variable " + name);
    });
    Object.keys(p.derived || {}).forEach(function (name) {
      vars[name] = evaluate(p.derived[name], vars);
    });
    var result = { kind:p.kind || "number", tier:p.tier, seed:seed, template:which,
      prompt:replace(p.prompt,vars), steps:(p.steps || []).map(function(s){return replace(s,vars);}),
      graph:p.graph || null, vars:vars };
    if (result.kind === "number") {
      result.answer = evaluate(p.answer,vars);
    } else if (result.kind === "choice") {
      if (!Array.isArray(p.options) || p.options.length < 2 ||
          !Number.isInteger(p.correct) || p.correct < 0 || p.correct >= p.options.length) throw Error("Bad multiple choice");
      var options = p.options.map(function(s,i){return {label:replace(s,vars), correct:i===p.correct};});
      for (var i=options.length-1;i>0;i--) {
        var j = Math.floor(rand() * (i+1)), hold = options[j]; options[j]=options[i]; options[i]=hold;
      }
      result.options=options;
    } else throw Error("Unsupported answer kind");
    return result;
  }
  function check(problem, student) {
    if (problem.kind === "choice") return Number(student) >= 0 &&
      Number(student) < problem.options.length && problem.options[Number(student)].correct === true;
    try {
      var actual = evaluate(String(student),{});
      return Math.abs(actual - problem.answer) <= Math.max(0.000001,Math.abs(problem.answer)*0.00001);
    } catch (err) { return false; }
  }
  function validateCourse(course) {
    if (!Array.isArray(course) || course.length < 1 || course.length > 100) throw Error("Expected 1–100 lessons");
    var ids = new Set();
    course.forEach(function (l) {
      if (!l.id || !l.title || ids.has(l.id)) throw Error("Invalid or duplicate lesson");
      ids.add(l.id);
      if (!Array.isArray(l.sections) || l.sections.length < 3 || !Array.isArray(l.worked) ||
         l.worked.length < 2 || !Array.isArray(l.problems) || l.problems.length < 3) throw Error("Incomplete: " + l.id);
      [1,2,3].forEach(function (tier) {
        if (!l.problems.some(function(p){ return p.tier === tier; })) throw Error("Missing difficulty tier "+tier+" for "+l.id);
      });
      l.problems.forEach(function(p,j) {
        for (var k=1;k<=40;k++) {
          var q=generate(l,j,k*1009+j*17);
          if (!q.prompt || !q.steps.length) throw Error("Missing prompt/steps: "+l.id);
          if (q.kind === "number" && !Number.isFinite(q.answer)) throw Error("Bad answer "+l.id);
          if (q.kind === "number" && !check(q,String(q.answer))) throw Error("Self-check failed "+l.id);
          if (q.kind === "choice" && q.options.filter(function(o){return o.correct;}).length !== 1) throw Error("Multiple choice answer error "+l.id);
        }
      });
    });
    return true;
  }
  root.Engine={evaluate:evaluate,generate:generate,check:check,validateCourse:validateCourse,replace:replace,fmt:fmt};
})(window);
