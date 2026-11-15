/* No external dependencies: check all questions before every Android build. */
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const ctx = vm.createContext({window:{}});
vm.runInContext(fs.readFileSync("app/src/main/assets/engine.js","utf8"),ctx);
vm.runInContext(fs.readFileSync("app/src/main/assets/course.js","utf8"),ctx);
const E=ctx.window.Engine, course=ctx.window.UNIT2;
const expected=[
"Change in Arithmetic and Geometric Sequences",
"Change in Linear and Exponential Functions",
"Exponential Functions",
"Exponential Function Manipulation",
"Exponential Function Context and Data Modeling",
"Competing Function Model Validation",
"Composition of Functions",
"Inverse Functions",
"Logarithmic Expressions",
"Inverses of Exponential Functions",
"Logarithmic Functions",
"Logarithmic Function Manipulation",
"Exponential and Logarithmic Equations and Inequalities",
"Logarithmic Function Context and Data Modeling",
"Semi-log Plots"
];
assert.equal(course.length,15,"All 15 required topics");
course.forEach((l,i)=>{
  assert.equal(l.id,"2."+(i+1));
  assert.equal(l.title,expected[i]);
  assert.ok(l.sections.length>=3,"Not enough substantive explanation sections");
  assert.ok(l.worked.length>=2,"Not enough worked examples");
  assert.ok(l.pitfalls.length>=2,"Missing common mistakes");
  assert.ok(l.problems.length>=3,"Missing question variation");
});
assert.equal(E.validateCourse(course),true);
assert.equal(E.evaluate("sqrt(9)+2^3"),11);
assert.equal(E.evaluate("log(2,32)"),5);
assert.equal(E.evaluate("round(100*(1.1)^3,2)"),133.1);
for(const expr of ["globalThis","alert(1)","1;2","foo()","x+1"]){
  assert.throws(()=>E.evaluate(expr),undefined,"Unsafe expression accepted: "+expr);
}
let checked=0;
for(const l of course) for(let i=0;i<l.problems.length;i++)for(let seed=10;seed<=70;seed++){
  const q=E.generate(l,i,seed*1009+i*7);
  assert.ok(!q.prompt.includes("{{"),"Unexpanded template in "+l.id+": "+q.prompt);
  assert.ok(q.steps.every(s=>!s.includes("{{")),"Unexpanded explanation in "+l.id);
  if(q.kind==="number"){
    assert.ok(E.check(q,String(q.answer)),"Correct numeric answer rejected");
    assert.equal(E.check(q,"not-a-number"),false);
  } else {
    const j=q.options.findIndex(o=>o.correct);
    assert.ok(E.check(q,j),"Correct choice rejected");
    assert.equal(q.options.filter(o=>o.correct).length,1);
  }
  checked++;
}
console.log("PASS: "+course.length+" lessons, "+checked+" seeded question variants, safe math input.");
