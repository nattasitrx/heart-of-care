function json(value,status=200){return new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
function validSession(s){
 if(['studentCode','group'].some(k=>s?.[k]!==undefined&&(typeof s[k]!=='string'||s[k].length>80)))return false;
 const text=v=>typeof v==='string'&&v.length<=12000,number=v=>Number.isFinite(v)&&Math.abs(v)<=300,knowledge=k=>k&&Number.isInteger(k.correct)&&Number.isInteger(k.answered)&&Number.isInteger(k.total)&&k.correct>=0&&k.correct<=k.answered&&k.answered<=k.total&&k.total<=100;
 if(!s||typeof s!=='object'||typeof s.id!=='string'||!/^[-\w]{8,100}$/.test(s.id)||!['in_progress','completed'].includes(s.status)||!Number.isSafeInteger(s.revision)||s.revision<1||!Array.isArray(s.answers)||s.answers.length>100||typeof s.startedAt!=='string'||!Number.isFinite(Date.parse(s.startedAt))||typeof s.name!=='string'||s.name.length>100||!['th','zh','en'].includes(s.language)||![15,25,45].includes(s.pace)||![0,1].includes(s.appearance?.look)||![0,1,2].includes(s.appearance?.outfit)||!knowledge(s.knowledge))return false;
 if(s.result&&(!number(s.result.safety)||!knowledge(s.result.knowledge)))return false;
 return s.answers.every(a=>a&&['nodeId','chapter','speaker','topic','prompt','choice','correctAnswer','reaction','explanation','lesson','answeredAt','emotion'].every(k=>text(a[k]))&&Number.isFinite(Date.parse(a.answeredAt))&&['th','zh','en'].includes(a.language)&&number(a.elapsedSeconds)&&a.elapsedSeconds>=0&&number(a.budget)&&a.budget>0&&number(a.remainingSeconds)&&['doctor','caregiver','mentor'].includes(a.npc)&&[0,1,2].includes(a.correctness)&&typeof a.timeout==='boolean'&&typeof a.academic==='boolean'&&['smile','surprise','concern','neutral'].includes(a.emotion)&&['safetyAfter','trustAfter','stressAfter'].every(k=>number(a[k]))&&a.impact&&['safety','trust','stress'].every(k=>number(a.impact[k]))&&Array.isArray(a.displayedOptions)&&a.displayedOptions.every(text)&&Array.isArray(a.sources)&&a.sources.length<=10&&a.sources.every(x=>x&&text(x.title)&&text(x.url)&&/^https:\/\//.test(x.url)));
}
async function handle(request,env){
 const url=new URL(request.url);
 const user=request.headers.get('oai-authenticated-user-id'),email=request.headers.get('oai-authenticated-user-email')||'';
 if(url.pathname==='/api/participant')return startParticipant(request,env,url);
 if(['/api/admin/login','/api/admin/logout'].includes(url.pathname))return adminAuthRoute(request,env,url);
 let isAdmin=false;if(['/api/me','/admin','/admin/','/admin.html','/api/admin/sessions'].includes(url.pathname)){try{isAdmin=await adminAuthenticated(request,env);}catch{return json({error:'admin_unavailable'},503);}}
 if(url.pathname==='/api/me')return request.method==='GET'?json({signedIn:!!user,isAdmin,participantReady:!!user||!!await participantIdentity(request,env)}):json({error:'method_not_allowed'},405);
 if(['/admin','/admin/','/admin.html'].includes(url.pathname)){
  if(!isAdmin)return new Response(null,{status:302,headers:{Location:'/#admin','Cache-Control':'no-store'}});
  url.pathname='/admin.html';
 }
 if(url.pathname==='/api/admin/sessions'){
  if(!isAdmin)return json({error:'admin_password_required'},401);
  if(request.method!=='GET')return json({error:'method_not_allowed'},405);
  if(!env.DB)return json({error:'history_unavailable'},503);
  const cursor=url.searchParams.get('cursor');if(cursor){try{const c=JSON.parse(cursor);if(cursor.length>600||!['at','id','user'].every(k=>typeof c[k]==='string'&&c[k].length<=150))throw new Error();}catch{return json({error:'invalid_cursor'},400);}}
  try{return json(await adminSessions(env.DB,cursor));}catch(e){console.error('admin_storage_failure',e?.message);return json({error:'history_unavailable'},503);}
 }
 if(url.pathname==='/api/history'){
  const user=request.headers.get('oai-authenticated-user-id')||await participantIdentity(request,env);
  if(!user){if(request.method==='GET')return json({sessions:[],nextCursor:null});return json({error:'participant_required'},401);}
  if(!env.DB)return json({error:'history_unavailable'},503);
  try{
   const store=historyStore(env.DB,user);
   if(request.method==='GET'){const cursor=url.searchParams.get('cursor');if(cursor){try{const c=JSON.parse(cursor);if(typeof c.at!=='string'||typeof c.id!=='string'||cursor.length>500)throw new Error('invalid');}catch{return json({error:'invalid_cursor'},400);}}return json(await store.list(cursor));}
   if(request.method==='POST'){
    const origin=request.headers.get('Origin');if(origin&&origin!==url.origin)return json({error:'invalid_origin'},403);
    if(!(request.headers.get('Content-Type')||'').includes('application/json'))return json({error:'json_required'},415);
    const raw=await request.text();if(raw.length>400000)return json({error:'session_too_large'},413);
    let session;try{session=JSON.parse(raw);}catch{return json({error:'invalid_json'},400);}
    if(!validSession(session))return json({error:'invalid_session'},400);
    session.accountEmail=email;delete session.accountId;await store.save(session);return json({saved:true,id:session.id,revision:session.revision});
   }
   return json({error:'method_not_allowed'},405);
  }catch(e){console.error('history_storage_failure',request.method,e?.message);return json({error:'history_unavailable'},503);}
 }
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
 const path=url.pathname==='/'?'/index.html':url.pathname;
 const asset=ASSET_DATA[path];if(!asset)return new Response('Not found',{status:404});
 const body=Uint8Array.from(atob(asset.data),c=>c.charCodeAt(0));
 return new Response(request.method==='HEAD'?null:body,{headers:{'Content-Type':asset.type,'Cache-Control':path.endsWith('.webp')?'public, max-age=86400':'no-cache','X-Content-Type-Options':'nosniff'}});
}
export default {fetch:handle};
