(function(){
var r=[].slice.call(document.querySelectorAll('.card,.item,.links,.tile,h2'));r.forEach(function(s){s.classList.add('rv')});
if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});r.forEach(function(s){io.observe(s)})}else r.forEach(function(s){s.classList.add('in')});
var b=document.getElementById('bar'),t=0;addEventListener('scroll',function(){if(t)return;t=1;requestAnimationFrame(function(){var m=document.documentElement.scrollHeight-innerHeight;b.style.transform='scaleX('+(m>0?scrollY/m:0)+')';t=0})},{passive:true});
})();