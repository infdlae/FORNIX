!function(){"use strict";var e=window.matchMedia("(prefers-reduced-motion: reduce)").matches,t=document.getElementById("nav"),n=document.getElementById("backToTop");function r(){var e=window.scrollY||window.pageYOffset;t&&t.classList.toggle("is-scrolled",e>12),n&&n.classList.toggle("is-visible",e>700)}window.addEventListener("scroll",r,{passive:!0}),r(),n&&n.addEventListener("click",function(){window.scrollTo({top:0,behavior:e?"auto":"smooth"})});var o=document.querySelectorAll("[data-reveal]");if(e||!("IntersectionObserver"in window))o.forEach(function(e){e.classList.add("is-visible")});else{var i=new WeakMap,a=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var t=e.target,n=t.parentElement,r=i.get(n)||0;t.style.transitionDelay=Math.min(70*r,350)+"ms",i.set(n,r+1),t.classList.add("is-visible"),a.unobserve(t)}})},{threshold:.15,rootMargin:"0px 0px -60px 0px"});o.forEach(function(e){a.observe(e)})}e||document.querySelectorAll(".tilt").forEach(function(e){var t;e.addEventListener("mouseenter",function(){t=e.getBoundingClientRect()}),e.addEventListener("mousemove",function(n){t||(t=e.getBoundingClientRect());var r=10*((n.clientX-t.left)/t.width-.5),o=8*(.5-(n.clientY-t.top)/t.height);e.style.transform="perspective(1000px) rotateX("+o+"deg) rotateY("+r+"deg) translateY(-2px)"}),e.addEventListener("mouseleave",function(){e.style.transform=""})});document.querySelectorAll(".btn--primary").forEach(function(e){e.addEventListener("mousemove",function(t){var n=e.getBoundingClientRect();e.style.setProperty("--mx",t.clientX-n.left+"px"),e.style.setProperty("--my",t.clientY-n.top+"px")})}),document.querySelectorAll(".btn").forEach(function(e){e.addEventListener("click",function(t){var n=e.getBoundingClientRect(),r=document.createElement("span"),o=Math.max(n.width,n.height);r.className="ripple",r.style.width=r.style.height=o+"px",r.style.left=t.clientX-n.left-o/2+"px",r.style.top=t.clientY-n.top-o/2+"px",e.appendChild(r),window.setTimeout(function(){r.remove()},650)})});var l=document.querySelectorAll(".acc-item");l.forEach(function(e){var t=e.querySelector(".acc-trigger"),n=e.querySelector(".acc-panel");t&&n&&t.addEventListener("click",function(){var r="true"===t.getAttribute("aria-expanded");l.forEach(function(t){if(t!==e){var n=t.querySelector(".acc-trigger"),r=t.querySelector(".acc-panel");n&&n.setAttribute("aria-expanded","false"),r&&(r.style.maxHeight=null)}}),t.setAttribute("aria-expanded",String(!r)),n.style.maxHeight=r?null:n.scrollHeight+"px"})}),document.querySelectorAll("[data-cta]").forEach(function(e){e.addEventListener("click",function(){var t=e.getAttribute("data-cta");window.console&&console.info&&console.info("[FORNIX] CTA clicado:",t)})});var c=document.querySelectorAll("#dashRows .dash-row:not(.dash-row--ghost)");if(!e&&c.length){var s=0;window.setInterval(function(){c.forEach(function(e){e.style.background=""}),c[s].style.background="rgba(47,95,255,.08)",s=(s+1)%c.length},1800)}var d=document.getElementById("scrollProgress");if(d){var u=function(){var e=document.documentElement.scrollHeight-window.innerHeight||1,t=Math.min(1,Math.max(0,(window.scrollY||window.pageYOffset)/e));d.style.width=100*t+"%"};window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("resize",u),u()}var f=document.getElementById("bgChart");if(f)if(e)f.remove();else{for(var v,g,h=f.getContext("2d"),m=Math.min(window.devicePixelRatio||1,2),w=[],p=0;p<46;p++)w.push(Math.random());function q(){v=window.innerWidth,g=window.innerHeight,f.width=Math.round(v*m),f.height=Math.round(g*m),f.style.width=v+"px",f.style.height=g+"px",h.setTransform(m,0,0,m,0,0)}q(),window.addEventListener("resize",q);var y=performance.now();function I(e,t,n,r,o,i){return{x:e*i,y:o-Math.sin(.5*e+.3*t)*r*.45-e/46*r*(.55+.9*n)+10*(w[e]-.5)}}function C(e){var t,n=(e-y)/1e3,r=(t=document.documentElement.scrollHeight-window.innerHeight||1,Math.min(1,Math.max(0,(window.scrollY||window.pageYOffset)/t)));h.clearRect(0,0,v,g);var o=g*(.9-.32*r),i=24+85*r,a=v/45;h.beginPath();for(var l=0;l<46;l++){var c=I(l,n,r,i,o,a);0===l?h.moveTo(c.x,c.y):h.lineTo(c.x,c.y)}var s=h.createLinearGradient(0,0,v,0);s.addColorStop(0,"rgba(47,95,255,0.14)"),s.addColorStop(1,"rgba(22,199,132,0.14)"),h.strokeStyle=s,h.lineWidth=1.4,h.lineJoin="round",h.stroke(),h.lineTo(v,g),h.lineTo(0,g),h.closePath();var d=h.createLinearGradient(0,o-i,0,g);d.addColorStop(0,"rgba(47,95,255,0.06)"),d.addColorStop(1,"rgba(47,95,255,0)"),h.fillStyle=d,h.fill();for(var u=0;u<46;u+=5){var f=I(u,n,r,i,o,a);h.beginPath(),h.arc(f.x,f.y,2,0,2*Math.PI),h.fillStyle="rgba(22,199,132,0.16)",h.fill()}requestAnimationFrame(C)}requestAnimationFrame(C)}var E=document.querySelectorAll(".counter[data-target]");if(E.length){var b=function(e){return e.toLocaleString("pt-BR")};if("IntersectionObserver"in window){var x=new IntersectionObserver(function(t){t.forEach(function(t){t.isIntersecting&&(!function(t){var n=parseInt(t.getAttribute("data-target"),10)||0;if(e)t.textContent=b(n);else{var r=null;requestAnimationFrame(function e(o){r||(r=o);var i=Math.min(1,(o-r)/1400),a=1-Math.pow(1-i,3);t.textContent=b(Math.round(n*a)),i<1&&requestAnimationFrame(e)})}}(t.target),x.unobserve(t.target))})},{threshold:.6});E.forEach(function(e){x.observe(e)})}else E.forEach(function(e){e.textContent=b(parseInt(e.getAttribute("data-target"),10)||0)})}var L=document.querySelector(".hero__glow");L&&!e&&window.addEventListener("scroll",function(){var e=window.scrollY||window.pageYOffset;L.style.transform="translate3d(0,"+.15*e+"px,0)"},{passive:!0});var S=document.getElementById("mobileCta");if(S){var A=document.getElementById("final"),M=function(){var e=window.scrollY||window.pageYOffset,t=.9*window.innerHeight,n=A?A.offsetTop-80:1/0;S.classList.toggle("is-visible",e>t&&e<n)};window.addEventListener("scroll",M,{passive:!0}),window.addEventListener("resize",M),M()}}();
/* ===================== CARROSSEL DE PRODUTOS · MODA FEMININA ===================== */
(function(){
  var root=document.querySelector('[data-product-carousel]');
  if(!root) return;
  var track=root.querySelector('[data-carousel-track]');
  var cards=track?[].slice.call(track.querySelectorAll('.produto-card')):[];
  var prev=root.querySelector('[data-carousel-prev]');
  var next=root.querySelector('[data-carousel-next]');
  var dotsWrap=document.querySelector('[data-carousel-dots]');
  if(!track||!cards.length) return;

  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var index=0, timer=null, paused=false;
  var getStep=function(){
    var gap=parseFloat(getComputedStyle(track).columnGap||getComputedStyle(track).gap)||20;
    return cards[0].getBoundingClientRect().width+gap;
  };
  var visibleCount=function(){return Math.max(1,Math.floor((track.clientWidth+4)/getStep()));};
  var maxIndex=function(){return Math.max(0,cards.length-visibleCount());};
  var setCurrent=function(){
    cards.forEach(function(card,i){card.classList.toggle('is-current',i===Math.min(index,cards.length-1));});
    if(prev) prev.disabled=index<=0;
    if(next) next.disabled=index>=maxIndex();
  };
  var updateDots=function(){
    if(!dotsWrap) return;
    var total=maxIndex()+1;
    dotsWrap.innerHTML='';
    for(var i=0;i<total;i++){
      var b=document.createElement('button');
      b.type='button'; b.setAttribute('aria-label','Ir para posição '+(i+1)+' do carrossel');
      if(i===index) b.classList.add('is-active');
      b.addEventListener('click',(function(n){return function(){go(n);};})(i));
      dotsWrap.appendChild(b);
    }
  };
  var sync=function(){setCurrent();updateDots();};
  var go=function(i){
    index=Math.max(0,Math.min(i,maxIndex()));
    track.scrollTo({left:index*getStep(),behavior:reduced?'auto':'smooth'});
    sync();
  };
  var startAuto=function(){
    if(reduced||paused||timer) return;
    timer=window.setInterval(function(){if(!document.hidden&&!paused) go(index>=maxIndex()?0:index+1);},5200);
  };
  var stopAuto=function(){if(timer){clearInterval(timer);timer=null;}};

  prev&&prev.addEventListener('click',function(){go(index-1);});
  next&&next.addEventListener('click',function(){go(index+1);});
  track.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'){e.preventDefault();go(index+1);}
    if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}
  });
  var scrollTick=0;
  track.addEventListener('scroll',function(){
    cancelAnimationFrame(scrollTick);
    scrollTick=requestAnimationFrame(function(){var step=getStep();if(step){index=Math.max(0,Math.min(Math.round(track.scrollLeft/step),maxIndex()));sync();}});
  },{passive:true});
  root.addEventListener('mouseenter',function(){paused=true;stopAuto();});
  root.addEventListener('mouseleave',function(){paused=false;startAuto();});
  root.addEventListener('focusin',function(){paused=true;stopAuto();});
  root.addEventListener('focusout',function(){paused=false;startAuto();});
  track.addEventListener('touchstart',function(){paused=true;stopAuto();},{passive:true});
  track.addEventListener('touchend',function(){paused=false;startAuto();},{passive:true});
  window.addEventListener('resize',function(){index=Math.min(index,maxIndex());sync();});
  document.addEventListener('visibilitychange',function(){if(document.hidden)stopAuto();else startAuto();});

  sync();startAuto();
})();

/* ===================== POPUP DE OFERTA (exit-intent / timed, 1x por sessão) ===================== */
(function(){
  var popup=document.getElementById('offerPopup');
  if(!popup) return;
  var STORAGE_KEY='fornixOfferShown';
  var shown=false;
  try{shown=sessionStorage.getItem(STORAGE_KEY)==='1';}catch(err){}
  if(shown) return;

  var isMobile=window.matchMedia('(max-width:760px)').matches;
  var opened=false;

  function open(){
    if(opened) return;
    opened=true;
    popup.classList.add('is-open');
    popup.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    try{sessionStorage.setItem(STORAGE_KEY,'1');}catch(err){}
  }
  function close(){
    popup.classList.remove('is-open');
    popup.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  popup.querySelectorAll('[data-offer-close]').forEach(function(el){
    el.addEventListener('click',close);
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&popup.classList.contains('is-open')) close();
  });

  if(isMobile){
    // mobile: sem hover para exit-intent — dispara por tempo ou por rolagem profunda
    var timer=window.setTimeout(open,7000);
    var onScroll=function(){
      var scrolled=(window.scrollY||window.pageYOffset)+window.innerHeight;
      var full=document.documentElement.scrollHeight;
      if(scrolled>full*0.35){ open(); window.removeEventListener('scroll',onScroll); window.clearTimeout(timer); }
    };
    window.addEventListener('scroll',onScroll,{passive:true});
  } else {
    // desktop: exit-intent (mouse sai por cima da janela) após leitura mínima de 3s
    var ready=false;
    window.setTimeout(function(){ready=true;},3000);
    document.addEventListener('mouseout',function(e){
      if(!ready||opened) return;
      if(e.clientY<=0 && !e.relatedTarget) open();
    });
    // fallback: se o usuário nunca sair do mouse, mostra após 20s
    window.setTimeout(open,10000);
  }
})();