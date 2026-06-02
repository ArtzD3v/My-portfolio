/* --- CANVAS ANIMATION --- */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const wrap = document.getElementById('app');

let W, H, cols, rows, cells = [];
let mx = -9999, my = -9999;
const SIZE = 38, GAP = 4, STEP = SIZE + GAP;
const RADIUS = 150;
const MAX_LIFT = 40;
const SPEED = 0.05;
const MAX_GRAY = 180;

function resize() {
  W = canvas.width = wrap.clientWidth;
  H = canvas.height = wrap.clientHeight;
  cols = Math.ceil(W / STEP) + 1;
  rows = Math.ceil(H / STEP) + 1;
  cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        bx: c * STEP + GAP / 2,
        by: r * STEP + GAP / 2,
        lift: 0,
        targetLift: 0,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
}

window.addEventListener('resize', resize);
resize();

wrap.addEventListener('mousemove', e => {
  const r = wrap.getBoundingClientRect();
  mx = e.clientX - r.left;
  my = e.clientY - r.top;
});
wrap.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });

function easeOut(x) { return 1 - Math.pow(1 - x, 4); }

let t = 0;
function loop() {
  requestAnimationFrame(loop);
  t += 1;
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, W, H);

  cells.forEach(cell => {
    const cx = cell.bx + SIZE / 2;
    const cy = cell.by + SIZE / 2;
    const dx = cx - mx, dy = cy - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const idleFloat = Math.sin(t * 0.02 + cell.phase) * 3;

    if (dist < RADIUS) {
      const norm = easeOut(1 - dist / RADIUS);
      cell.targetLift = norm * MAX_LIFT;
    } else {
      cell.targetLift = 0;
    }

    cell.lift += (cell.targetLift - cell.lift) * SPEED;
    const lift = cell.lift + idleFloat;
    const perspective = 1 + lift / 200;
    const drawW = SIZE * perspective;
    const drawH = SIZE * perspective;
    const ox = (drawW - SIZE) / 2;
    const oy = (drawH - SIZE) / 2;
    const top = cell.by - lift;
    const left = cell.bx - ox;
    const brightness = Math.min(1, cell.lift / MAX_LIFT);
    const gray = Math.round(25 + brightness * (MAX_GRAY - 25));
    
    const r2 = 2;
    ctx.beginPath();
    ctx.roundRect(left, top - oy, drawW, drawH, r2);
    ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
    ctx.fill();

    if (brightness > 0.05) {
      ctx.beginPath();
      ctx.roundRect(left, top - oy, drawW, 2, [r2, r2, 0, 0]);
      const topGray = Math.min(240, gray + 50);
      ctx.fillStyle = `rgba(${topGray},${topGray},${topGray},${brightness * 0.8})`;
      ctx.fill();
    }
  });
}
loop();

/* --- SCROLL CONTROLLER --- */
const sections = document.querySelectorAll('section');
const navContainer = document.getElementById('nav');
const sectionLabels = ['About', 'Profile', 'Services', 'Process', 'Selected Work', 'Contact'];
let currentIdx = 0;
let isScrolling = false;

sections.forEach((_, i) => {
  const link = document.createElement('a');
  link.className = `nav-link ${i === 0 ? 'active' : ''}`;
  link.textContent = sectionLabels[i];
  link.addEventListener('click', () => goToSection(i));
  navContainer.appendChild(link);
});

function updateNav() {
  document.querySelectorAll('.nav-link').forEach((link, i) => {
    link.classList.toggle('active', i === currentIdx);
  });
}

function goToSection(idx) {
  if (idx < 0 || idx >= sections.length || idx === currentIdx || isScrolling) return;
  
  isScrolling = true;
  const currentSection = sections[currentIdx];
  const nextSection = sections[idx];
  const movingDown = idx > currentIdx;

  nextSection.classList.remove('from-top', 'from-bottom', 'exit-up', 'exit-down');
  nextSection.classList.add(movingDown ? 'from-bottom' : 'from-top');

  requestAnimationFrame(() => {
    currentSection.classList.remove('active');
    currentSection.classList.add(movingDown ? 'exit-up' : 'exit-down');
    nextSection.classList.add('active');
    
    setTimeout(() => {
      currentSection.classList.remove('exit-up', 'exit-down', 'from-top', 'from-bottom');
      currentIdx = idx;
      updateNav();
      isScrolling = false;
    }, 1500);
  });
}

window.addEventListener('wheel', e => {
  if (isScrolling) return;
  if (Math.abs(e.deltaY) > 30) {
    if (e.deltaY > 0) {
      if (currentIdx < sections.length - 1) goToSection(currentIdx + 1);
    } else {
      if (currentIdx > 0) goToSection(currentIdx - 1);
    }
  }
}, { passive: true });

let touchStartY = 0;
window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchmove', e => {
  if (isScrolling) return;
  const touchEndY = e.touches[0].clientY;
  const diff = touchStartY - touchEndY;
  if (Math.abs(diff) > 70) {
    if (diff > 0) {
      if (currentIdx < sections.length - 1) goToSection(currentIdx + 1);
    } else {
      if (currentIdx > 0) goToSection(currentIdx - 1);
    }
  }
}, { passive: true });
