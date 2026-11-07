(function(){
var $=function(i){return document.getElementById(i)},K='ayReq',L=[],live={},flt='all',q='';
try{L=JSON.parse(localStorage.getItem(K)||'[]')}catch(x){}
function save(){try{localStorage.setItem(K,JSON.stringify(L))}catch(x){}}
var T={approved:'Approve',declined:'Decline',info:'Need info',pending:'Pending'};
var B={approved:'\u2713 Approved',declined:'\u2715 Declined',info:'? Need info',pending:'Pending'};
var M={pending:'I received your request and will review it soon.',approved:'Good news: you are approved. Welcome!',declined:'I am not able to approve it this time. Thanks for understanding.',info:'Could you tell me a little more about yourself and why you want to join?'};
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function st(r){return r.s||'pending'}
function dirty(r){var x=live[r.c],ls=x?x.s:'pending';return st(r)!=ls||(st(r)!='pending'&&(r.t||'')!=((x&&x.n)||''))}
function mail(r){var b='Hi '+(r.n||'there')+',\n\n'+M[st(r)]+(r.t?' '+r.t:'')+'\n\nYour request code: '+r.c+'\nCheck your status any time: '+location.origin+'/join.html?code='+r.c+'\n\nAyan';
return 'mailto:'+(r.e||'')+'?subject='+encodeURIComponent('Your request to join Ayan\u2019s list')+'&body='+encodeURIComponent(b)}
function add(c,n,e,m){c=(c||'').trim().toUpperCase();if(!/^AY-[A-Z0-9]{5}$/.test(c)||L.some(function(r){return r.c==c}))return 0;var x=live[c];L.unshift({c:c,n:(n||'').trim(),e:(e||'').trim(),s:x?x.s:'pending',t:x?(x.n||''):'',m:(m||'').trim(),u:x?0:1});return 1}
function stats(){var s={pending:0,approved:0,declined:0,info:0},d=0;L.forEach(function(r){s[st(r)]++;if(dirty(r))d++});
var o=$('stats');o.innerHTML='';[['Total',L.length],['Pending',s.pending],['Approved',s.approved],['Declined',s.declined],['Need info',s.info],['Not live',d]].forEach(function(a){var b=el('div','stat s-'+a[0].toLowerCase().replace(' ',''));b.appendChild(el('b',null,a[1]));b.appendChild(document.createTextNode(a[0]));o.appendChild(b)});
$('dirty').textContent=d?d+(d>1?' changes are':' change is')+' not live yet':'All changes are live'}
function draw(){stats();var o=$('list');o.innerHTML='';
var v=L.filter(function(r){var s=(r.c+' '+r.n+' '+r.e).toLowerCase();return(flt=='all'||st(r)==flt)&&s.indexOf(q)>-1});
if(!v.length){o.appendChild(el('p','note',L.length?'No requests match.':'No requests yet. Import or add one above.'));return}
v.forEach(function(r){var d=el('div','req s-'+st(r)),h=el('p'),av=el('span','av',(r.n||r.c).trim().charAt(0).toUpperCase());h.appendChild(av);h.appendChild(el('b','code',r.c));h.appendChild(el('span','badge b-'+st(r),B[st(r)]));if(dirty(r))h.appendChild(el('span','nl','not live'));
h.appendChild(document.createTextNode(' '+(r.n||'')));h.appendChild(el('br'));h.appendChild(el('span','note',r.e||''));if(r.m){h.appendChild(el('br'));h.appendChild(el('span','note','\u201C'+r.m.slice(0,160)+'\u201D'))}d.appendChild(h);
var row=el('div');Object.keys(T).forEach(function(k){var b=el('button','btn k-'+k+(st(r)==k?' on':''),T[k]);b.type='button';b.onclick=function(){r.s=k;r.u=0;save();draw()};row.appendChild(b)});d.appendChild(row);
var nt=el('input');nt.placeholder='Note shown to them (optional)';nt.value=r.t||'';nt.onchange=function(){r.t=nt.value;r.u=0;save();stats()};d.appendChild(nt);
var r2=el('div'),rp=el('a','btn','Reply by email');rp.href='#';rp.onclick=function(){rp.href=mail(r)};r2.appendChild(rp);
var dl=el('button','btn','Delete');dl.type='button';dl.onclick=function(){if(confirm('Delete this request from your list?')){L.splice(L.indexOf(r),1);save();draw()}};r2.appendChild(dl);d.appendChild(r2);o.appendChild(d)})}
$('fl').onchange=function(){flt=this.value;draw()};$('sq').oninput=function(){q=this.value.toLowerCase();draw()};
$('af').onsubmit=function(e){e.preventDefault();if(!add($('ac').value,$('an').value,$('ae').value)){alert('Use a code like AY-7K3Q9 that is not already in your list.');return}save();this.reset();draw()};
function parse(t){var re=/AY-[A-Z0-9]{5}/gi,m,ix=[],n=0;while(m=re.exec(t))ix.push([m[0],m.index]);
ix.forEach(function(a,i){var seg=t.slice(a[1],i+1<ix.length?ix[i+1][1]:t.length),pre=t.slice(Math.max(0,a[1]-120),a[1]),em=(seg.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)||[''])[0],nm=((pre+seg).match(/name\W+([A-Za-z][^\n\r,<]{0,40})/i)||['',''])[1];if(add(a[0],nm,em))n++});return n}
$('pf').onsubmit=function(e){e.preventDefault();var n=parse($('pt').value);save();draw();$('im').textContent=n?'Added '+n+' request'+(n>1?'s':'')+'.':'No new codes found in that text.';if(n)$('pt').value=''};
function csv(t){var R=[],r=[],f='',q=0;for(var i=0;i<t.length;i++){var c=t[i];if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=0}else f+=c}else if(c=='"')q=1;else if(c==','){r.push(f);f=''}else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;r.push(f);R.push(r);r=[];f=''}else f+=c}if(f||r.length){r.push(f);R.push(r)}return R}
$('cf').onchange=function(){var fl=this.files[0];if(!fl)return;var rd=new FileReader();rd.onload=function(){var R=csv(String(rd.result)),h=(R[0]||[]).map(function(x){return x.trim().toLowerCase()}),ix=function(k){return h.indexOf(k)},n=0;
R.slice(1).forEach(function(r){var c=ix('code')>-1?r[ix('code')]:'';if(!c)c=(r.join(' ').match(/AY-[A-Z0-9]{5}/i)||[''])[0];if(add(c,r[ix('name')],r[ix('email')],r[ix('message')]))n++});
save();draw();$('im').textContent=n?'Added '+n+' request'+(n>1?'s':'')+' from the file.':'No new requests found in that file.'};rd.readAsText(fl)};
fetch('/status.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){live=j;L.forEach(function(r){if(r.u&&live[r.c]){r.s=live[r.c].s;r.t=live[r.c].n||'';r.u=0}});save();$('lu').textContent=j._updated?'Live status list last updated '+new Date(j._updated).toLocaleString():'Live status list has not been updated yet.';draw()}).catch(function(){$('lu').textContent='Could not read the live status list.'});
draw();
var FILES=['index.html','about.html','activities.html','projects.html','join.html',location.pathname.split('/').pop()||'index.html','404.html','robots.txt','sitemap.xml','assets/style.css','assets/app.js','assets/lab.js','assets/join.js','assets/desk.js','assets/bg.jpg','assets/bg.webp','assets/portrait.jpg','assets/portrait.webp','assets/mirror.jpg','assets/mirror.webp','assets/og.jpg','assets/vault.json','assets/admin.js','admin.html','favicon.svg','favicon.ico','apple-touch-icon.png','icon-192.png','icon-512.png','site.webmanifest'];
var HDR='/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/assets/*\n  Cache-Control: public, max-age=3600\n/status.json\n  Cache-Control: no-cache\n';
function crc(b){var t=crc.t;if(!t){t=crc.t=[];for(var n=0,c;n<256;n++){c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}}var r=-1;for(var i=0;i<b.length;i++)r=t[(r^b[i])&255]^(r>>>8);return(r^-1)>>>0}
function zip(fs){var P=[],C=[],off=0,enc=new TextEncoder();
fs.forEach(function(f){var nm=enc.encode(f.n),c=crc(f.d),l=f.d.length,h=new DataView(new ArrayBuffer(30));
h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(12,0x21,true);h.setUint32(14,c,true);h.setUint32(18,l,true);h.setUint32(22,l,true);h.setUint16(26,nm.length,true);P.push(h.buffer,nm,f.d);
var d=new DataView(new ArrayBuffer(46));d.setUint32(0,0x02014b50,true);d.setUint16(4,20,true);d.setUint16(6,20,true);d.setUint16(8,0x0800,true);d.setUint16(14,0x21,true);d.setUint32(16,c,true);d.setUint32(20,l,true);d.setUint32(24,l,true);d.setUint16(28,nm.length,true);d.setUint32(42,off,true);C.push(d.buffer,nm);off+=30+nm.length+l});
var cs=0;C.forEach(function(x){cs+=x.byteLength});var e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,fs.length,true);e.setUint16(10,fs.length,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
return new Blob(P.concat(C,[e.buffer]),{type:'application/zip'})}
function B64(u){var s='';u.forEach(function(x){s+=String.fromCharCode(x)});return btoa(s)}
async function encv(pw,txt){var salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),it=250000,e=new TextEncoder();
var k=await crypto.subtle.importKey('raw',e.encode(pw),'PBKDF2',false,['deriveKey']);
var key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:it,hash:'SHA-256'},k,{name:'AES-GCM',length:256},false,['encrypt']);
var ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:iv},key,e.encode(txt)));return{i:it,s:B64(salt),v:B64(iv),c:B64(ct)}}
$('pwf').onsubmit=async function(e){e.preventDefault();var m=$('pwm'),a=$('np').value;if(a!=$('np2').value){m.textContent='The two passwords do not match.';return}
if(a.length<8){m.textContent='Use at least 8 characters.';return}
try{localStorage.setItem('ayVault',JSON.stringify(await encv(a,location.pathname.split('/').pop())));this.reset();m.textContent='Saved. Now tap Download updated site and upload it to Netlify to make the new password live.'}catch(x){m.textContent='Could not set the password in this browser.'}};
$('pub').onclick=async function(){var m=$('pm');m.textContent='Building...';
try{var s2={};try{s2=await(await fetch('/status.json',{cache:'no-store'})).json()}catch(x){}
s2._updated=new Date().toISOString();L.forEach(function(r){if(st(r)!='pending')s2[r.c]={s:st(r),n:r.t||''};else delete s2[r.c]});
var enc=new TextEncoder(),fs=[];
for(var i=0;i<FILES.length;i++){var r=await fetch('/'+FILES[i],{cache:'no-store'});if(!r.ok)throw new Error(FILES[i]);fs.push({n:FILES[i],d:new Uint8Array(await r.arrayBuffer())})}
try{var pv=localStorage.getItem('ayVault');if(pv){fs=fs.filter(function(x){return x.n!='assets/vault.json'});fs.push({n:'assets/vault.json',d:enc.encode(pv)})}}catch(x){}
fs.push({n:'status.json',d:enc.encode(JSON.stringify(s2,null,1))},{n:'_headers',d:enc.encode(HDR)});
var a=document.createElement('a');a.href=URL.createObjectURL(zip(fs));a.download='ayan-site.zip';document.body.appendChild(a);a.click();a.remove();
m.textContent='Done. Now upload ayan-site.zip on Netlify (Deploys).'}
catch(e){m.textContent='Could not build. Open this page from your live site, not a saved file. ('+e.message+')'}};
})();