const stage = document.querySelector('#stage');
const items = {
  temple: document.querySelector('.temple'),
  leavesLeft: document.querySelector('.leaves-left'),
  leavesRight: document.querySelector('.leaves-right'),
  garlands: document.querySelector('.garlands'),
  lampsLeft: document.querySelector('.lamps-left'),
  lampsRight: document.querySelector('.lamps-right'),
  lotusLeft: document.querySelector('.lotus-left'),
  lotusRight: document.querySelector('.lotus-right'),
  couple: document.querySelector('.couple'),
  title: document.querySelector('.title-card'),
  hint: document.querySelector('.scroll-hint')
};
const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
const range=(p,a,b)=>clamp((p-a)/(b-a));
const ease=t=>1-Math.pow(1-t,3);
const lerp=(a,b,t)=>a+(b-a)*t;
let current=0,target=0;
function progress(){const r=stage.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight));}
function set(el, opacity, x, y, s=1, rot=0, flip=1){el.style.opacity=opacity;el.style.transform=`translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${s*flip}, ${s}) rotate(${rot}deg)`;}
function render(){target=progress();current=lerp(current,target,.09);const p=current;
  const t=ease(range(p,.02,.20)); set(items.temple, t, 0, lerp(120,-40,t), lerp(.86,1,t));
  const bl=ease(range(p,.16,.34)); set(items.leavesLeft, bl, lerp(-470,-95,bl), lerp(-30,-90,bl), .72, -17);
  set(items.leavesRight, bl, lerp(470,95,bl), lerp(-10,-75,bl), .72, 17, -1);
  const g=ease(range(p,.26,.43)); items.garlands.style.opacity=g; items.garlands.style.transform=`translate3d(-50%, calc(-50% + ${lerp(-430,-260,g)}px), 0) scale(${lerp(.86,1,g)})`;
  const l=ease(range(p,.33,.50)); set(items.lampsLeft,l,lerp(-130,-170,l),lerp(-250,-185,l),.55,0); set(items.lampsRight,l,lerp(130,170,l),lerp(-250,-185,l),.55,0);
  const lo=ease(range(p,.44,.62)); set(items.lotusLeft,lo,lerp(-120,-230,lo),lerp(520,250,lo),.55,-12); set(items.lotusRight,lo,lerp(120,230,lo),lerp(520,250,lo),.55,12,-1);
  const c=ease(range(p,.54,.76)); set(items.couple,c,0,lerp(620,60,c),lerp(.88,1,c));
  const tt=ease(range(p,.74,.90)); items.title.style.opacity=tt; items.title.style.transform=`translate3d(-50%, ${lerp(60,0,tt)}px, 0) scale(${lerp(.94,1,tt)})`;
  items.hint.style.opacity=clamp(1-p*8);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
