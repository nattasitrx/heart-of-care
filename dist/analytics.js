(function(root){
'use strict';
const key=s=>s.studentCode?.trim()?'student:'+String(s.group||'').trim()+':'+s.studentCode.trim().toUpperCase():s.accountId||s.id;
const avg=a=>a.length?a.reduce((v,x)=>v+x,0)/a.length:null;
function localDay(date){const p=Object.fromEntries(new Intl.DateTimeFormat('en',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(date)).map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`;}
function select(sessions,f={}){
 let list=sessions.filter(s=>{const day=localDay(s.startedAt),search=[s.name,s.studentCode,s.accountEmail,s.accountId].join(' ').toLowerCase();return (!f.search||search.includes(f.search.toLowerCase()))&&(!f.group||s.group===f.group)&&(!f.language||s.language===f.language)&&(!f.pace||s.pace===+f.pace)&&(!f.version||s.gameVersion===f.version)&&(!f.from||day>=f.from)&&(!f.to||day<=f.to)&&(!f.status||s.status===f.status);});
 if(f.attempt&&f.attempt!=='all'){list=list.filter(s=>s.status==='completed');const pick=new Map();for(const s of list){const k=key(s),prev=pick.get(k),cmp=(s.startedAt+s.id).localeCompare((prev?.startedAt||'')+(prev?.id||''));if(!prev||(f.attempt==='first'?cmp<0:cmp>0))pick.set(k,s);}list=[...pick.values()];}
 return list.sort((a,b)=>(b.startedAt+b.id).localeCompare(a.startedAt+a.id));
}
function summarize(sessions){
 const completed=sessions.filter(s=>s.status==='completed'&&s.result),answers=sessions.flatMap(s=>s.answers),nodes=new Map();
 for(const s of sessions)for(const a of s.answers){let n=nodes.get(a.nodeId);if(!n){n={id:a.nodeId,prompt:a.prompt,academic:a.academic,speaker:a.speaker,count:0,correct:0,timeouts:0,seconds:[],options:new Map()};nodes.set(a.nodeId,n);}n.count++;n.correct+=+(a.correctness===2);n.timeouts+=+a.timeout;n.seconds.push(a.elapsedSeconds);const k=a.timeout?'timeout':a.language+'\0'+a.choice;const o=n.options.get(k)||{label:a.choice,language:a.language,timeout:a.timeout,count:0,correctness:a.correctness};o.count++;n.options.set(k,o);}
 return {players:new Set(sessions.map(key)).size,runs:sessions.length,completed:completed.length,incomplete:sessions.filter(s=>s.status!=='completed').length,meanKnowledge:avg(completed.filter(s=>s.result.knowledge.total>0).map(s=>100*s.result.knowledge.correct/s.result.knowledge.total)),meanSafety:avg(completed.map(s=>s.result.safety)),meanSeconds:avg(answers.map(a=>a.elapsedSeconds)),answers:answers.length,timeouts:answers.filter(a=>a.timeout).length,questions:[...nodes.values()].map(n=>({...n,rate:100*n.correct/n.count,meanSeconds:avg(n.seconds),options:[...n.options.values()]})).sort((a,b)=>a.rate-b.rate||b.count-a.count)};
}
const api={select,summarize,localDay};root.CARE_ANALYTICS=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
