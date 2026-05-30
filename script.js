const layers = [...document.querySelectorAll('[data-speed]')];
const hero = document.querySelector('#hero');
let pointerX = 0;
let pointerY = 0;

function render() {
  const scrollY = window.scrollY;
  layers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed || 0);
    const x = pointerX * speed * 26;
    const y = (scrollY * speed * -0.45) + pointerY * speed * 18;
    layer.style.translate = `${x}px ${y}px`;
  });
  requestAnimationFrame(render);
}

hero.addEventListener('pointermove', (event) => {
  const rect = hero.getBoundingClientRect();
  pointerX = (event.clientX - rect.left) / rect.width - 0.5;
  pointerY = (event.clientY - rect.top) / rect.height - 0.5;
});

hero.addEventListener('pointerleave', () => {
  pointerX = 0;
  pointerY = 0;
});

render();
