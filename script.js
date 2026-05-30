const scene = document.querySelector('#scene');
const stage = document.querySelector('.stage');

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from, to, amount) => from + (to - from) * amount;
const smooth = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};

let current = 0;
let target = 0;
let pointerX = 0;
let pointerY = 0;

function setVar(name, value) {
  stage.style.setProperty(name, value);
}

function updateTarget() {
  const rect = scene.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  target = clamp(-rect.top / scrollable);
}

function render() {
  current = lerp(current, target, 0.08);
  const p = current;

  const templeIntro = smooth(0.00, 0.20, p);
  const decorIn = smooth(0.16, 0.43, p);
  const coupleIn = smooth(0.36, 0.68, p);
  const titleIn = smooth(0.68, 0.92, p);
  const fadeBack = smooth(0.76, 1.0, p);

  const px = pointerX * 18;
  const py = pointerY * 14;

  setVar('--temple-y', `${lerp(60, -70, templeIntro) + py * 0.15}px`);
  setVar('--temple-scale', lerp(1.08, 0.94, p).toFixed(3));
  setVar('--temple-opacity', lerp(1, 0.62, fadeBack).toFixed(3));

  setVar('--leaf-opacity', decorIn.toFixed(3));
  setVar('--leaf-left-x', `${lerp(-260, 20, decorIn) + px * -0.22}px`);
  setVar('--leaf-left-y', `${lerp(-20, 65, p) + py * -0.2}px`);
  setVar('--leaf-right-x', `${lerp(260, -20, decorIn) + px * 0.22}px`);
  setVar('--leaf-right-y', `${lerp(-10, 55, p) + py * -0.18}px`);

  setVar('--lamp-opacity', smooth(0.20, 0.50, p).toFixed(3));
  setVar('--lamp-x', `${lerp(-190, 20, decorIn) + px * -0.12}px`);
  setVar('--lamp-y', `${lerp(80, -40, p) + py * 0.12}px`);

  setVar('--flower-opacity', smooth(0.28, 0.58, p).toFixed(3));
  setVar('--flower-left-x', `${lerp(-180, 18, decorIn) + px * -0.28}px`);
  setVar('--flower-left-y', `${lerp(90, -30, p) + py * 0.24}px`);
  setVar('--flower-right-x', `${lerp(180, -18, decorIn) + px * 0.28}px`);
  setVar('--flower-right-y', `${lerp(80, -36, p) + py * 0.24}px`);

  setVar('--couple-opacity', coupleIn.toFixed(3));
  setVar('--couple-y', `${lerp(330, -18, coupleIn) + py * 0.06}px`);
  setVar('--couple-scale', lerp(0.92, 1.02, coupleIn).toFixed(3));

  setVar('--title-opacity', titleIn.toFixed(3));
  setVar('--title-y', `${lerp(110, 0, titleIn) + py * -0.05}px`);
  setVar('--title-scale', lerp(0.96, 1, titleIn).toFixed(3));
  setVar('--hint-opacity', (1 - smooth(0.02, 0.14, p)).toFixed(3));

  requestAnimationFrame(render);
}

window.addEventListener('scroll', updateTarget, { passive: true });
window.addEventListener('resize', updateTarget, { passive: true });
window.addEventListener('pointermove', (event) => {
  pointerX = event.clientX / window.innerWidth - 0.5;
  pointerY = event.clientY / window.innerHeight - 0.5;
}, { passive: true });

updateTarget();
render();
