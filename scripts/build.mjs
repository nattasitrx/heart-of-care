import fs from 'node:fs';
import path from 'node:path';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp'};
const assets={};
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){if(ent.name==='server'||ent.name==='.openai')continue;const p=path.join(dir,ent.name);if(ent.isDirectory())walk(p);else{const name='/'+path.relative('dist',p).split(path.sep).join('/');assets[name]={type:types[path.extname(p)]||'application/octet-stream',data:fs.readFileSync(p).toString('base64')};}}}
walk('dist');fs.mkdirSync('dist/server',{recursive:true});
fs.writeFileSync('dist/server/index.js','const ASSET_DATA = '+JSON.stringify(assets)+';\n'+fs.readFileSync('worker/history-db.js','utf8')+'\n'+fs.readFileSync('worker/admin-auth.js','utf8')+'\n'+fs.readFileSync('worker/participant.js','utf8')+'\n'+fs.readFileSync('worker/index.js','utf8'));
fs.mkdirSync('dist/.openai',{recursive:true});fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log(JSON.stringify({assets:Object.keys(assets).length,workerBytes:fs.statSync('dist/server/index.js').size}));
