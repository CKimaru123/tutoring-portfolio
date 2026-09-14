import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';

// ══════════════════════════════════════════════════════════════════════════════
//  SUBJECT DATA — whiteboard cards, info panel content, quizzes, portals
// ══════════════════════════════════════════════════════════════════════════════
const SUBJECTS = {
  Mathematics: {
    icon: '📐',
    color: 0x315a78,
    colorHex: '#315a78',
    description:
      'Explore algebra, geometry, calculus, statistics, and mathematical reasoning. ' +
      'Sessions are built from first principles — understanding always precedes technique.',
    portal: `
      <div class="portal-header" style="background:linear-gradient(135deg,#1a3a5a,#315a78)">
        <div class="portal-icon">📐</div>
        <h2>Mathematics</h2>
        <p>A-Level · IB HL · GCSE · Further Maths</p>
      </div>
      <div class="portal-body">
        <div class="portal-topics">
          <div class="portal-topic">∫ Calculus</div>
          <div class="portal-topic">∑ Algebra</div>
          <div class="portal-topic">△ Geometry</div>
          <div class="portal-topic">σ Statistics</div>
          <div class="portal-topic">ℝ Pure Maths</div>
          <div class="portal-topic">⊕ Mechanics</div>
        </div>
        <div class="portal-quote">"Mathematics is not about numbers, equations or algorithms. It is about understanding." — William Paul Thurston</div>
        <a href="#booking" class="portal-cta">Book a Mathematics Session →</a>
      </div>`,
    quiz: [
      { q: 'What is the derivative of sin(x)?', a: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'], correct: 0 },
      { q: 'What is ∫ 2x dx?', a: ['x²', 'x² + C', '2x² + C', 'x + C'], correct: 1 },
      { q: 'Solve: x² − 5x + 6 = 0', a: ['x = 2, 3', 'x = 1, 6', 'x = −2, −3', 'x = 0, 5'], correct: 0 },
    ],
  },
  Sciences: {
    icon: '🔬',
    color: 0x305b46,
    colorHex: '#305b46',
    description:
      'Physics, Chemistry, and Biology taught through conceptual depth and visual models. ' +
      'The mathematics underneath each science is developed in parallel with the theory.',
    portal: `
      <div class="portal-header" style="background:linear-gradient(135deg,#1a3a2a,#305b46)">
        <div class="portal-icon">🔬</div>
        <h2>Sciences</h2>
        <p>Physics · Chemistry · Biology — A-Level &amp; IB</p>
      </div>
      <div class="portal-body">
        <div class="portal-topics">
          <div class="portal-topic">⚛ Quantum</div>
          <div class="portal-topic">⬡ Organic Chem</div>
          <div class="portal-topic">🌊 Waves</div>
          <div class="portal-topic">🧬 Biology</div>
          <div class="portal-topic">⚡ Electricity</div>
          <div class="portal-topic">🧪 Reactions</div>
        </div>
        <div class="portal-quote">"The whole of science is nothing more than a refinement of everyday thinking." — Albert Einstein</div>
        <a href="#booking" class="portal-cta">Book a Sciences Session →</a>
      </div>`,
    quiz: [
      { q: "Newton's second law states F =", a: ['ma', 'mv', 'mv²', 'm/a'], correct: 0 },
      { q: 'What is the charge of an electron?', a: ['+1.6×10⁻¹⁹ C', '−1.6×10⁻¹⁹ C', '0', '−9.1×10⁻³¹ C'], correct: 1 },
      { q: 'Which bond type involves sharing electrons?', a: ['Ionic', 'Metallic', 'Covalent', 'Hydrogen'], correct: 2 },
    ],
  },
  'Computer Science': {
    icon: '💻',
    color: 0x5b3b72,
    colorHex: '#5b3b72',
    description:
      'Algorithms, data structures, programming, and computational thinking. ' +
      'Sessions connect theoretical CS to practical coding in Python, Java, and beyond.',
    portal: `
      <div class="portal-header" style="background:linear-gradient(135deg,#3a1a5a,#5b3b72)">
        <div class="portal-icon">💻</div>
        <h2>Computer Science</h2>
        <p>A-Level · GCSE · Programming · Algorithms</p>
      </div>
      <div class="portal-body">
        <div class="portal-topics">
          <div class="portal-topic">🌳 Data Structures</div>
          <div class="portal-topic">⚙ Algorithms</div>
          <div class="portal-topic">🐍 Python</div>
          <div class="portal-topic">☕ Java</div>
          <div class="portal-topic">🤖 AI Basics</div>
          <div class="portal-topic">🔐 Security</div>
        </div>
        <div class="portal-quote">"First, solve the problem. Then, write the code." — John Johnson</div>
        <a href="#booking" class="portal-cta">Book a CS Session →</a>
      </div>`,
    quiz: [
      { q: 'What is the time complexity of binary search?', a: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct: 2 },
      { q: 'Which data structure uses LIFO?', a: ['Queue', 'Stack', 'Linked List', 'Tree'], correct: 1 },
      { q: 'What does CPU stand for?', a: ['Central Process Unit', 'Central Processing Unit', 'Computer Processing Unit', 'Core Processing Unit'], correct: 1 },
    ],
  },
  Economics: {
    icon: '📊',
    color: 0xc56b32,
    colorHex: '#c56b32',
    description:
      'Microeconomics, macroeconomics, and econometrics. Markets, policy, GDP, inflation, ' +
      'and the mathematical models that connect economic theory to the real world.',
    portal: `
      <div class="portal-header" style="background:linear-gradient(135deg,#7a3a10,#c56b32)">
        <div class="portal-icon">📊</div>
        <h2>Economics</h2>
        <p>A-Level · IB · Micro · Macro · Econometrics</p>
      </div>
      <div class="portal-body">
        <div class="portal-topics">
          <div class="portal-topic">📈 Supply &amp; Demand</div>
          <div class="portal-topic">🏦 Monetary Policy</div>
          <div class="portal-topic">🌍 GDP &amp; Growth</div>
          <div class="portal-topic">📉 Inflation</div>
          <div class="portal-topic">⚖ Market Failure</div>
          <div class="portal-topic">📐 Econometrics</div>
        </div>
        <div class="portal-quote">"Economics is the painful elaboration of the obvious." — John Kenneth Galbraith</div>
        <a href="#booking" class="portal-cta">Book an Economics Session →</a>
      </div>`,
    quiz: [
      { q: 'When price rises, quantity demanded typically…', a: ['Rises', 'Falls', 'Stays same', 'Doubles'], correct: 1 },
      { q: 'What does GDP stand for?', a: ['Gross Domestic Product', 'General Domestic Price', 'Gross Demand Price', 'General Demand Product'], correct: 0 },
      { q: 'Price elasticity of demand measures…', a: ['Supply response to price', 'Demand response to income', 'Demand response to price', 'Supply response to income'], correct: 2 },
    ],
  },
};

const DESK_OBJECTS = {
  book: {
    icon: '📖',
    title: 'Teaching Philosophy',
    text: 'Understanding before memorisation. Every concept is introduced with a visual intuition, then formalised mathematically. Students who understand why can solve problems they have never seen before.',
    subject: null,
  },
  laptop: {
    icon: '💻',
    title: 'Online Learning',
    text: 'Every online session uses a shared interactive whiteboard — fully real-time annotation, problem-solving, and worked examples. Notes are shared as PDFs after each session.',
    subject: 'Computer Science',
  },
  calculator: {
    icon: '🧮',
    title: 'Mathematics Toolkit',
    text: 'From GCSE algebra to university calculus — specialisms include A-Level Pure & Statistics, IB Mathematics HL, Further Maths, and SAT/ACT preparation.',
    subject: 'Mathematics',
  },
  globe: {
    icon: '🌍',
    title: 'Economics & The World',
    text: 'Economics connects markets, governments, and individuals. Sessions ground theory in real-world data — GDP, inflation, elasticity, and policy analysis.',
    subject: 'Economics',
  },
  notebook: {
    icon: '📋',
    title: 'Lesson Planning',
    text: 'Every student receives a personalised learning roadmap before the first session — a living document updated after each lesson to reflect progress and priorities.',
    subject: null,
  },
};

// ══════════════════════════════════════════════════════════════════════════════
//  CANVAS TEXTURE HELPERS
// ══════════════════════════════════════════════════════════════════════════════
function makeTextCanvas(lines, opts = {}) {
  const W = opts.width  || 512;
  const H = opts.height || 256;
  const c = document.createElement('canvas');
  c.width  = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = opts.bg || '#f5f5f0';
  ctx.fillRect(0, 0, W, H);
  lines.forEach(({ text, y, size = 28, color = '#1a1a2a', weight = 'normal', align = 'center' }) => {
    ctx.font      = `${weight} ${size}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, align === 'center' ? W / 2 : 24, y);
  });
  return new THREE.CanvasTexture(c);
}

function makeFloorTexture() {
  const W = 512; const H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  // Wood plank floor
  ctx.fillStyle = '#7a5c3e';
  ctx.fillRect(0, 0, W, H);
  for (let row = 0; row < 8; row++) {
    const offset = (row % 2) * 64;
    for (let col = -1; col < 9; col++) {
      const x = col * 128 + offset;
      const y = row * 64;
      ctx.fillStyle = `hsl(25, 40%, ${28 + (row * col * 3) % 8}%)`;
      ctx.fillRect(x + 1, y + 1, 126, 62);
      ctx.strokeStyle = 'rgba(0,0,0,0.18)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 1, y + 1, 126, 62);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 4);
  return t;
}

function makeWallTexture(hue = 220) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = `hsl(${hue},12%,88%)`;
  ctx.fillRect(0, 0, 256, 256);
  // subtle plaster texture
  for (let i = 0; i < 600; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.03})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 2);
  return t;
}

function makeWoodTexture(dark = false) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  const base = dark ? 30 : 42;
  ctx.fillStyle = `hsl(25,55%,${base}%)`;
  ctx.fillRect(0, 0, 256, 256);
  // grain lines
  for (let i = 0; i < 20; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${0.04 + Math.random() * 0.06})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, i * 13 + Math.random() * 10);
    ctx.lineTo(256, i * 13 + Math.random() * 20);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(c);
}

function makeBoardTexture(subject, subtitle) {
  const W = 512; const H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const subj = SUBJECTS[subject];
  // gradient background
  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, '#f8f8f4');
  grd.addColorStop(1, '#eeeee8');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
  // coloured top stripe
  const hexColor = subj?.colorHex || '#315a78';
  ctx.fillStyle = hexColor;
  ctx.fillRect(0, 0, W, 8);
  // icon
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(subj?.icon || '📚', W / 2, 70);
  // title
  ctx.fillStyle = '#1a1a2a';
  ctx.font = 'bold 42px Arial';
  ctx.fillText(subject.toUpperCase(), W / 2, 130);
  // subtitle
  ctx.fillStyle = '#555568';
  ctx.font = '26px Arial';
  ctx.fillText(subtitle, W / 2, 175);
  // bottom rule
  ctx.strokeStyle = hexColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W * 0.2, 200); ctx.lineTo(W * 0.8, 200);
  ctx.stroke();
  return new THREE.CanvasTexture(c);
}

function makeWhiteboardWelcomeTexture() {
  const W = 1024; const H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f8f8f4';
  ctx.fillRect(0, 0, W, H);
  // Light rule lines like a whiteboard
  for (let y = 60; y < H; y += 60) {
    ctx.strokeStyle = 'rgba(180,180,200,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.fillStyle = '#1a1a2a';
  ctx.font = 'bold 52px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText("Welcome to The Tutor's Desk", W / 2, 110);
  ctx.font = '32px Arial';
  ctx.fillStyle = '#444458';
  ctx.fillText('Click a subject card below to begin', W / 2, 175);
  // Equation decorations
  const eqs = ['e^(iπ) + 1 = 0', 'F = ma', 'φ = (1+√5)/2', 'PED = %ΔQ / %ΔP'];
  eqs.forEach((eq, i) => {
    ctx.font = 'italic 28px Georgia';
    ctx.fillStyle = `hsl(${210 + i * 40}, 50%, 45%)`;
    ctx.fillText(eq, 140 + i * 185, 280);
  });
  ctx.font = '22px Arial';
  ctx.fillStyle = '#888';
  ctx.fillText('Mathematics  ·  Sciences  ·  Computer Science  ·  Economics', W / 2, 380);
  return new THREE.CanvasTexture(c);
}

// ══════════════════════════════════════════════════════════════════════════════
//  GEOMETRY HELPERS
// ══════════════════════════════════════════════════════════════════════════════
function box(scene, w, h, d, mat, x, y, z, rotY = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  m.castShadow = true; m.receiveShadow = true;
  scene.add(m); return m;
}
function cyl(scene, rT, rB, h, mat, x, y, z, segs = 20) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rT, rB, h, segs), mat);
  m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true;
  scene.add(m); return m;
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export function initClassroom() {

  // ── DOM refs ───────────────────────────────────────────────────────────────
  const openBtn     = document.getElementById('open-classroom');
  const overlay     = document.getElementById('classroom-overlay');
  const canvas      = document.getElementById('classroom-canvas');
  const closeBtn    = document.getElementById('cls-close');
  const orbitBtn    = document.getElementById('cls-orbit-btn');
  const fpBtn       = document.getElementById('cls-fp-btn');
  const crosshair   = document.getElementById('cls-crosshair');
  const lockPrompt  = document.getElementById('cls-lock-prompt');
  const instructions= document.getElementById('cls-instructions');
  const panel       = document.getElementById('cls-panel');
  const panelClose  = document.getElementById('cls-panel-close');
  const panelIcon   = document.getElementById('cls-panel-icon');
  const panelTitle  = document.getElementById('cls-panel-title');
  const panelText   = document.getElementById('cls-panel-text');
  const panelAction = document.getElementById('cls-panel-action');
  const quizEl      = document.getElementById('cls-quiz');
  const quizTitle   = document.getElementById('cls-quiz-title');
  const quizBody    = document.getElementById('cls-quiz-body');
  const portalEl    = document.getElementById('cls-portal');
  const portalInner = document.getElementById('cls-portal-inner');
  const portalBack  = document.getElementById('cls-portal-back');

  let initialized = false;
  let animFrameId = null;

  // ── Open classroom ─────────────────────────────────────────────────────────
  // Store the booking section's absolute offset BEFORE opening (body overflow not yet locked)
  let bookingSectionTop = 0;
  openBtn?.addEventListener('click', () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSectionTop = bookingSection.getBoundingClientRect().top + window.pageYOffset;
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!initialized) { buildClassroom(); initialized = true; }
  });

  // ── Close ──────────────────────────────────────────────────────────────────
  function closeClassroom() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    drag.active = false;
    // Reset all movement keys
    Object.keys(fpMove).forEach(k => fpMove[k] = false);
    showOrbitMode();
  }
  closeBtn?.addEventListener('click', closeClassroom);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      if (activeMode === 'fp') {
        // Esc in FP mode returns to orbit rather than closing
        showOrbitMode();
      } else {
        closeClassroom();
      }
    }
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  BUILD EVERYTHING
  // ══════════════════════════════════════════════════════════════════════════
  let orbitControls, renderer, scene, camera, clock;
  let globe, lampShade, lampPt;
  let activeMode = 'orbit';  // 'orbit' | 'fp'

  // ── Custom FP controller state (no PointerLock — works on all platforms) ───
  const fpMove    = { forward: false, backward: false, left: false, right: false };
  const FP_SPEED  = 6;
  const FP_HEIGHT = 3.8;
  // Euler for FP look (yaw + pitch)
  const fpYaw   = { value: Math.PI };  // start facing whiteboard
  const fpPitch = { value: -0.15 };
  // Mouse/touch drag state
  const drag = { active: false, lastX: 0, lastY: 0 };

  function buildClassroom() {
    // ── Renderer ────────────────────────────────────────────────────────────
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfc9d1);
    scene.fog = new THREE.Fog(0xbfc9d1, 20, 50);

    // ── Camera ───────────────────────────────────────────────────────────────
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(8, 6, 11);

    clock = new THREE.Clock();

    // ── Orbit controls ───────────────────────────────────────────────────────
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 22;
    orbitControls.maxPolarAngle = Math.PI * 0.48;
    orbitControls.target.set(0, 2, 0);

    // ── PointerLock removed — using custom FP controller instead ──────────────
    // Works on macOS, Windows, iOS, Android without requiring pointer lock API

    // ── Resize ───────────────────────────────────────────────────────────────
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    buildLights();
    buildRoom();
    buildWhiteboard();
    buildSubjectCards();
    buildDesk();
    buildAvatar();
    buildInteractiveObjects();
    buildWallShelves();
    buildChair();
    setupInteraction();
    animate();
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  PHASE 1 — TEXTURED CLASSROOM
  // ══════════════════════════════════════════════════════════════════════════

  function buildLights() {
    // Sky + ground hemisphere
    scene.add(new THREE.HemisphereLight(0xffffff, 0x707060, 1.8));

    // Main directional (sun through window)
    const sun = new THREE.DirectionalLight(0xfff5e0, 3.5);
    sun.position.set(-5, 10, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far  = 50;
    sun.shadow.camera.left = sun.shadow.camera.bottom = -15;
    sun.shadow.camera.right = sun.shadow.camera.top   =  15;
    scene.add(sun);

    // Warm desk lamp point light
    lampPt = new THREE.PointLight(0xffe4bd, 20, 9);
    lampPt.position.set(2.8, 3.5, 0);
    lampPt.castShadow = true;
    scene.add(lampPt);

    // Cool fill from window side
    const fill = new THREE.DirectionalLight(0xaaccff, 0.6);
    fill.position.set(12, 5, -3);
    scene.add(fill);
  }

  function buildRoom() {
    const floorMat = new THREE.MeshStandardMaterial({ map: makeFloorTexture(), roughness: 0.8 });
    const wallMat  = new THREE.MeshStandardMaterial({ map: makeWallTexture(220), roughness: 0.9 });
    const ceilMat  = new THREE.MeshStandardMaterial({ color: 0xf2f0ea, roughness: 1 });

    // Floor
    box(scene, 30, 0.3, 30, floorMat, 0, -0.15, 0);
    // Ceiling
    box(scene, 30, 0.3, 30, ceilMat,  0, 12.15, 0);
    // Back wall
    box(scene, 30, 12.3, 0.3, wallMat, 0, 6, -7);
    // Left wall
    box(scene, 0.3, 12.3, 30, wallMat, -12, 6, 0);
    // Right wall (partial — allows window light)
    box(scene, 0.3, 12.3, 30, new THREE.MeshStandardMaterial({ map: makeWallTexture(30), roughness: 0.9 }), 12, 6, 0);

    // Skirting boards
    const skirt = new THREE.MeshStandardMaterial({ map: makeWoodTexture(true), roughness: 0.7 });
    box(scene, 30, 0.18, 0.18, skirt, 0, 0.09, -6.91);
    box(scene, 0.18, 0.18, 30,  skirt, -11.91, 0.09, 0);

    // Windows (back wall)
    buildWindow(-5, 6, -6.75);
    buildWindow(5,  6, -6.75);

    // Ceiling light strip
    const ceilLight = new THREE.RectAreaLight !== undefined
      ? null
      : new THREE.PointLight(0xfffff0, 3, 20);
    if (ceilLight) { ceilLight.position.set(0, 11, 0); scene.add(ceilLight); }

    // Wall trim / dado rail
    box(scene, 30, 0.12, 0.12, skirt, 0, 3.2, -6.94);
  }

  function buildWindow(x, y, z) {
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x3a2e24, roughness: 0.6 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x88bbdd, transparent: true, opacity: 0.55, roughness: 0.1, metalness: 0.1
    });
    // Frame
    box(scene, 5.2, 4.4, 0.2, frameMat, x, y, z);
    // Glass pane
    box(scene, 4.6, 3.8, 0.06, glassMat, x, y, z - 0.1);
    // Mullions
    box(scene, 0.1, 3.8, 0.1, frameMat, x, y, z - 0.14);
    box(scene, 4.6, 0.1, 0.1, frameMat, x, y, z - 0.14);
    // Window sill
    box(scene, 5.4, 0.15, 0.4, frameMat, x, y - 2.25, z + 0.1);
  }

  // ── Whiteboard ──────────────────────────────────────────────────────────────
  let whiteboardMesh;
  function buildWhiteboard() {
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.5 });
    // Frame border
    box(scene, 10.4, 5.3, 0.2, frameMat, 0, 5.5, -6.55);
    // Board surface with welcome texture
    const boardMat = new THREE.MeshStandardMaterial({ map: makeWhiteboardWelcomeTexture(), roughness: 0.85 });
    whiteboardMesh = box(scene, 9.8, 4.7, 0.08, boardMat, 0, 5.5, -6.44);
    whiteboardMesh.userData = { type: 'whiteboard' };
    // Tray at the bottom
    box(scene, 10.4, 0.18, 0.4, frameMat, 0, 3.1, -6.45);
    // Marker / eraser on tray
    const markerMat = new THREE.MeshStandardMaterial({ color: 0x2244aa });
    box(scene, 0.6, 0.12, 0.12, markerMat, -0.8, 3.24, -6.3);
    box(scene, 0.4, 0.12, 0.2,
      new THREE.MeshStandardMaterial({ color: 0xeeeee0, roughness: 0.9 }),
      0.4, 3.24, -6.3);
  }

  // ── Subject cards (bottom of whiteboard) ───────────────────────────────────
  const cardMeshes = [];
  function buildSubjectCards() {
    const subjects = Object.keys(SUBJECTS);
    const subtitles = ['Equations · Geometry · Calculus', 'Physics · Chemistry · Biology', 'Code · Algorithms · AI', 'Markets · GDP · Finance'];
    const xPositions = [-5.2, -1.7, 2.1, 5.5];
    subjects.forEach((subj, i) => {
      const mat = new THREE.MeshStandardMaterial({ map: makeBoardTexture(subj, subtitles[i]), roughness: 0.8 });
      const card = box(scene, 3.7, 2.2, 0.06, mat, xPositions[i], 1.5, -6.38);
      card.userData = { type: 'subject', subject: subj };
      cardMeshes.push(card);
    });
  }

  // ── Teacher's Desk (fully textured wood) ────────────────────────────────────
  function buildDesk() {
    const woodMat     = new THREE.MeshStandardMaterial({ map: makeWoodTexture(), roughness: 0.65 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ map: makeWoodTexture(true), roughness: 0.7 });

    // Desktop
    box(scene, 10, 0.5, 4.5, woodMat, 0, 2.1, 0);
    // Modesty panel (front face)
    box(scene, 10, 1.6, 0.15, darkWoodMat, 0, 1.3, 2.2);
    // Legs
    [[-4.2, 1, -1.5], [4.2, 1, -1.5], [-4.2, 1, 1.5], [4.2, 1, 1.5]].forEach(([x,y,z]) => {
      box(scene, 0.4, 2, 0.4, darkWoodMat, x, y, z);
    });
    // Side drawers (left)
    box(scene, 2.5, 1.8, 4.2, darkWoodMat, -3.8, 1.2, 0);
    // Drawer pulls
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.2, metalness: 0.9 });
    [-0.5, 0.5, 1.5].forEach(dy => {
      cyl(scene, 0.04, 0.04, 0.3, metalMat, -3.8, 1.3 + dy, 2.16, 8);
    });
  }

  // ── Stylised Teacher Avatar ─────────────────────────────────────────────────
  // Geometric but clearly human — stands behind desk, gestures toward whiteboard
  function buildAvatar() {
    const skinMat  = new THREE.MeshStandardMaterial({ color: 0xc68642, roughness: 0.7 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.8 });  // navy shirt
    const trouser  = new THREE.MeshStandardMaterial({ color: 0x2a2a35, roughness: 0.8 });
    const hairMat  = new THREE.MeshStandardMaterial({ color: 0x1a0e05, roughness: 0.9 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x333344, roughness: 0.3, metalness: 0.6 });

    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(-1.5, 0, -1.8);
    avatarGroup.rotation.y = 0.3; // faces slightly toward class

    // Legs
    box(avatarGroup, 0.38, 1.4, 0.35, trouser, -0.2, 0.7, 0);
    box(avatarGroup, 0.38, 1.4, 0.35, trouser,  0.2, 0.7, 0);
    // Shoes
    box(avatarGroup, 0.4, 0.15, 0.55, new THREE.MeshStandardMaterial({ color: 0x111111 }), -0.2, 0.07, 0.08);
    box(avatarGroup, 0.4, 0.15, 0.55, new THREE.MeshStandardMaterial({ color: 0x111111 }),  0.2, 0.07, 0.08);
    // Torso (shirt)
    box(avatarGroup, 0.78, 1.3, 0.45, shirtMat, 0, 2.05, 0);
    // Collar / tie
    box(avatarGroup, 0.12, 0.6, 0.06, new THREE.MeshStandardMaterial({ color: 0xc4a05c, roughness: 0.6 }), 0, 2.45, 0.22);
    // Left arm (lowered)
    box(avatarGroup, 0.28, 1.1, 0.28, shirtMat, -0.55, 1.9, 0);
    // Right arm (raised — pointing at whiteboard)
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.1, 0.28), shirtMat);
    rightArm.position.set(0.55, 2.2, -0.2);
    rightArm.rotation.z = -0.55;
    rightArm.rotation.x = -0.35;
    avatarGroup.add(rightArm);
    // Hands
    box(avatarGroup, 0.22, 0.22, 0.22, skinMat, -0.55, 1.3, 0);
    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), skinMat);
    rightHand.position.set(0.85, 2.65, -0.5);
    avatarGroup.add(rightHand);
    // Neck
    cyl(avatarGroup, 0.14, 0.14, 0.22, skinMat, 0, 2.78, 0, 10);
    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.62, 0.52), skinMat);
    head.position.set(0, 3.2, 0);
    avatarGroup.add(head);
    // Hair
    box(avatarGroup, 0.6, 0.2, 0.54, hairMat, 0, 3.56, 0);
    box(avatarGroup, 0.62, 0.42, 0.18, hairMat, 0, 3.38, -0.17);
    // Eyes
    box(avatarGroup, 0.09, 0.09, 0.05, new THREE.MeshStandardMaterial({ color: 0x111111 }), -0.15, 3.22, 0.27);
    box(avatarGroup, 0.09, 0.09, 0.05, new THREE.MeshStandardMaterial({ color: 0x111111 }),  0.15, 3.22, 0.27);
    // Glasses
    const glassGeo = new THREE.TorusGeometry(0.09, 0.015, 6, 16);
    const gl1 = new THREE.Mesh(glassGeo, glassMat);
    gl1.position.set(-0.15, 3.22, 0.27); gl1.rotation.y = Math.PI / 2;
    avatarGroup.add(gl1);
    const gl2 = new THREE.Mesh(glassGeo, glassMat);
    gl2.position.set(0.15, 3.22, 0.27); gl2.rotation.y = Math.PI / 2;
    avatarGroup.add(gl2);
    box(avatarGroup, 0.2, 0.015, 0.015, glassMat, 0, 3.22, 0.27); // bridge

    avatarGroup.traverse(m => {
      if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; }
    });
    scene.add(avatarGroup);

    // Store right arm for animation
    scene.userData.avatarRightArm = rightArm;
    scene.userData.avatarGroup    = avatarGroup;
  }

  // ── Desk objects (laptop, books, calculator, globe, notebook, lamp) ─────────
  const deskObjMeshes = {};

  function buildInteractiveObjects() {
    const woodMat = new THREE.MeshStandardMaterial({ map: makeWoodTexture(), roughness: 0.7 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.4 });
    const goldMat  = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.15, metalness: 0.9 });

    // ── Laptop ──────────────────────────────────────────────────────────────
    const laptopG = new THREE.Group();
    laptopG.position.set(0.5, 2.48, -0.5);
    scene.add(laptopG);
    const lBase = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.24, 2.3),
      new THREE.MeshStandardMaterial({ color: 0x2a2d35, roughness: 0.25, metalness: 0.75 }));
    lBase.castShadow = true; laptopG.add(lBase);
    const lScreen = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x2a2d35, roughness: 0.25, metalness: 0.75 }));
    lScreen.position.set(0, 1.2, -1.05); lScreen.rotation.x = -0.12;
    lScreen.castShadow = true; laptopG.add(lScreen);
    const lDisp = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.85, 0.04),
      new THREE.MeshStandardMaterial({ map: makeTextCanvas([
        { text: "THE TUTOR'S DESK", y: 80,  size: 36, weight: 'bold', color: '#44ff88' },
        { text: 'Learn · Practice · Master', y: 130, size: 22, color: '#88bbff' },
        { text: 'Collins Kiragu | Mathematics & Sciences', y: 175, size: 18, color: '#aaaacc' },
      ], { bg: '#0d1117', width: 512, height: 256 }), roughness: 0.5 }));
    lDisp.position.set(0, 1.2, -0.98); lDisp.rotation.x = -0.12; laptopG.add(lDisp);
    const lProxy = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.4, 2.5), new THREE.MeshBasicMaterial({ visible: false }));
    lProxy.position.set(0, 1.1, -0.5); laptopG.add(lProxy);
    lProxy.userData = { type: 'desk-object', key: 'laptop' };
    deskObjMeshes.laptop = laptopG;

    // ── Books stack ──────────────────────────────────────────────────────────
    const bookColors = [0x315a78, 0x305b46, 0x5b3b72, 0xc56b32];
    const bookSubjs  = Object.keys(SUBJECTS);
    const bookG = new THREE.Group();
    scene.add(bookG);
    bookColors.forEach((col, i) => {
      const bk = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.35, 1.5),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 }));
      bk.position.set(-3.4, 2.65 + i * 0.37, 0.3 + i * 0.18);
      bk.rotation.y = (Math.random() - 0.5) * 0.1;
      bk.castShadow = true; bk.receiveShadow = true;
      bk.userData = { type: 'subject', subject: bookSubjs[i] };
      scene.add(bk);
      // Spine label
      const spineMap = makeTextCanvas([
        { text: bookSubjs[i].toUpperCase(), y: 100, size: 22, weight: 'bold', color: '#ffffff', align: 'center' }
      ], { bg: '#' + col.toString(16).padStart(6, '0'), width: 256, height: 128 });
      const spineMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 1.5),
        new THREE.MeshStandardMaterial({ map: spineMap }));
      spineMesh.position.set(-3.4 + 1.19, 2.65 + i * 0.37, 0.3 + i * 0.18);
      scene.add(spineMesh);
    });

    // ── Calculator ───────────────────────────────────────────────────────────
    const calcG = new THREE.Group();
    calcG.position.set(3, 2.5, 1);
    scene.add(calcG);
    const calcBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 1.8), blackMat);
    calcBody.castShadow = true; calcG.add(calcBody);
    const calcScreen = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 0.5),
      new THREE.MeshBasicMaterial({ color: 0x88ffcc, transparent: true, opacity: 0.8 }));
    calcScreen.position.set(0, 0.145, 0.5); calcG.add(calcScreen);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      const btn = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.22),
        new THREE.MeshStandardMaterial({ color: 0x2a3040, roughness: 0.7 }));
      btn.position.set(-0.33 + c * 0.28, 0.16, 0.1 - r * 0.3); calcG.add(btn);
    }
    const calcProxy = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 2.0), new THREE.MeshBasicMaterial({ visible: false }));
    calcG.add(calcProxy);
    calcProxy.userData = { type: 'desk-object', key: 'calculator' };
    deskObjMeshes.calculator = calcG;

    // ── Globe ────────────────────────────────────────────────────────────────
    globe = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshStandardMaterial({
        map: makeTextCanvas([
          { text: '🌍', y: 140, size: 60, align: 'center' },
          { text: 'ECONOMICS', y: 200, size: 26, weight: 'bold', color: '#c56b32' }
        ], { bg: '#3b7fa3', width: 256, height: 256 }),
        roughness: 0.5
      }));
    globe.position.set(3.5, 3.2, -0.8);
    globe.castShadow = true; scene.add(globe);
    globe.userData = { type: 'desk-object', key: 'globe' };
    deskObjMeshes.globe = globe;
    cyl(scene, 0.5, 0.5, 0.15, woodMat, 3.5, 2.35, -0.8);

    // ── Notebook ─────────────────────────────────────────────────────────────
    const nbMat = new THREE.MeshStandardMaterial({
      map: makeTextCanvas([
        { text: '📋 LESSON NOTES', y: 80,  size: 30, weight: 'bold', color: '#1a1a2a' },
        { text: 'Personalised roadmap', y: 130, size: 22, color: '#445566' },
        { text: 'Updated every session', y: 165, size: 20, color: '#778899' },
      ], { bg: '#f5f5ef', width: 512, height: 256 }), roughness: 0.9
    });
    const nb = new THREE.Mesh(new THREE.BoxGeometry(3, 0.08, 2.3), nbMat);
    nb.position.set(1, 2.48, 1.8); nb.rotation.y = -0.08;
    nb.castShadow = true; nb.receiveShadow = true;
    nb.userData = { type: 'desk-object', key: 'notebook' };
    scene.add(nb); deskObjMeshes.notebook = nb;

    // ── Pen holder + pens ────────────────────────────────────────────────────
    cyl(scene, 0.35, 0.35, 0.8, blackMat, 4, 2.9, 1.8);
    for (let i = 0; i < 7; i++) {
      const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8),
        new THREE.MeshStandardMaterial({ color: [0x111111, 0x315a78, 0xc56b32, 0x305b46][i % 4] }));
      pen.position.set(3.88 + (i % 3) * 0.1, 3.55, 1.75 + Math.floor(i / 3) * 0.12);
      pen.rotation.z = (Math.random() - 0.5) * 0.22;
      scene.add(pen);
    }

    // ── Desk lamp ─────────────────────────────────────────────────────────────
    const lMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.5 });
    const goldLMat = new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.12, metalness: 0.88 });
    cyl(scene, 0.55, 0.55, 0.15, lMat, 2.8, 2.4, 1.8);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.8, 8), goldLMat);
    pole.position.set(2.8, 3.3, 1.8); pole.rotation.z = -0.18; scene.add(pole);
    lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.7, 32, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xe8d5a3, roughness: 0.6, side: THREE.DoubleSide }));
    lampShade.position.set(2.65, 4.1, 1.8); lampShade.rotation.x = Math.PI;
    lampShade.castShadow = true; scene.add(lampShade);

    // ── Coffee mug ────────────────────────────────────────────────────────────
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.6 });
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.28, 16, 1, true), mugMat);
    mug.position.set(4.2, 2.52, 1.5); scene.add(mug);
    const mugB = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), mugMat);
    mugB.rotation.x = -Math.PI / 2; mugB.position.set(4.2, 2.38, 1.5); scene.add(mugB);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 16, Math.PI), mugMat);
    handle.position.set(4.36, 2.52, 1.5); handle.rotation.y = Math.PI / 2; scene.add(handle);

    // ── Award trophy ──────────────────────────────────────────────────────────
    cyl(scene, 0.35, 0.4, 0.08, goldMat, 4.2, 2.54, -1.0, 12);
    cyl(scene, 0.06, 0.09, 0.35, goldMat, 4.2, 2.72, -1.0, 12);
    cyl(scene, 0.22, 0.1, 0.45, goldMat, 4.2, 3.02, -1.0, 16);
    const trophy = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), goldMat);
    trophy.position.set(4.2, 3.02, -1.0); scene.add(trophy);

    // ── Open book on desk ─────────────────────────────────────────────────────
    const pageMat = new THREE.MeshStandardMaterial({ color: 0xf0ece0, roughness: 0.9 });
    const spMat   = new THREE.MeshStandardMaterial({ color: 0x6b3310, roughness: 0.5 });
    const cvMat   = new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.5 });
    const bookGrp = new THREE.Group();
    bookGrp.position.set(-1.5, 2.37, 0.5);
    const bkL = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.03, 1.1), pageMat);
    bkL.position.x = -0.44; bkL.rotation.z = -0.04; bkL.castShadow = true; bookGrp.add(bkL);
    const bkR = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.03, 1.1), pageMat);
    bkR.position.x = 0.44; bkR.rotation.z = 0.04; bkR.castShadow = true; bookGrp.add(bkR);
    bookGrp.add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 1.1), spMat));
    const bkCvL = new THREE.Mesh(new THREE.BoxGeometry(0.87, 0.025, 1.12), cvMat);
    bkCvL.position.set(-0.44, -0.015, 0); bookGrp.add(bkCvL);
    const bkCvR = new THREE.Mesh(new THREE.BoxGeometry(0.87, 0.025, 1.12), cvMat);
    bkCvR.position.set(0.44, -0.015, 0); bookGrp.add(bkCvR);
    bookGrp.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
    scene.add(bookGrp);
    const bkProxy = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.3, 1.3), new THREE.MeshBasicMaterial({ visible: false }));
    bkProxy.userData = { type: 'desk-object', key: 'book' };
    bookGrp.add(bkProxy);
    deskObjMeshes.book = bookGrp;
  }

  function buildWallShelves() {
    const darkWoodMat = new THREE.MeshStandardMaterial({ map: makeWoodTexture(true), roughness: 0.7 });
    // Two shelves
    box(scene, 7.5, 0.22, 1.0, darkWoodMat, -5, 4.5, -6.3);
    box(scene, 7.5, 0.22, 1.0, darkWoodMat, -5, 6.5, -6.3);
    // Books on shelves
    for (let i = 0; i < 12; i++) {
      const h = 1.5 + Math.random() * 0.5;
      const bk = new THREE.Mesh(new THREE.BoxGeometry(0.38, h, 0.65),
        new THREE.MeshStandardMaterial({ color: [0x315a78, 0x305b46, 0x5b3b72, 0xc56b32, 0x7a4a22][i % 5], roughness: 0.7 }));
      bk.position.set(-8.3 + i * 0.58, (i < 6 ? 4.5 : 6.5) + h / 2 + 0.11, -6.4);
      bk.rotation.z = (Math.random() - 0.5) * 0.04;
      bk.castShadow = true; scene.add(bk);
    }
    // ── Real-time analog wall clock ───────────────────────────────────────────
    buildAnalogClock(scene, overlay, interactiveObjects);
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  REAL-TIME ANALOG WALL CLOCK  (drop-in, self-diagnosing)
  // ══════════════════════════════════════════════════════════════════════════
  function buildAnalogClock(scene, overlay, interactiveObjects) {
    const CLOCK_X = -9;
    const CLOCK_Y = 7.2;
    const CLOCK_Z = -6.58;
    const RADIUS  = 1.6;
    const TEX_W   = 1024;

    console.log('[clock] building — TEX_W =', TEX_W, 'radius =', RADIUS);

    // ── Canvas + texture ──────────────────────────────────────────────────
    const clockCanvas = document.createElement('canvas');
    clockCanvas.width  = TEX_W;
    clockCanvas.height = TEX_W;
    const ctx = clockCanvas.getContext('2d');

    // Paint a placeholder so the texture is never empty
    ctx.fillStyle = '#232838';
    ctx.fillRect(0, 0, TEX_W, TEX_W);

    const clockTex = new THREE.CanvasTexture(clockCanvas);
    clockTex.colorSpace      = THREE.SRGBColorSpace;   // ← colour-correct
    clockTex.anisotropy      = 16;
    clockTex.minFilter       = THREE.LinearFilter;
    clockTex.magFilter       = THREE.LinearFilter;
    clockTex.generateMipmaps = false;
    clockTex.needsUpdate     = true;

    // ── Draw one hand ─────────────────────────────────────────────────────
    function drawHand(cx, angle, length, width, color, hasTail = false) {
      const tail = hasTail ? 56 : 20;
      ctx.save();
      ctx.translate(cx, cx);
      ctx.rotate(angle);

      // 1) Dark outline (contrast ring)
      ctx.beginPath();
      ctx.moveTo(0, tail);
      ctx.lineTo(0, -length);
      ctx.strokeStyle = 'rgba(0,0,0,0.7)';
      ctx.lineWidth   = width + 8;
      ctx.lineCap     = 'round';
      ctx.stroke();

      // 2) Colored hand on top
      ctx.beginPath();
      ctx.moveTo(0, tail);
      ctx.lineTo(0, -length);
      ctx.strokeStyle = color;
      ctx.lineWidth   = width;
      ctx.lineCap     = 'round';
      ctx.stroke();

      ctx.restore();
    }

    // ── Full redraw ───────────────────────────────────────────────────────
    function drawClock() {
      try {
        const now   = new Date();
        const hours = now.getHours() % 12;
        const mins  = now.getMinutes();
        const secs  = now.getSeconds();
        const ms    = now.getMilliseconds();

        const CX = TEX_W / 2;
        const R  = TEX_W / 2 - 8;

        ctx.clearRect(0, 0, TEX_W, TEX_W);

        // Face
        const grad = ctx.createRadialGradient(CX, CX, 0, CX, CX, R);
        grad.addColorStop(0,    '#4a5065');
        grad.addColorStop(0.85, '#343a4d');
        grad.addColorStop(1,    '#232838');
        ctx.beginPath();
        ctx.arc(CX, CX, R, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Outer ring
        ctx.beginPath();
        ctx.arc(CX, CX, R, 0, Math.PI * 2);
        ctx.strokeStyle = '#c4a05c';
        ctx.lineWidth   = 16;
        ctx.stroke();

        // Ticks
        for (let i = 0; i < 60; i++) {
          const angle   = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const isMajor = i % 5 === 0;
          const outer   = R - 4;
          const inner   = isMajor ? R - 56 : R - 28;
          ctx.beginPath();
          ctx.moveTo(CX + Math.cos(angle) * inner, CX + Math.sin(angle) * inner);
          ctx.lineTo(CX + Math.cos(angle) * outer, CX + Math.sin(angle) * outer);
          ctx.strokeStyle = isMajor ? '#e0c07a' : 'rgba(255,255,255,0.45)';
          ctx.lineWidth   = isMajor ? 8 : 3;
          ctx.stroke();
        }

        // Numerals
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle    = '#ffffff';
        for (let i = 1; i <= 12; i++) {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const nr    = R - 104;
          const big   = (i === 12 || i === 3 || i === 6 || i === 9);
          ctx.font    = `bold ${big ? 68 : 56}px Georgia`;
          ctx.fillText(String(i), CX + Math.cos(angle) * nr, CX + Math.sin(angle) * nr);
        }

        // Hands
        // Note: drawHand translates to centre then rotates — at angle 0 the
        // hand already points to 12 (straight up), so NO - Math.PI/2 offset needed.
        const hourAngle = ((hours + mins / 60 + secs / 3600) / 12) * Math.PI * 2;
        drawHand(CX, hourAngle, R * 0.52, 20, '#ffffff');

        const minAngle = ((mins + secs / 60) / 60) * Math.PI * 2;
        drawHand(CX, minAngle, R * 0.75, 12, '#ffffff');

        const secAngle = ((secs + ms / 1000) / 60) * Math.PI * 2;
        drawHand(CX, secAngle, R * 0.82, 5, '#e0c07a', true);

        // Centre boss
        ctx.beginPath();
        ctx.arc(CX, CX, 28, 0, Math.PI * 2);
        ctx.fillStyle = '#c4a05c';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(CX, CX, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        clockTex.needsUpdate = true;
      } catch (e) {
        console.error('[clock] drawClock threw:', e);
      }
    }

    // Initial paint — twice, to defeat any lost-needsUpdate race.
    drawClock();
    requestAnimationFrame(() => { drawClock(); clockTex.needsUpdate = true; });

    const clockInterval = setInterval(drawClock, 33);

    
    // ── 3D meshes ─────────────────────────────────────────────────────────
    const faceMesh = new THREE.Mesh(
      new THREE.CircleGeometry(RADIUS, 64),
      new THREE.MeshBasicMaterial({ map: clockTex, toneMapped: false })
    );
    faceMesh.position.set(CLOCK_X, CLOCK_Y, CLOCK_Z + 0.15);
    faceMesh.castShadow = true;
    scene.add(faceMesh);

    faceMesh.renderOrder = 999;
    faceMesh.material.depthTest  = false;
    faceMesh.material.depthWrite = false;

    setTimeout(() => {
      const wp = new THREE.Vector3();
      faceMesh.getWorldPosition(wp);
      console.log('[chk] face world position =', wp.toArray());
      console.log('[chk] face world scale    =', faceMesh.getWorldScale(new THREE.Vector3()).toArray());
      console.log('[chk] face parent         =', faceMesh.parent?.type, faceMesh.parent?.name);
      console.log('[chk] face visible chain  =',
        (function walk(o){ let v=o.visible; while(o.parent){o=o.parent; v=v&&o.visible;} return v; })(faceMesh));
    }, 300);

    // Outer frame (torus)
    const frameMesh = new THREE.Mesh(
      new THREE.TorusGeometry(RADIUS, 0.1, 12, 64),
      new THREE.MeshStandardMaterial({ color: 0x3a2e24, roughness: 0.4, metalness: 0.3 })
    );
    frameMesh.position.set(CLOCK_X, CLOCK_Y, CLOCK_Z + 0.17);
    scene.add(frameMesh);

    // Wall mount plate behind clock
    const mountMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(RADIUS + 0.15, RADIUS + 0.15, 0.18, 32),
      new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.6 })
    );
    mountMesh.rotation.x = Math.PI / 2;
    mountMesh.position.set(CLOCK_X, CLOCK_Y, CLOCK_Z + 0.07);
    scene.add(mountMesh);

    // Hover detection mesh
    const hitMesh = new THREE.Mesh(
      new THREE.CircleGeometry(RADIUS, 32),
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
    );
    hitMesh.position.set(CLOCK_X, CLOCK_Y, CLOCK_Z + 0.20);
    hitMesh.userData = { type: 'clock' };
    scene.add(hitMesh);
    interactiveObjects.push(hitMesh);

    // ── Tooltip ───────────────────────────────────────────────────────────
    const tooltip = document.createElement('div');
    tooltip.id = 'cls-clock-tooltip';
    tooltip.style.cssText = `
      position: absolute; display: none;
      background: rgba(10,15,22,0.92); backdrop-filter: blur(14px);
      border: 1px solid rgba(196,160,92,0.4); border-radius: 14px;
      padding: 16px 20px; color: #fff; font-family: 'Inter', sans-serif;
      pointer-events: none; z-index: 40; min-width: 200px; text-align: center;
      transform: translate(-50%, -110%);
    `;
    overlay.appendChild(tooltip);

    hitMesh.userData.onHover = (screenX, screenY) => {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const dateStr = now.toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      tooltip.innerHTML = `
        <div style="font-family:'Georgia',serif;font-size:2rem;font-weight:700;color:#c4a05c;letter-spacing:0.05em;margin-bottom:4px">${timeStr}</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.75);margin-bottom:2px">${dateStr}</div>
        <div style="font-family:monospace;font-size:0.65rem;color:rgba(255,255,255,0.4);letter-spacing:0.1em">${tz}</div>
      `;
      tooltip.style.display = 'block';
      tooltip.style.left    = `${screenX}px`;
      tooltip.style.top     = `${screenY}px`;
    };
    hitMesh.userData.onLeave = () => { tooltip.style.display = 'none'; };

    console.log('[clock] build complete');
  }

  function buildChair() {
    const darkWoodMat = new THREE.MeshStandardMaterial({ map: makeWoodTexture(true), roughness: 0.7 });
    const cushionMat  = new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.8 });
    // Seat
    box(scene, 2.8, 0.3, 2.8, darkWoodMat, 0, 1.4, 5);
    box(scene, 2.6, 0.2, 2.6, cushionMat, 0, 1.55, 5);
    // Back
    box(scene, 2.8, 2.8, 0.3, darkWoodMat, 0, 2.8, 6.2);
    box(scene, 2.4, 2.3, 0.2, cushionMat, 0, 2.85, 6.15);
    // Legs
    [[-1.1, 0.7, 3.6], [1.1, 0.7, 3.6], [-1.1, 0.7, 6.4], [1.1, 0.7, 6.4]].forEach(([x,y,z]) => {
      box(scene, 0.2, 1.4, 0.2, darkWoodMat, x, y, z);
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  PHASE 2 — INTERACTION + FIRST-PERSON MODE
  // ══════════════════════════════════════════════════════════════════════════

  // ── Raycaster interaction ─────────────────────────────────────────────────
  const raycaster = new THREE.Raycaster();
  const mouse     = new THREE.Vector2();
  let   hoveredObj = null;
  const interactiveObjects = [];

  function setupInteraction() {
    // Collect all interactive objects
    scene.traverse(obj => {
      if (obj.isMesh && (obj.userData.type === 'subject' || obj.userData.type === 'desk-object' || obj.userData.type === 'whiteboard')) {
        interactiveObjects.push(obj);
      }
    });

    // Mouse events
    renderer.domElement.addEventListener('pointermove',  onPointerMove);
    renderer.domElement.addEventListener('pointerdown',  onPointerDown);
    renderer.domElement.addEventListener('pointerup',    onPointerUp);
    renderer.domElement.addEventListener('click',        onPointerClick);

    // Touch events (iOS / Android)
    renderer.domElement.addEventListener('touchstart',   onTouchStart,  { passive: true });
    renderer.domElement.addEventListener('touchmove',    onTouchMove,   { passive: false });
    renderer.domElement.addEventListener('touchend',     onTouchEnd,    { passive: true });

    // Mode buttons
    orbitBtn?.addEventListener('click', showOrbitMode);
    fpBtn?.addEventListener('click',    showFPMode);

    // Keyboard (Mac + Windows)
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup',   onKeyUp);

    // Mobile D-pad (added to overlay)
    buildMobileDpad();

    // Help shortcut panel
    buildHelpPanel();
  }

  function onPointerMove(e) {
    if (activeMode === 'fp') {
      // FP look via mouse drag
      if (drag.active) {
        const dx = e.clientX - drag.lastX;
        const dy = e.clientY - drag.lastY;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        fpYaw.value   -= dx * 0.003;
        fpPitch.value -= dy * 0.003;
        fpPitch.value  = Math.max(-0.8, Math.min(0.6, fpPitch.value));
      }
      return;
    }
    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactiveObjects);
    if (hits.length > 0) {
      const obj = hits[0].object;

      // Clock hover — show tooltip
      if (obj.userData.type === 'clock') {
        canvas.style.cursor = 'default';
        obj.userData.onHover?.(e.clientX, e.clientY);
        if (hoveredObj && hoveredObj !== obj) {
          hoveredObj.scale.multiplyScalar(1 / 1.04);
          hoveredObj.userData.onLeave?.();
        }
        hoveredObj = obj;
        return;
      }

      canvas.style.cursor = 'pointer';
      if (hoveredObj !== obj) {
        if (hoveredObj) { hoveredObj.scale.multiplyScalar(1 / 1.04); hoveredObj.userData.onLeave?.(); }
        hoveredObj = obj;
        hoveredObj.scale.multiplyScalar(1.04);
      }
    } else {
      canvas.style.cursor = 'default';
      if (hoveredObj) {
        hoveredObj.scale.multiplyScalar(1 / 1.04);
        hoveredObj.userData.onLeave?.();
        hoveredObj = null;
      }
    }
  }

  function onPointerDown(e) {
    if (activeMode === 'fp') {
      drag.active = true;
      drag.lastX  = e.clientX;
      drag.lastY  = e.clientY;
    }
  }

  function onPointerUp(e) {
    if (activeMode === 'fp' && drag.active) {
      // If pointer barely moved it was a tap/click — do raycast
      const dx = Math.abs(e.clientX - drag.lastX);
      const dy = Math.abs(e.clientY - drag.lastY);
      drag.active = false;
      if (dx < 5 && dy < 5) {
        // Raycast from screen centre
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
        const hits = raycaster.intersectObjects(interactiveObjects);
        if (hits.length) handleObjectClick(hits[0].object);
      }
    }
  }

  // Touch support (iOS / Android)
  function onTouchStart(e) {
    if (activeMode === 'fp') {
      const t = e.touches[0];
      drag.active = true;
      drag.lastX  = t.clientX;
      drag.lastY  = t.clientY;
    }
  }

  function onTouchMove(e) {
    if (activeMode === 'fp' && drag.active) {
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - drag.lastX;
      const dy = t.clientY - drag.lastY;
      drag.lastX = t.clientX;
      drag.lastY = t.clientY;
      fpYaw.value   -= dx * 0.004;
      fpPitch.value -= dy * 0.004;
      fpPitch.value  = Math.max(-0.8, Math.min(0.6, fpPitch.value));
    }
  }

  function onTouchEnd() { drag.active = false; }

  function onPointerClick(e) {
    if (activeMode === 'fp') return; // handled in onPointerUp
    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactiveObjects);
    if (!hits.length) return;
    handleObjectClick(hits[0].object);
  }

  function handleObjectClick(obj) {
    if (obj.userData.type === 'clock') return; // clock is hover-only
    const ud = obj.userData;
    if (ud.type === 'whiteboard') {
      showPanel({ icon: '🖥', title: "The Tutor's Desk", text: 'Click a subject card on the whiteboard to open its subject portal.', subject: null });
      return;
    }
    if (ud.type === 'subject') {
      openSubjectPortal(ud.subject);
      return;
    }
    if (ud.type === 'desk-object') {
      const info = DESK_OBJECTS[ud.key];
      if (!info) return;
      showPanel({ icon: info.icon, title: info.title, text: info.text, subject: info.subject });
    }
  }

  // ── Info panel ─────────────────────────────────────────────────────────────
  function showPanel({ icon, title, text, subject }) {
    panelIcon.textContent  = icon;
    panelTitle.textContent = title;
    panelText.textContent  = text;
    quizEl.style.display   = 'none';

    if (subject && SUBJECTS[subject]) {
      panelAction.textContent = `Explore ${subject} →`;
      panelAction.onclick = () => openSubjectPortal(subject);
      panelAction.style.display = 'block';
      // Load quiz (Phase 3)
      loadQuiz(subject);
    } else {
      panelAction.style.display = 'none';
    }
    panel.classList.add('active');
  }

  panelClose?.addEventListener('click', () => panel.classList.remove('active'));

  // ── Subject portal ─────────────────────────────────────────────────────────
  function openSubjectPortal(subjectName) {
    const subj = SUBJECTS[subjectName];
    if (!subj) return;

    panel.classList.remove('active');

    // Animate camera toward whiteboard
    const targetPos   = new THREE.Vector3(0, 4, -3);
    const targetLookAt = new THREE.Vector3(0, 4, -7);

    gsap.to(camera.position, {
      x: targetPos.x, y: targetPos.y, z: targetPos.z,
      duration: 1.2, ease: 'power3.inOut',
      onUpdate: () => { if (activeMode === 'orbit') orbitControls.update(); },
      onComplete: () => {
        // Show portal overlay
        portalInner.innerHTML = subj.portal;
        portalEl.classList.add('active');
        // Wire CTA links — close classroom then scroll to #booking
        portalInner.querySelectorAll('.portal-cta').forEach(a => {
          a.addEventListener('click', e => {
            e.preventDefault();

            // Close portal + classroom immediately
            portalEl.classList.remove('active');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            drag.active = false;
            Object.keys(fpMove).forEach(k => fpMove[k] = false);
            showOrbitMode();

            // Scroll to booking section using the pre-measured absolute offset.
            // We use a short delay so the overlay opacity transition finishes
            // before the browser processes the scroll.
            setTimeout(() => {
              const navOffset = 80; // fixed navbar height
              window.scrollTo({ top: bookingSectionTop - navOffset, behavior: 'smooth' });
            }, 450);
          });
        });
      },
    });
    if (activeMode === 'orbit') {
      gsap.to(orbitControls.target, { x: targetLookAt.x, y: targetLookAt.y, z: targetLookAt.z, duration: 1.2 });
    }
  }

  portalBack?.addEventListener('click', () => {
    portalEl.classList.remove('active');
    // Fly back to starting position
    gsap.to(camera.position, { x: 8, y: 6, z: 11, duration: 1, ease: 'power2.inOut' });
    if (activeMode === 'orbit') {
      gsap.to(orbitControls.target, { x: 0, y: 2, z: 0, duration: 1 });
    }
  });

  // ── Phase 3: Quiz ──────────────────────────────────────────────────────────
  function loadQuiz(subjectName) {
    const questions = SUBJECTS[subjectName]?.quiz;
    if (!questions?.length) return;

    quizEl.style.display = 'block';
    quizTitle.textContent = `Quick Quiz — ${subjectName}`;

    // Pick one random question
    const qIdx = Math.floor(Math.random() * questions.length);
    const q    = questions[qIdx];

    quizBody.innerHTML = `
      <p class="cls-quiz-q">${q.q}</p>
      <div class="cls-quiz-opts">
        ${q.a.map((ans, i) => `
          <button class="cls-quiz-opt" data-index="${i}" data-correct="${i === q.correct}">${ans}</button>
        `).join('')}
      </div>
      <p class="cls-quiz-feedback" id="cls-quiz-fb"></p>
    `;

    quizBody.querySelectorAll('.cls-quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        const fb = document.getElementById('cls-quiz-fb');
        quizBody.querySelectorAll('.cls-quiz-opt').forEach(b => {
          b.disabled = true;
          if (b.dataset.correct === 'true') b.classList.add('correct');
          if (b === btn && !isCorrect)      b.classList.add('wrong');
        });
        fb.textContent = isCorrect ? '✓ Correct! Well done.' : `✗ The answer is: ${q.a[q.correct]}`;
        fb.style.color = isCorrect ? '#44cc88' : '#ff6666';
      });
    });
  }

  // ── FP mode ────────────────────────────────────────────────────────────────
  function showOrbitMode() {
    activeMode = 'orbit';
    if (camera) {
      camera.position.set(8, 6, 11);
      orbitControls.target.set(0, 2, 0);
      orbitControls.enabled = true;
    }
    drag.active = false;
    orbitBtn?.classList.add('active');
    fpBtn?.classList.remove('active');
    if (crosshair)     crosshair.style.display    = 'none';
    if (instructions)  instructions.style.display = '';
    if (canvas)        canvas.style.cursor        = 'default';
    document.getElementById('cls-dpad')?.style.setProperty('display', 'none');
  }

  function showFPMode() {
    if (!orbitControls) return;
    orbitControls.enabled = false;
    activeMode = 'fp';
    camera.position.set(4, FP_HEIGHT, 8);
    fpYaw.value   = Math.PI;
    fpPitch.value = -0.1;
    orbitBtn?.classList.remove('active');
    fpBtn?.classList.add('active');
    if (crosshair)     crosshair.style.display    = 'flex';
    if (instructions)  instructions.style.display = 'none';
    if (canvas)        canvas.style.cursor        = 'grab';
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      document.getElementById('cls-dpad')?.style.setProperty('display', 'grid');
    }
  }

  function onKeyDown(e) {
    if (!overlay.classList.contains('open') || activeMode !== 'fp') return;
    switch (e.code) {
      case 'KeyW': case 'ArrowUp':    fpMove.forward   = true; e.preventDefault(); break;
      case 'KeyS': case 'ArrowDown':  fpMove.backward  = true; e.preventDefault(); break;
      case 'KeyA': case 'ArrowLeft':  fpMove.left      = true; e.preventDefault(); break;
      case 'KeyD': case 'ArrowRight': fpMove.right     = true; e.preventDefault(); break;
    }
  }

  function onKeyUp(e) {
    if (activeMode !== 'fp') return;
    switch (e.code) {
      case 'KeyW': case 'ArrowUp':    fpMove.forward   = false; break;
      case 'KeyS': case 'ArrowDown':  fpMove.backward  = false; break;
      case 'KeyA': case 'ArrowLeft':  fpMove.left      = false; break;
      case 'KeyD': case 'ArrowRight': fpMove.right     = false; break;
    }
  }

  // ── Mobile D-pad (hidden until FP mode on touch device) ───────────────────
  function buildMobileDpad() {
    const dpad = document.createElement('div');
    dpad.id = 'cls-dpad';
    dpad.style.cssText = `
      display: none;
      position: absolute;
      bottom: 90px;
      left: 24px;
      width: 140px;
      height: 140px;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows:    repeat(3, 1fr);
      gap: 4px;
      z-index: 30;
    `;

    const btns = [
      { label: '↑', row: 1, col: 2, key: 'forward'  },
      { label: '←', row: 2, col: 1, key: 'left'     },
      { label: '·', row: 2, col: 2, key: null        },
      { label: '→', row: 2, col: 3, key: 'right'     },
      { label: '↓', row: 3, col: 2, key: 'backward'  },
    ];

    btns.forEach(({ label, row, col, key }) => {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.style.cssText = `
        grid-row: ${row}; grid-column: ${col};
        background: rgba(10,15,22,0.78);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 8px;
        color: rgba(255,255,255,0.85);
        font-size: 1.2rem;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; touch-action: none;
        -webkit-user-select: none; user-select: none;
      `;
      if (key) {
        btn.addEventListener('touchstart', e => { e.preventDefault(); fpMove[key] = true;  }, { passive: false });
        btn.addEventListener('touchend',   e => { e.preventDefault(); fpMove[key] = false; }, { passive: false });
        btn.addEventListener('mousedown',  () => fpMove[key] = true);
        btn.addEventListener('mouseup',    () => fpMove[key] = false);
        btn.addEventListener('mouseleave', () => fpMove[key] = false);
      }
      dpad.appendChild(btn);
    });

    overlay.appendChild(dpad);
  }

  // ── Help / shortcuts panel ─────────────────────────────────────────────────
  function buildHelpPanel() {
    // Help button
    const helpBtn = document.createElement('button');
    helpBtn.id = 'cls-help-btn';
    helpBtn.textContent = '?';
    helpBtn.style.cssText = `
      position: absolute; bottom: 24px; right: 24px;
      width: 36px; height: 36px;
      background: rgba(10,15,22,0.78);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      color: rgba(255,255,255,0.7);
      font-size: 1rem; font-weight: 700;
      cursor: pointer; z-index: 20;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, color 0.2s;
    `;
    helpBtn.onmouseenter = () => { helpBtn.style.background = 'rgba(196,160,92,0.25)'; helpBtn.style.color = '#e0c07a'; };
    helpBtn.onmouseleave = () => { helpBtn.style.background = 'rgba(10,15,22,0.78)';    helpBtn.style.color = 'rgba(255,255,255,0.7)'; };

    // Help panel
    const helpPanel = document.createElement('div');
    helpPanel.id = 'cls-help-panel';
    helpPanel.style.cssText = `
      position: absolute; bottom: 70px; right: 24px;
      width: 280px;
      background: rgba(10,15,22,0.92);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(196,160,92,0.3);
      border-radius: 14px;
      padding: 18px 20px;
      color: rgba(255,255,255,0.85);
      font-family: 'Inter', sans-serif;
      font-size: 0.78rem;
      z-index: 30;
      display: none;
      line-height: 1.7;
    `;
    helpPanel.innerHTML = `
      <p style="font-family:monospace;font-size:0.65rem;letter-spacing:0.2em;color:#c4a05c;margin:0 0 10px">CONTROLS</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:3px 0;opacity:0.6">Orbit / Look around</td>
            <td style="text-align:right">Mouse drag</td></tr>
        <tr><td style="padding:3px 0;opacity:0.6">Zoom</td>
            <td style="text-align:right">Scroll wheel</td></tr>
        <tr><td style="padding:3px 0;opacity:0.6">Click object</td>
            <td style="text-align:right">Left click / Tap</td></tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.08)">
            <td style="padding:6px 0 3px;opacity:0.6">Walk forward / back</td>
            <td style="text-align:right">W / S or ↑ ↓</td></tr>
        <tr><td style="padding:3px 0;opacity:0.6">Walk left / right</td>
            <td style="text-align:right">A / D or ← →</td></tr>
        <tr><td style="padding:3px 0;opacity:0.6">Look (Walk mode)</td>
            <td style="text-align:right">Drag mouse</td></tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.08)">
            <td style="padding:6px 0 3px;opacity:0.6">Mobile walk</td>
            <td style="text-align:right">On-screen D-pad</td></tr>
        <tr><td style="padding:3px 0;opacity:0.6">Mobile look</td>
            <td style="text-align:right">Touch &amp; drag</td></tr>
        <tr><td style="padding:3px 0;opacity:0.6">Close classroom</td>
            <td style="text-align:right">✕ button / Esc</td></tr>
      </table>
    `;

    helpBtn.addEventListener('click', () => {
      helpPanel.style.display = helpPanel.style.display === 'none' ? 'block' : 'none';
    });

    overlay.appendChild(helpBtn);
    overlay.appendChild(helpPanel);
  }

  // ── Animation loop ─────────────────────────────────────────────────────────
  function animate() {
    animFrameId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Globe rotation
    if (globe) globe.rotation.y = elapsed * 0.15;

    // Lamp shade micro-sway
    if (lampShade) lampShade.rotation.z = Math.sin(elapsed * 0.8) * 0.012;

    // Lamp flicker
    if (lampPt) lampPt.intensity = 20 + Math.sin(elapsed * 9) * 0.5;

    // Avatar gesturing arm
    const arm = scene.userData?.avatarRightArm;
    if (arm) arm.rotation.z = -0.55 + Math.sin(elapsed * 0.9) * 0.08;

    // Avatar slight head-nod
    const ag = scene.userData?.avatarGroup;
    if (ag) ag.rotation.y = 0.3 + Math.sin(elapsed * 0.4) * 0.12;

    // Subject card hover pulse (subtle scale)
    cardMeshes.forEach((c, i) => {
      const base = 1.0;
      const pulse = 1.0 + Math.sin(elapsed * 1.2 + i * 1.5) * 0.005;
      c.scale.setScalar(hoveredObj === c ? 1.04 : pulse);
    });

    // FP movement — custom controller, no PointerLock, works on all platforms
    if (activeMode === 'fp') {
      // Apply yaw + pitch to camera via Euler
      const euler = new THREE.Euler(fpPitch.value, fpYaw.value, 0, 'YXZ');
      camera.quaternion.setFromEuler(euler);

      // Movement relative to camera's yaw only (no vertical tilt on movement)
      const moveDir = new THREE.Vector3();
      if (fpMove.forward)  moveDir.z -= 1;
      if (fpMove.backward) moveDir.z += 1;
      if (fpMove.left)     moveDir.x -= 1;
      if (fpMove.right)    moveDir.x += 1;

      if (moveDir.lengthSq() > 0) {
        moveDir.normalize();
        // Rotate movement by yaw only
        const yawQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, fpYaw.value, 0, 'YXZ'));
        moveDir.applyQuaternion(yawQ);
        camera.position.addScaledVector(moveDir, FP_SPEED * delta);
        // Room boundary clamp
        camera.position.x = Math.max(-10, Math.min(10, camera.position.x));
        camera.position.z = Math.max(-5,  Math.min(10, camera.position.z));
      }
      camera.position.y = FP_HEIGHT; // fixed walk height
    }

    if (activeMode === 'orbit') orbitControls.update();
    renderer.render(scene, camera);
  }

  // Phase 3 — GLTF avatar swap hook (ready to wire in)
  // To upgrade: import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
  //             import { AnimationMixer } from 'three'
  //             loader.load('/models/tutor.glb', gltf => { ... })
  // The avatarGroup can be removed and replaced with gltf.scene at the same position.
}
