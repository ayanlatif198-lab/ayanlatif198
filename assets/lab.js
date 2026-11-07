(function(){
var $=function(i){return document.getElementById(i)};
// Guessing machine
var q=$('q'),s=$('start'),hi=$('hi'),lo=$('lo'),yes=$('yes'),a,b,g,n;
function play(o){hi.hidden=lo.hidden=yes.hidden=!o}
function ask(){g=Math.floor((a+b)/2);n++;q.textContent='Is your number '+g+'?'}
function bad(){q.textContent='That does not add up. Press Restart and try again.';play(0)}
s.onclick=function(){a=1;b=100;n=0;play(1);s.textContent='Restart';ask()};
hi.onclick=function(){a=g+1;a>b?bad():ask()};lo.onclick=function(){b=g-1;a>b?bad():ask()};
yes.onclick=function(){q.textContent='Found it in '+n+(n==1?' step.':' steps.')+' Halving the range finds any number from 1 to 100 in 7 steps or fewer.';play(0)};
// Binary bits
var V=[128,64,32,16,8,4,2,1],on=V.map(function(){return 0}),box=$('bits'),bn=$('bn');
V.forEach(function(v,i){var k=document.createElement('button');k.type='button';k.setAttribute('aria-pressed','false');k.innerHTML='0<small>'+v+'</small>';k.onclick=function(){on[i]^=1;k.setAttribute('aria-pressed',on[i]?'true':'false');k.firstChild.nodeValue=on[i];var t=0;V.forEach(function(x,j){t+=on[j]*x});bn.textContent=t};box.appendChild(k)});
// Password checker (runs only in this browser)
var pw=$('pw'),pr=$('pr'),pm=$('pm');
pw.oninput=function(){var p=pw.value,sc=0,tips=[];
if(p.length>=12)sc++;else tips.push('use 12 or more characters');
if(/[a-z]/.test(p)&&/[A-Z]/.test(p))sc++;else tips.push('mix upper and lower case');
if(/\d/.test(p))sc++;else tips.push('add a number');
if(/[^A-Za-z0-9]/.test(p))sc++;else tips.push('add a symbol');
pm.style.width=(p?sc*25:0)+'%';
pr.textContent=!p?'Type a password to test it.':(sc<2?'Weak':sc<4?'Okay':'Strong')+(tips.length?'. Tip: '+tips[0]+'.':'. Nice work.')};
// Quiz
var Q=[['What does CPU stand for?',['Central Processing Unit','Computer Power Unit','Core Program Utility'],0],['How many bits are in one byte?',['4','8','16'],1],['Which of these is an input device?',['Monitor','Speaker','Keyboard'],2],['What comes next: 2, 4, 8, 16, ?',['24','32','20'],1],['Which password is the safest?',['ayan2011','password123','Tr4in-Blue!Moon-77'],2]];
var qi=0,sc=0,qz=$('quiz');
function show(){qz.innerHTML='';if(qi>=Q.length){var p=document.createElement('p');p.className='q';p.textContent='You scored '+sc+' out of '+Q.length+'.';var r=document.createElement('button');r.className='btn solid';r.textContent='Play again';r.onclick=function(){qi=0;sc=0;show()};qz.append(p,r);return}
var d=Q[qi],p=document.createElement('p');p.className='q';p.textContent=(qi+1)+'. '+d[0];qz.appendChild(p);
d[1].forEach(function(o,i){var k=document.createElement('button');k.className='btn';k.type='button';k.textContent=o;k.onclick=function(){if(i==d[2])sc++;qi++;show()};qz.appendChild(k)})}
show();
})();
(function(){
var $=function(i){return document.getElementById(i)};
var E=['\u{1F4BB}','\u{1F4F1}','\u2328\uFE0F','\u{1F5B1}\uFE0F','\u{1F512}','\u{1F4E1}','\u{1F4BE}','\u{1F3A7}'],mb=$('mem'),mv=$('mv'),first=null,lock=0,moves=0,pairs=0;
function mem(){var d=E.concat(E).sort(function(){return Math.random()-.5});mb.innerHTML='';moves=0;pairs=0;first=null;lock=0;mv.textContent='Moves: 0';
d.forEach(function(e){var k=document.createElement('button');k.type='button';k.className='mc';k.setAttribute('aria-label','Hidden card');k.textContent='?';
k.onclick=function(){if(lock||k.classList.contains('up'))return;k.classList.add('up');k.textContent=e;k.dataset.e=e;
if(!first){first=k;return}moves++;mv.textContent='Moves: '+moves;
if(first.dataset.e==e){pairs++;first=null;if(pairs==8)mv.textContent='You won in '+moves+' moves!'}
else{lock=1;var f=first;first=null;setTimeout(function(){f.classList.remove('up');k.classList.remove('up');f.textContent='?';k.textContent='?';lock=0},700)}};
mb.appendChild(k)})}
$('mr').onclick=mem;mem();
var rb=$('rx'),rt=$('rtx'),rs=0,tm,best=0,t0;
rb.onclick=function(){
if(rs==0){rs=1;rb.className='rx wait';rb.textContent='Wait for green...';tm=setTimeout(function(){rs=2;rb.className='rx go';rb.textContent='TAP NOW!';t0=performance.now()},1000+Math.random()*2500)}
else if(rs==1){clearTimeout(tm);rs=0;rb.className='rx';rb.textContent='Too soon! Tap to try again'}
else{var ms=Math.round(performance.now()-t0);best=best?Math.min(best,ms):ms;rs=0;rb.className='rx';rb.textContent='Tap to start again';rt.textContent='Your time: '+ms+' ms. Best: '+best+' ms'}};
})();
