function participantCookie(request){return request.headers.get('Cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('__Host-care-player='))?.slice('__Host-care-player='.length)||'';}
async function participantSignature(value,secret){const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return hex(await crypto.subtle.sign('HMAC',key,encoder.encode(value)));}
async function participantIdentity(request,env){
 if(!env.PARTICIPANT_SECRET)return null;const cookie=participantCookie(request),parts=cookie.split('.');if(parts.length!==3||!/^[a-f0-9]{64}$/.test(parts[0])||!/^\d{13}$/.test(parts[1])||!/^[a-f0-9]{64}$/.test(parts[2])||+parts[1]<=Date.now())return null;
 const signature=await participantSignature(parts[0]+'.'+parts[1],env.PARTICIPANT_SECRET);let diff=0;for(let i=0;i<64;i++)diff|=signature.charCodeAt(i)^parts[2].charCodeAt(i);return diff?null:'guest:'+await digest(parts[0]);
}
async function startParticipant(request,env,url){
 if(request.method!=='POST')return json({error:'method_not_allowed'},405);
 if(request.headers.get('Origin')!==url.origin)return json({error:'invalid_origin'},403);
 if(!env.PARTICIPANT_SECRET||!env.DB)return json({error:'participant_unavailable'},503);
 if(!(request.headers.get('Content-Type')||'').includes('application/json'))return json({error:'json_required'},415);
 const raw=await request.text();if(raw.length>2048)return json({error:'invalid_participant'},400);let p;try{p=JSON.parse(raw)}catch{return json({error:'invalid_json'},400)}
 if(!p||!['name','studentCode'].every(k=>typeof p[k]==='string'&&p[k].trim().length>0&&p[k].length<=(k==='name'?100:80))||(p.group!==undefined&&(typeof p.group!=='string'||p.group.length>80)))return json({error:'name_and_student_code_required'},400);
 const current=await participantIdentity(request,env),token=current?participantCookie(request).split('.')[0]:hex(crypto.getRandomValues(new Uint8Array(32))),expires=Date.now()+31536000000,value=token+'.'+expires,signature=await participantSignature(value,env.PARTICIPANT_SECRET);
 const r=json({ready:true});r.headers.set('Set-Cookie','__Host-care-player='+value+'.'+signature+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000');return r;
}
