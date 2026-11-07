(function(){
var $=function(i){return document.getElementById(i)},f=$('f'),code;
function mk(){var c='ABCDEFGHJKMNPQRSTUVWXYZ23456789',s='AY-';for(var i=0;i<5;i++)s+=c[Math.floor(Math.random()*c.length)];return s}
code=mk();f.code.value=code;
f.addEventListener('submit',function(e){e.preventDefault();$('err').hidden=true;
fetch(location.pathname,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()})
.then(function(r){if(!r.ok)throw 0;try{localStorage.setItem('ayCode',code)}catch(x){}f.hidden=true;$('ok').hidden=false;$('mycode').textContent=code;$('ck').value=code})
.catch(function(){$('err').hidden=false})});
try{var sv=localStorage.getItem('ayCode');if(sv)$('ck').value=sv}catch(x){}
function check(){var c=$('ck').value.trim().toUpperCase(),o=$('res');o.hidden=false;o.textContent='Checking...';
fetch('/status.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var x=d[c],m={approved:'Approved. Welcome! Check your email for details.',declined:'Not approved this time.',info:'I need a little more information. Please check your email.'};
o.textContent=x?(m[x.s]||x.s)+(x.n?' '+x.n:''):'Received. I have not reviewed '+c+' yet, so there is no decision to show. I read every request myself, so please check again in a day or two.';if(d._updated)o.textContent+=' (Status list updated '+new Date(d._updated).toLocaleString()+'.)'}).catch(function(){o.textContent='Could not check right now. Try again later.'})}
$('chk').addEventListener('submit',function(e){e.preventDefault();check()});
try{var u=new URLSearchParams(location.search).get('code');if(u){$('ck').value=u;check()}}catch(x){}
$('cp').onclick=function(){try{navigator.clipboard.writeText(code)}catch(x){}this.textContent='Copied'};
})();