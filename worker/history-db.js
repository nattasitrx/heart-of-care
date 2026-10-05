function historyStore(db,userId){
 return {
  async list(cursor){
   const c=cursor?JSON.parse(cursor):null;
   const query=c?'SELECT id, started_at, status, answer_count, payload FROM play_sessions WHERE user_id = ? AND (started_at < ? OR (started_at = ? AND id < ?)) ORDER BY started_at DESC, id DESC LIMIT 51':'SELECT id, started_at, status, answer_count, payload FROM play_sessions WHERE user_id = ? ORDER BY started_at DESC, id DESC LIMIT 51';
   const args=c?[userId,c.at,c.at,c.id]:[userId],r=await db.prepare(query).bind(...args).all(),rows=r.results||[],page=rows.slice(0,50);
   return {sessions:page.map(x=>JSON.parse(x.payload)),nextCursor:rows.length>50?JSON.stringify({at:page.at(-1).started_at,id:page.at(-1).id}):null};
  },
  async save(session){
   return db.prepare('INSERT INTO play_sessions (user_id,id,started_at,updated_at,status,answer_count,revision,payload) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(user_id,id) DO UPDATE SET updated_at=excluded.updated_at,status=excluded.status,answer_count=excluded.answer_count,revision=excluded.revision,payload=excluded.payload WHERE excluded.revision > play_sessions.revision AND excluded.answer_count >= play_sessions.answer_count AND (play_sessions.status != ? OR excluded.status = ?)').bind(userId,session.id,session.startedAt,new Date().toISOString(),session.status,session.answers.length,session.revision,JSON.stringify(session),'completed','completed').run();
  }
 };
}
async function adminSessions(db,cursor){
 const c=cursor?JSON.parse(cursor):null;
 const sql='SELECT user_id,id,started_at,payload FROM play_sessions'+(c?' WHERE started_at < ? OR (started_at = ? AND id < ?) OR (started_at = ? AND id = ? AND user_id < ?)':'')+' ORDER BY started_at DESC,id DESC,user_id DESC LIMIT 101';
 const r=await db.prepare(sql).bind(...(c?[c.at,c.at,c.id,c.at,c.id,c.user]:[])).all(),rows=r.results||[],page=rows.slice(0,100),last=page.at(-1);
 return {sessions:page.map(x=>({...JSON.parse(x.payload),accountId:x.user_id})),nextCursor:rows.length>100?JSON.stringify({at:last.started_at,id:last.id,user:last.user_id}):null};
}
