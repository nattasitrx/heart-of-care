(()=>{
'use strict';
const $=id=>document.getElementById(id),dialog=$('admin-dialog');let busy=false,message='';
const ui=k=>{const lang=document.documentElement.lang==='zh-Hant'?'zh':document.documentElement.lang;return window.CARE_STORY.ui[k]?.[lang]||window.CARE_STORY.ui[k]?.en||'';};
function status(key){message=key;$('admin-status').textContent=key?ui(key):'';}
function showDashboard(allowed){$('admin-login-form').hidden=allowed;$('admin-logout').hidden=!allowed;$('admin-frame').hidden=!allowed;$('admin-frame').title=ui('instructorDashboard');if(allowed)$('admin-frame').src='/admin';else $('admin-frame').removeAttribute('src');}
async function open(){if(!dialog.open)dialog.showModal();status('adminChecking');showDashboard(false);try{const r=await fetch('/api/me',{cache:'no-store'});if(!r.ok)throw new Error();showDashboard((await r.json()).isAdmin);status('');if(!$('admin-login-form').hidden)$('admin-password').focus();}catch{status('adminUnavailable');}}
$('admin-open').addEventListener('click',open);
$('admin-login-form').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;busy=true;$('admin-login-button').disabled=true;status('adminChecking');try{const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:$('admin-password').value})});$('admin-password').value='';if(r.ok){showDashboard(true);status('');}else{status(r.status===401?'adminWrongPassword':r.status===429?'adminRateLimit':'adminUnavailable');$('admin-password').focus();}}catch{status('adminUnavailable');$('admin-password').value='';}finally{busy=false;$('admin-login-button').disabled=false;}});
$('admin-logout').addEventListener('click',async()=>{if(busy)return;busy=true;$('admin-logout').disabled=true;try{const r=await fetch('/api/admin/logout',{method:'POST'});if(!r.ok)throw new Error();showDashboard(false);status('adminLoggedOut');}catch{status('adminUnavailable');}finally{busy=false;$('admin-logout').disabled=false;}});
dialog.addEventListener('close',()=>{$('admin-frame').removeAttribute('src');$('admin-password').value='';});
$('language').addEventListener('change',()=>status(message));if(location.hash==='#admin')open();
window.addEventListener('message',event=>{if(event.origin===location.origin&&event.source===$('admin-frame').contentWindow&&event.data?.type==='care-admin-auth-required'){showDashboard(false);status('adminPasswordHint');}});
})();
