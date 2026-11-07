(function(){
var $=function(i){return document.getElementById(i)};
function b(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
async function dec(pw,o){var k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
var key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:b(o.s),iterations:o.i,hash:'SHA-256'},k,{name:'AES-GCM',length:256},false,['decrypt']);
return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:b(o.v)},key,b(o.c)))}
$('lf').addEventListener('submit',async function(e){e.preventDefault();var m=$('lm'),bt=$('lb'),o;bt.disabled=true;m.textContent='Checking...';
try{var r=await fetch('assets/vault.json?'+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;o=await r.json()}
catch(x){m.textContent='Could not load the lock file (assets/vault.json). Upload the updated files to GitHub, wait 2 minutes, then refresh with Cmd+Shift+R.';setTimeout(function(){bt.disabled=false},2000);return}
try{var p=await dec($('lp').value.trim(),o);if(!/^desk-[a-f0-9]+\.html$/.test(p))throw 0;m.textContent='Welcome!';location.href=p}
catch(x){m.textContent='Wrong password. Try again.';$('lp').value='';setTimeout(function(){bt.disabled=false},2000)}})
})();
