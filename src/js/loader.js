import * as THREE from 'three';
import { gsap } from 'gsap';

// ══════════════════════════════════════════════════════════════════════════════
//  SCENE METADATA  — equation, description, quote (tutoring-aligned)
// ══════════════════════════════════════════════════════════════════════════════
const SCENES = [
  {
    id: 'euler',
    name: "EULER'S IDENTITY SPIRAL",
    equation: "e^(iπ) + 1 = 0",
    description:
      "Euler's identity unites five fundamental constants, revealing geometry emerging beautifully from algebra and complex numbers.",
    realWorld:
      "Used in electrical engineering, quantum mechanics, and signal processing, powering technologies that process sound, images, and information.",
    joke:   "I told my student Euler's identity was the most beautiful equation. They said, 'But it has five things in it.' I said, 'So does a great lesson.'",
    puns:   [
      "e^(iπ) + 1 = 0 — the equation that really brings everything together.",
      "Some identities are just meant to be. This one is imaginary, irrational, and transcendent — and still makes perfect sense.",
      "Zero is the hero here. Quietly holding everything in balance.",
    ],
    quote:
      "The best explanations in mathematics, like the best lessons, reduce the complicated to the beautifully simple — and leave the student wondering how they never saw it before.",
  },
  {
    id: 'fibonacci',
    name: "GOLDEN RATIO FIBONACCI SPIRAL",
    equation: "φ = (1 + √5) / 2 ≈ 1.618…",
    description:
      "The Fibonacci sequence spirals toward the golden ratio, a proportion appearing throughout nature, art, and architecture.",
    realWorld:
      "Found in sunflowers, shells, leaves, Renaissance art, and architecture, revealing mathematics woven throughout natural and human designs.",
    joke:
      "My Fibonacci spiral and I have a lot in common. We both start small, get increasingly complicated, and somehow end up golden.",
    puns:   [
      "That spiral is really on a roll — it has a golden personality.",
      "Things are spiralling in a Fibonacci direction, and honestly? I'm here for it.",
      "It's the perfect example of a growing relationship. You could say the pattern has a natural attraction.",
    ],
    quote:
      "Growth rarely looks linear when you are living through it. Every student who walks in struggling and walks out capable has followed a Fibonacci arc — starting small, building on what came before, becoming something greater.",
  },
  {
    id: 'ode',
    name: "DIFFERENTIAL EQUATION PHASE PORTRAIT",
    equation: "dx/dt = f(x, y),   dy/dt = g(x, y)",
    description:
      "Phase portraits reveal every possible trajectory, exposing fixed points, cycles, and hidden patterns within dynamic systems.",
    realWorld:
      "Models populations, epidemics, pendulums, economies, and aircraft stability—whenever systems evolve, differential equations describe their behavior.",
    joke:
      "A student asked me what a stable equilibrium feels like. I said: 'You know that moment after a hard revision session when everything finally clicks? That's it. The arrows stop pulling you away, and you just… rest.'",
    puns:   [
      "The phase portrait: where every point knows exactly which direction to go. If only revision were that simple.",
      "Some students spiral toward the attractor. Others diverge. The art of teaching is adjusting the field.",
      "Fixed points in mathematics are rare. Fixed points in a student's confidence? Those you build deliberately.",
    ],
    quote:
      "Every student arrives as an initial condition. The teacher's job is not to control the trajectory — it is to design a field where the right attractor is irresistible.",
  },
  {
    id: 'taylor',
    name: "TAYLOR SERIES APPROXIMATION",
    equation: "f(x) = Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ",
    description:
      "Taylor series approximate smooth functions by layering polynomial corrections until the result converges toward the true curve.",
    realWorld:
      "Power calculators, GPS, physics simulations, and spacecraft navigation by approximating complex functions through polynomial expansions.",
    joke:
      "Teaching calculus is basically Taylor series in real life: you give the first approximation, realise it's not quite right, add a correction, then another, until eventually the student is indistinguishable from someone who always understood it.",
    puns:   [
      "The first term is always a rough approximation. So is the first lesson. The magic is in the refinement.",
      "n! grows fast. So does a student who has finally grasped the pattern.",
      "Convergence isn't guaranteed — but with the right radius of teaching, it usually is.",
    ],
    quote:
      "Understanding, like a Taylor series, rarely arrives all at once. It approaches the truth term by term — each session a new correction, each breakthrough a closer approximation of mastery.",
  },
  {
    id: 'geodesic',
    name: "GEODESIC ON A CURVED SURFACE",
    equation: "d²xᵏ/ds² + Γᵢⱼᵏ (dxⁱ/ds)(dxʲ/ds) = 0",
    description:
      "Geodesics are shortest paths through curved space, revealing how straight lines behave when geometry itself bends.",
    realWorld:
      "Guide aircraft routes and GPS corrections, while general relativity uses geodesics to describe motion through curved spacetime.",
    joke:
      "A student once asked me why the shortest path between two points looks curved on a globe. I said: 'Because the surface has opinions.' So do students. Good teaching works with the curvature, not against it.",
    puns:   [
      "The geodesic doesn't fight the curvature — it flows with it. The best learners do the same.",
      "Shortest path doesn't always mean straight line. Sometimes the elegant route curves.",
      "On every surface, the geodesic is unique. So is every student's path to understanding.",
    ],
    quote:
      "The most direct path between where a student is and where they need to be is rarely a straight line. A great tutor finds the geodesic — the path of least resistance through the particular curvature of that student's mind.",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  TYPING EFFECT
//  Human typing: base speed + slight random jitter per character,
//  with natural pauses after punctuation (. , — : ?)
// ══════════════════════════════════════════════════════════════════════════════
function typeText(el, text, baseSpeed = 68) {
  return new Promise(resolve => {
    el.textContent = '';
    el.classList.add('type-cursor');
    let i = 0;

    const tick = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        const char = text[i - 1] || '';

        // Natural pauses after punctuation
        let pause = baseSpeed + Math.random() * 40 - 15; // ±15 ms jitter
        if ('.!?'.includes(char))   pause += 420;
        if (',;:—–'.includes(char)) pause += 180;
        if (char === ' ')           pause += 10;

        i++;
        setTimeout(tick, Math.max(20, pause));
      } else {
        el.classList.remove('type-cursor');
        resolve();
      }
    };
    tick();
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  3D SCENE BUILDERS
// ══════════════════════════════════════════════════════════════════════════════

// ── 1. EULER'S IDENTITY SPIRAL ────────────────────────────────────────────────
function buildEulerScene(scene) {
  const group = new THREE.Group();

  // Helix: e^(iθ) traces a circle; pair with θ as z-axis → helix
  const points = [];
  const N = 600;
  const turns = 3.5;
  for (let i = 0; i <= N; i++) {
    const t     = (i / N) * turns * Math.PI * 2;
    const r     = 0.9;
    const x     = r * Math.cos(t);
    const y     = r * Math.sin(t);
    const z     = (i / N) * 2.8 - 1.4;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve   = new THREE.CatmullRomCurve3(points);
  const tubeGeo = new THREE.TubeGeometry(curve, 400, 0.03, 8, false);
  const tubeMat = new THREE.MeshBasicMaterial({ color: 0xc4a05c });
  group.add(new THREE.Mesh(tubeGeo, tubeMat));

  // Unit circle at z=0 (the projection of e^(iπ) = −1)
  const circlePoints = [];
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    circlePoints.push(new THREE.Vector3(0.9 * Math.cos(a), 0.9 * Math.sin(a), 0));
  }
  const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
  group.add(new THREE.Line(circleGeo, new THREE.LineBasicMaterial({ color: 0x4488ff, opacity: 0.5, transparent: true })));

  // Glowing point at e^(iπ) = (−1, 0, 0)
  const dotGeo = new THREE.SphereGeometry(0.07, 12, 12);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xff6666 });
  const dot    = new THREE.Mesh(dotGeo, dotMat);
  dot.position.set(-0.9, 0, 0);
  group.add(dot);

  // Axes (thin)
  const axMat = new THREE.LineBasicMaterial({ color: 0x333344, transparent: true, opacity: 0.4 });
  [
    [[-1.4,0,0],[1.4,0,0]],
    [[0,-1.4,0],[0,1.4,0]],
    [[0,0,-1.5],[0,0,1.5]],
  ].forEach(([a,b]) => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
    group.add(new THREE.Line(g, axMat));
  });

  // Animated travelling dot along helix
  const travDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xe0c07a })
  );
  group.add(travDot);
  group.userData.update = t => {
    const progress = (t * 0.18) % 1;
    const pt = curve.getPoint(progress);
    travDot.position.copy(pt);
    group.rotation.y = t * 0.25;
  };

  scene.add(group);
}

// ── 2. GOLDEN RATIO FIBONACCI SPIRAL ─────────────────────────────────────────
function buildFibonacciScene(scene) {
  const group = new THREE.Group();

  // 3D Fibonacci points using golden angle (137.5°)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const ptPositions = [];
  const N = 200;
  for (let i = 0; i < N; i++) {
    const r     = Math.sqrt(i / N) * 1.6;
    const theta = i * goldenAngle;
    const phi   = Math.acos(1 - (2 * i) / N);           // latitude
    const x     = r * Math.sin(phi) * Math.cos(theta);
    const y     = r * Math.sin(phi) * Math.sin(theta);
    const z     = r * Math.cos(phi);
    ptPositions.push(x, y, z);
  }

  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.Float32BufferAttribute(ptPositions, 3));
  const ptMat = new THREE.PointsMaterial({
    color: 0xc4a05c,
    size: 0.055,
    transparent: true,
    opacity: 0.85,
  });
  group.add(new THREE.Points(ptGeo, ptMat));

  // Spiral curve through Fibonacci arc in 3D
  const spiralPts = [];
  for (let i = 0; i < N; i++) {
    const r     = Math.sqrt(i / N) * 1.5;
    const theta = i * goldenAngle;
    const lift  = (i / N) * 2 - 1;
    spiralPts.push(new THREE.Vector3(
      r * Math.cos(theta),
      lift,
      r * Math.sin(theta)
    ));
  }
  const spiralGeo = new THREE.BufferGeometry().setFromPoints(spiralPts);
  group.add(new THREE.Line(spiralGeo, new THREE.LineBasicMaterial({ color: 0xe0c07a, opacity: 0.4, transparent: true })));

  // Glowing sphere at the centre
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffdd88 })
  );
  group.add(core);

  group.userData.update = t => {
    group.rotation.y = t * 0.2;
    group.rotation.x = Math.sin(t * 0.15) * 0.3;
    core.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
  };

  scene.add(group);
}

// ── 3. DIFFERENTIAL EQUATION PHASE PORTRAIT ──────────────────────────────────
function buildODEScene(scene) {
  const group = new THREE.Group();

  // Van der Pol–style 2D field extruded into 3D grid
  // f(x,y) = y,   g(x,y) = μ(1−x²)y − x   (μ = 0.8)
  const mu    = 0.8;
  const steps = 10;
  const range = 1.6;

  for (let i = 0; i <= steps; i++) {
    for (let j = 0; j <= steps; j++) {
      const x  = -range + (i / steps) * 2 * range;
      const y  = -range + (j / steps) * 2 * range;
      const dx = y;
      const dy = mu * (1 - x * x) * y - x;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 0.001) continue;
      const scale  = 0.18 / (len + 0.5);
      const normDx = dx * scale;
      const normDy = dy * scale;

      // Arrow line
      const start = new THREE.Vector3(x, y, 0);
      const end   = new THREE.Vector3(x + normDx, y + normDy, 0);
      const arrowGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const intensity = Math.min(len / 2, 1);
      const color = new THREE.Color().setHSL(0.12 + intensity * 0.55, 0.8, 0.55);
      group.add(new THREE.Line(arrowGeo, new THREE.LineBasicMaterial({ color })));

      // Arrowhead dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 4, 4),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.copy(end);
      group.add(dot);
    }
  }

  // Limit cycle ring (approximate)
  const cyclePoints = [];
  for (let i = 0; i <= 80; i++) {
    const a = (i / 80) * Math.PI * 2;
    cyclePoints.push(new THREE.Vector3(Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0));
  }
  const cycleGeo = new THREE.BufferGeometry().setFromPoints(cyclePoints);
  group.add(new THREE.Line(cycleGeo, new THREE.LineBasicMaterial({ color: 0xc4a05c, opacity: 0.7, transparent: true })));

  // Animated orbit particle
  const travDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  group.add(travDot);

  group.userData.update = t => {
    // Particle orbits the limit cycle with slight wobble
    const a = t * 0.9;
    travDot.position.set(Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0);
    group.rotation.y = Math.sin(t * 0.2) * 0.4;
    group.rotation.x = Math.sin(t * 0.15) * 0.25;
  };

  scene.add(group);
}

// ── 4. TAYLOR SERIES APPROXIMATION ───────────────────────────────────────────
function buildTaylorScene(scene) {
  const group = new THREE.Group();

  const xMin = -Math.PI * 1.2;
  const xMax =  Math.PI * 1.2;
  const nPts  = 120;
  const scCollins = 0.8 / Math.PI;
  const scaleY = 0.9;

  // True sin(x) — bright gold
  const truePts = [];
  for (let i = 0; i <= nPts; i++) {
    const x = xMin + (i / nPts) * (xMax - xMin);
    truePts.push(new THREE.Vector3(x * scCollins, Math.sin(x) * scaleY, 0));
  }
  const trueGeo = new THREE.BufferGeometry().setFromPoints(truePts);
  group.add(new THREE.Line(trueGeo, new THREE.LineBasicMaterial({ color: 0xc4a05c })));

  // Taylor approximations — layered at increasing z depth
  // sin(x) ≈ x  −  x³/6  +  x⁵/120  −  x⁷/5040  +  x⁹/362880
  const terms = [
    { coeffs: [[1,1]], color: 0x4488ff },
    { coeffs: [[1,1],[-1/6,3]], color: 0x44aaff },
    { coeffs: [[1,1],[-1/6,3],[1/120,5]], color: 0x66ccff },
    { coeffs: [[1,1],[-1/6,3],[1/120,5],[-1/5040,7]], color: 0x88ddff },
  ];

  const approxLines = [];
  terms.forEach(({ coeffs, color }, ti) => {
    const pts = [];
    for (let i = 0; i <= nPts; i++) {
      const x  = xMin + (i / nPts) * (xMax - xMin);
      let   yy = 0;
      coeffs.forEach(([c, p]) => { yy += c * Math.pow(x, p); });
      yy = Math.max(-2, Math.min(2, yy));           // clamp blowup
      pts.push(new THREE.Vector3(x * scCollins, yy * scaleY, -ti * 0.35));
    }
    const geo  = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color, opacity: 0, transparent: true }));
    group.add(line);
    approxLines.push(line);
  });

  // x-axis
  const axGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(xMin * scCollins, 0, 0),
    new THREE.Vector3(xMax * scCollins, 0, 0),
  ]);
  group.add(new THREE.Line(axGeo, new THREE.LineBasicMaterial({ color: 0x333344, opacity: 0.4, transparent: true })));

  // Animate: reveal approximations one by one
  group.userData.update = t => {
    group.rotation.y = Math.sin(t * 0.3) * 0.35;
    group.rotation.x = Math.sin(t * 0.2) * 0.1;

    // Each approx fades in at t = 1, 3, 5, 7 seconds
    approxLines.forEach((line, i) => {
      const target = t > (i + 1) * 2 ? 0.85 : 0;
      line.material.opacity += (target - line.material.opacity) * 0.04;
    });
  };

  scene.add(group);
}

// ── 5. GEODESIC ON A CURVED SURFACE ──────────────────────────────────────────
function buildGeodesicScene(scene) {
  const group = new THREE.Group();

  // Torus surface
  const torusGeo = new THREE.TorusGeometry(1.0, 0.38, 32, 80);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x1a2a4a,
    roughness: 0.5,
    metalness: 0.3,
    transparent: true,
    opacity: 0.6,
    wireframe: false,
  });
  group.add(new THREE.Mesh(torusGeo, torusMat));

  // Wireframe overlay
  const wireGeo = new THREE.TorusGeometry(1.0, 0.38, 16, 40);
  group.add(new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({
    color: 0x334466,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  })));

  // Geodesic approximation on torus:
  // A (2,3) torus knot path ≈ geodesic-like closed curve
  const R = 1.0, r = 0.38;
  const p = 2, q = 3;
  const geodPts = [];
  const N = 300;
  for (let i = 0; i <= N; i++) {
    const t     = (i / N) * Math.PI * 2;
    const phi   = q * t;
    const theta = p * t;
    const x = (R + r * Math.cos(phi)) * Math.cos(theta);
    const y = (R + r * Math.cos(phi)) * Math.sin(theta);
    const z = r * Math.sin(phi);
    geodPts.push(new THREE.Vector3(x, y, z));
  }
  const geodGeo  = new THREE.BufferGeometry().setFromPoints(geodPts);
  const geodLine = new THREE.Line(geodGeo, new THREE.LineBasicMaterial({ color: 0xc4a05c, linewidth: 2 }));
  group.add(geodLine);

  // Animated particle travelling the geodesic
  const travDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffdd88 })
  );
  group.add(travDot);
  const geodCurve = new THREE.CatmullRomCurve3(geodPts, true);

  // Lighting for torus
  const ptLight = new THREE.PointLight(0xc4a05c, 1.5, 8);
  ptLight.position.set(2, 2, 2);
  group.add(ptLight);

  group.userData.update = t => {
    group.rotation.y = t * 0.22;
    group.rotation.x = Math.sin(t * 0.18) * 0.3;
    const pt = geodCurve.getPoint((t * 0.12) % 1);
    travDot.position.copy(pt);
  };

  scene.add(group);
}

const SCENE_BUILDERS = [
  buildEulerScene,
  buildFibonacciScene,
  buildODEScene,
  buildTaylorScene,
  buildGeodesicScene,
];

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN INIT
// ══════════════════════════════════════════════════════════════════════════════
export function initLoader(onEnter) {
  const canvas    = document.getElementById('loader-canvas');
  const enterBtn  = document.getElementById('loader-enter');
  const loaderEl  = document.getElementById('loader');

  // Text elements
  const nameEl   = document.getElementById('loader-scene-name');
  const eqEl     = document.getElementById('loader-equation-text');
  const descEl   = document.getElementById('loader-description');
  const quoteEl  = document.getElementById('loader-quote');
  const dotEls   = document.querySelectorAll('.ldot');

  // ── Renderer setup ─────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(220, 220);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4.5;
  camera.add(new THREE.AmbientLight(0xffffff, 0.6));

  const ambLight = new THREE.AmbientLight(0xffeedd, 0.5);

  let currentScene = null;
  let currentIndex = -1;
  let animFrameId  = null;
  let clock        = new THREE.Clock();

  // ── Typewriter helpers ─────────────────────────────────────────────────────
  //
  //  showSceneText resolves only after ALL text has finished — the equation,
  //  description, joke, pun pause, pun, quote pause, and final quote.
  //  That resolved promise is what triggers the next scene, so each scene
  //  lasts exactly as long as its own content takes to read and display.
  //
  let typingAborted = false; // set true when Enter is clicked mid-type

  async function showSceneText(meta) {
    typingAborted = false;

    // ── Fade out previous text ───────────────────────────────────────────────
    [nameEl, eqEl, descEl, quoteEl].forEach(el => el.classList.add('loader-scene-fade'));
    await delay(450);
    if (typingAborted) return;

    // ── Reset ────────────────────────────────────────────────────────────────
    nameEl.textContent  = '';
    eqEl.textContent    = '';
    descEl.textContent  = '';
    quoteEl.textContent = '';
    quoteEl.classList.remove('visible');
    [nameEl, eqEl, descEl, quoteEl].forEach(el => el.classList.remove('loader-scene-fade'));

    // ── Scene label (instant) ────────────────────────────────────────────────
    nameEl.textContent = meta.name;
    await delay(300);
    if (typingAborted) return;

    // ── Equation — typed at human speed ─────────────────────────────────────
    await typeText(eqEl, meta.equation, 85);
    if (typingAborted) return;

    await delay(500);
    if (typingAborted) return;

    // ── Description + real-world application — one single typeText call ────────
    // Both sentences are combined into one string BEFORE typing starts,
    // so the element is cleared exactly once and never restarted mid-way.
    const fullDesc = meta.description + '  ' + meta.realWorld;
    await typeText(descEl, fullDesc, 52);
    if (typingAborted) return;

    await delay(700);
    if (typingAborted) return;

    // ── Joke fades in, then is typed ─────────────────────────────────────────
    quoteEl.classList.add('visible');
    await typeText(quoteEl, `"${meta.joke}"`, 60);
    if (typingAborted) return;

    // Pause so the reader can enjoy the joke
    await delay(3200);
    if (typingAborted) return;

    // ── Pun (random pick) — crossfade then type ──────────────────────────────
    const punIdx = Math.floor(Math.random() * meta.puns.length);
    await crossfadeQuote(quoteEl, meta.puns[punIdx], 55);
    if (typingAborted) return;

    // Pause on the pun
    await delay(3000);
    if (typingAborted) return;

    // ── Thoughtful tutor quote — crossfade then type at a slow, deliberate pace
    await crossfadeQuote(quoteEl, `"${meta.quote}"`, 52);
    if (typingAborted) return;

    // Hold on the final quote so it can be read fully
    await delay(3500);
  }

  // crossfadeQuote: fades out, swaps text, types it in
  async function crossfadeQuote(el, newText, speed = 55) {
    el.style.opacity = '0';
    await delay(380);
    if (typingAborted) return;
    el.textContent = '';
    el.style.opacity = '1';
    await typeText(el, newText, speed);
  }

  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // ── Scene switcher ─────────────────────────────────────────────────────────
  async function switchScene(index) {
    currentIndex = index;

    // Update progress dots
    dotEls.forEach((d, i) => d.classList.toggle('active', i === index));

    // Tear down previous Three.js scene
    if (currentScene) {
      // Dispose geometries and materials to free GPU memory
      currentScene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      while (currentScene.children.length) currentScene.remove(currentScene.children[0]);
    }

    // Build fresh scene
    const newScene = new THREE.Scene();
    newScene.add(ambLight.clone());
    SCENE_BUILDERS[index](newScene);
    currentScene = newScene;

    // Reset clock so scene-local animations start from t=0
    clock = new THREE.Clock();
  }

  // ── Content-driven rotation loop ──────────────────────────────────────────
  //
  //  Each scene runs for exactly as long as its text takes to display.
  //  No fixed timer. The async chain drives the pacing.
  //
  async function runRotation() {
    let idx = 0;
    while (true) {               // loop forever until Enter is clicked
      await switchScene(idx);
      await showSceneText(SCENES[idx]);
      if (typingAborted) break;  // Enter was clicked mid-sequence
      idx = (idx + 1) % SCENES.length;
    }
  }

  // ── 3D render loop (independent of text timing) ──────────────────────────
  const animate = () => {
    animFrameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (currentScene) {
      currentScene.traverse(obj => {
        if (obj.userData?.update) obj.userData.update(t);
      });
      renderer.render(currentScene, camera);
    }
  };

  // ── Boot ──────────────────────────────────────────────────────────────────
  animate();
  runRotation(); // starts async chain — no setInterval

  // ── Enter button ───────────────────────────────────────────────────────────
  enterBtn?.addEventListener('click', () => {
    typingAborted = true; // signals showSceneText to stop mid-type
    cancelAnimationFrame(animFrameId);
    renderer.dispose();

    gsap.to(loaderEl, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        loaderEl.style.display = 'none';
        if (onEnter) onEnter();
      },
    });
  });
}
