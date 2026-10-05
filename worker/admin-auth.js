const encoder=new TextEncoder();
const hex=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join('');
const unhex=s=>Uint8Array.from(s.match(/.{2}/g)||[],x=>parseInt(x,16));
async function digest(s){return hex(await crypto.subtle.digest('SHA-256',encoder.encode(s)));}
function sessionToken(request){return request.headers.get('Cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith('__Host-care-admin='))?.slice('__Host-care-admin='.length)||'';}
async function adminAuthenticated(request,env){if(!env.DB||!env.ADMIN_PASSWORD_HASH)return false;const token=sessionToken(request);if(!/^[a-f0-9]{64}$/.test(token))return false;const hash=await digest(token),now=Date.now(),result=await env.DB.prepare('SELECT expires_at FROM admin_sessions WHERE token_hash = ? AND expires_at > ?').bind(hash,now).all();return !!result.results?.length;}
async function passwordMatches(password,verifier){const [salt,expected]=String(verifier||'').split(':');if(!/^[a-f0-9]{32}$/.test(salt)||!/^[a-f0-9]{64}$/.test(expected))return false;const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);const actual=hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:unhex(salt),iterations:100000,hash:'SHA-256'},key,256));let difference=0;for(let i=0;i<64;i++)difference|=actual.charCodeAt(i)^expected.charCodeAt(i);return difference===0;}
async function adminAuthRoute(request,env,url){
 if(request.method!=='POST')return json({error:'method_not_allowed'},405);
 const origin=request.headers.get('Origin');if(origin!==url.origin)return json({error:'invalid_origin'},403);
 if(!env.DB||!env.ADMIN_PASSWORD_HASH)return json({error:'admin_unavailable'},503);
 const cookie='__Host-care-admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';
 try{
  if(url.pathname==='/api/admin/logout'){const token=sessionToken(request);if(token)await env.DB.prepare('DELETE FROM admin_sessions WHERE token_hash = ?').bind(await digest(token)).run();const r=json({authenticated:false});r.headers.set('Set-Cookie',cookie);return r;}
  if(!(request.headers.get('Content-Type')||'').includes('application/json'))return json({error:'json_required'},415);
  const raw=await request.text();if(raw.length>1024)return json({error:'invalid_password'},400);let body;try{body=JSON.parse(raw)}catch{return json({error:'invalid_json'},400)}
  if(typeof body?.password!=='string'||!body.password.length||body.password.length>256)return json({error:'invalid_password'},400);
  const now=Date.now(),attemptKey=await digest(env.ADMIN_PASSWORD_HASH+'|'+(request.headers.get('CF-Connecting-IP')||'unknown'));
  const result=await env.DB.prepare('INSERT INTO admin_login_attempts (key,attempts,started_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN started_at < ? THEN 1 ELSE attempts+1 END,started_at=CASE WHEN started_at < ? THEN excluded.started_at ELSE started_at END RETURNING attempts').bind(attemptKey,now,now-900000,now-900000).all();
  if(result.results?.[0]?.attempts>5)return json({error:'too_many_attempts'},429);
  if(!await passwordMatches(body.password,env.ADMIN_PASSWORD_HASH))return json({error:'wrong_password'},401);
  await env.DB.prepare('DELETE FROM admin_login_attempts WHERE key = ?').bind(attemptKey).run();
  const token=hex(crypto.getRandomValues(new Uint8Array(32)));await env.DB.prepare('INSERT INTO admin_sessions (token_hash,expires_at) VALUES (?,?)').bind(await digest(token),now+3600000).run();
  // Remove expired sessions and old throttling records without changing active sessions.
  await env.DB.prepare('DELETE FROM admin_sessions WHERE expires_at <= ?').bind(now).run();await env.DB.prepare('DELETE FROM admin_login_attempts WHERE started_at < ?').bind(now-86400000).run();
  const r=json({authenticated:true});r.headers.set('Set-Cookie','__Host-care-admin='+token+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600');return r;
 }catch(e){console.error('admin_auth_unavailable',e?.message);return json({error:'admin_unavailable'},503);}
}
