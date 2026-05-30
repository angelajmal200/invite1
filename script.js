const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>1-Math.pow(1-t,3);
const els={
  hero:document.querySelector('.hero'),
  groom:document.querySelector('.groom'),
  bride:document.querySelector('.bride'),
  topTitle:document.querySelector('.title-top'),
  centerTitle:document.querySelector('.title-center'),
  waveTop:document.querySelector('.wave-top'),
  waveBottom:document.querySelector('.wave-bottom'),
  lotusLeft:document.querySelector('.lotus-left'),
  lotusCenter:document.querySelector('.lotus-center'),
  lotusRight:document.querySelector('.lotus-right'),
  butterflyA:document.querySelector('.butterfly-a'),
  butterflyB:document.querySelector('.butterfly-b'),
  hint:document.querySelector('.scroll-hint')
};
let ticking=false;
function progress(){
  const rect=els.hero.getBoundingClientRect();
  const max=Math.max(1,rect.height-window.innerHeight);
  return clamp(-rect.top/max,0,1);
}
function render(){
  const p=progress();
  const mobile=window.innerWidth<760;
  const join=ease(clamp((p-.12)/.50,0,1));
  const reveal=ease(clamp((p-.52)/.22,0,1));
  const fadePeople=1-ease(clamp((p-.78)/.18,0,1));
  const groomStart=mobile?-48:-30;
  const brideStart=mobile?48:30;
  const meet=mobile?-15:-7;
  const scale=lerp(mobile?.90:.96,mobile?.96:1.02,join);
  els.groom.style.transform=`translateX(${lerp(groomStart,meet,join)}vw) scale(${scale})`;
  els.bride.style.transform=`translateX(${lerp(brideStart,-meet,join)}vw) scale(${scale})`;
  els.groom.style.opacity=String(fadePeople);
  els.bride.style.opacity=String(fadePeople);
  els.topTitle.style.opacity=String(clamp(1-p*2.4,0,1));
  els.topTitle.style.transform=`translate(-50%, ${-p*80}px) scale(${lerp(1,.94,p)})`;
  els.centerTitle.style.opacity=String(reveal);
  els.centerTitle.style.transform=`translate(-50%, ${lerp(40,0,reveal)}px) scale(${lerp(.96,1,reveal)})`;
  els.waveTop.style.transform=`translateX(-50%) translateY(${p*62}px) scaleY(-1)`;
  els.waveBottom.style.transform=`translateX(-50%) translateY(${-p*110}px)`;
  els.lotusLeft.style.transform=`translate(${p*8}vw, ${-p*10}vh) rotate(${-p*4}deg)`;
  els.lotusCenter.style.transform=`translateX(-50%) translateY(${-p*16}vh) scale(${lerp(.95,1.06,p)})`;
  els.lotusRight.style.transform=`translate(${-p*8}vw, ${-p*10}vh) scaleX(-1) rotate(${p*4}deg)`;
  els.butterflyA.style.transform=`translateX(-50%) translate(${lerp(0,4,p)}vw, ${lerp(0,-20,p)}vh) rotate(${p*12}deg) scale(${lerp(.88,1.05,p)})`;
  if(els.butterflyB) els.butterflyB.style.transform=`translate(${-p*20}vw, ${-p*18}vh) rotate(${-10-p*12}deg) scale(${lerp(.76,.95,p)})`;
  els.hint.style.opacity=String(clamp(1-p*7,0,1));
  ticking=false;
}
function request(){if(!ticking){requestAnimationFrame(render);ticking=true}}
window.addEventListener('scroll',request,{passive:true});
window.addEventListener('resize',request);
render();
