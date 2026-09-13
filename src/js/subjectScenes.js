import * as THREE from 'three';

// ── Shared renderer-per-canvas pattern ────────────────────────────────────────
function makeRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const w = canvas.clientWidth || 200;
  const h = canvas.clientHeight || 180;
  renderer.setSize(w, h, false);
  return renderer;
}

function makeCamera(aspect = 1) {
  const cam = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
  cam.position.z = 3.5;
  return cam;
}

// ── MATHEMATICS: rotating geometric sculpture ─────────────────────────────────
function mathScene(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = makeCamera();

  scene.add(new THREE.AmbientLight(0xffeedd, 0.5));
  const dl = new THREE.DirectionalLight(0xc4a05c, 1.5);
  dl.position.set(3, 4, 3);
  scene.add(dl);

  const group = new THREE.Group();

  // Outer dodecahedron wireframe
  const geo1 = new THREE.DodecahedronGeometry(1.1, 0);
  const mat1 = new THREE.MeshBasicMaterial({ color: 0xc4a05c, wireframe: true, opacity: 0.5, transparent: true });
  group.add(new THREE.Mesh(geo1, mat1));

  // Inner icosahedron solid
  const geo2 = new THREE.IcosahedronGeometry(0.6, 0);
  const mat2 = new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.3, metalness: 0.7 });
  group.add(new THREE.Mesh(geo2, mat2));

  // Edge glow points
  const positions = geo1.attributes.position;
  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', positions);
  const ptMat = new THREE.PointsMaterial({ color: 0xe0c07a, size: 0.06 });
  group.add(new THREE.Points(ptGeo, ptMat));

  scene.add(group);

  const animate = () => {
    requestAnimationFrame(animate);
    group.rotation.x += 0.004;
    group.rotation.y += 0.007;
    renderer.render(scene, camera);
  };
  animate();
}

// ── PHYSICS: orbital / planetary system ───────────────────────────────────────
function physicsScene(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = makeCamera();

  scene.add(new THREE.AmbientLight(0xffeedd, 0.3));
  const pl = new THREE.PointLight(0xfff5e0, 2, 10);
  pl.position.set(0, 0, 0);
  scene.add(pl);

  // Nucleus
  const nucleus = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xc4a05c, roughness: 0.3, metalness: 0.6, emissive: 0xc4a05c, emissiveIntensity: 0.3 })
  );
  scene.add(nucleus);

  // Orbital rings + electrons
  const orbits = [
    { radius: 0.85, speed: 1.4, tilt: 0,          color: 0xaaccff },
    { radius: 1.25, speed: 0.8, tilt: Math.PI/3,  color: 0x88bbff },
    { radius: 1.6,  speed: 0.5, tilt: Math.PI*0.7,color: 0x6699ff },
  ];

  const orbitMeshes = [];
  orbits.forEach(({ radius, tilt, color }) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
    );
    ring.rotation.x = tilt;
    scene.add(ring);

    const electron = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6, roughness: 0.2 })
    );
    scene.add(electron);
    orbitMeshes.push({ electron, radius, speed: orbits[orbitMeshes.length]?.speed || 1, tilt, angle: Math.random() * Math.PI * 2 });
  });

  // Fix speed reference
  orbitMeshes.forEach((om, i) => { om.speed = orbits[i].speed; });

  let t = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    t += 0.016;
    orbitMeshes.forEach(om => {
      om.angle += om.speed * 0.02;
      om.electron.position.x = Math.cos(om.angle) * om.radius;
      om.electron.position.y = Math.sin(om.angle) * om.radius * Math.cos(om.tilt);
      om.electron.position.z = Math.sin(om.angle) * om.radius * Math.sin(om.tilt);
    });
    nucleus.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    renderer.render(scene, camera);
  };
  animate();
}

// ── CHEMISTRY: molecular structure ────────────────────────────────────────────
function chemScene(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = makeCamera();
  camera.position.z = 4.5;

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dl = new THREE.DirectionalLight(0xaaddff, 1.5);
  dl.position.set(3, 3, 3);
  scene.add(dl);

  const group = new THREE.Group();

  // Atom positions for a stylised molecule
  const atoms = [
    { pos: [0,    0,    0   ], color: 0xff4444, r: 0.22 }, // O
    { pos: [0.8,  0.4,  0.2 ], color: 0xffffff, r: 0.15 }, // H
    { pos: [-0.8, 0.4,  0.2 ], color: 0xffffff, r: 0.15 }, // H
    { pos: [0,   -0.9,  0   ], color: 0x4488ff, r: 0.2  }, // N
    { pos: [0.7, -1.4,  0.1 ], color: 0xffffff, r: 0.13 }, // H
    { pos: [-0.7,-1.4,  0.1 ], color: 0xffffff, r: 0.13 }, // H
    { pos: [0,   -1.95, 0   ], color: 0xffffff, r: 0.13 }, // H
  ];

  const bonds = [
    [0,1], [0,2], [0,3], [3,4], [3,5], [3,6]
  ];

  const atomMeshes = [];
  atoms.forEach(({ pos, color, r }) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 16, 16),
      new THREE.MeshStandardMaterial({
        color, roughness: 0.1, metalness: 0.1,
        transparent: true, opacity: 0.88,
      })
    );
    mesh.position.set(...pos);
    group.add(mesh);
    atomMeshes.push(mesh);
  });

  // Bonds as cylinders
  bonds.forEach(([a, b]) => {
    const pa = new THREE.Vector3(...atoms[a].pos);
    const pb = new THREE.Vector3(...atoms[b].pos);
    const dir = pb.clone().sub(pa);
    const len = dir.length();
    const mid = pa.clone().add(dir.clone().multiplyScalar(0.5));

    const bond = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, len, 8),
      new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.4, metalness: 0.3 })
    );
    bond.position.copy(mid);
    bond.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.normalize()
    );
    group.add(bond);
  });

  scene.add(group);

  const animate = () => {
    requestAnimationFrame(animate);
    group.rotation.y += 0.007;
    group.rotation.x += 0.002;
    renderer.render(scene, camera);
  };
  animate();
}

// ── COMPUTER SCIENCE: 3D binary tree with glowing nodes and edges ────────────
function csScene(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = makeCamera();
  camera.position.z = 4.2;

  scene.add(new THREE.AmbientLight(0x0a1a2a, 0.8));
  const pl = new THREE.PointLight(0x44ff88, 2.5, 10);
  pl.position.set(0, 2, 3);
  scene.add(pl);
  const pl2 = new THREE.PointLight(0x4488ff, 1.2, 8);
  pl2.position.set(-2, -1, 2);
  scene.add(pl2);

  const group = new THREE.Group();

  // ── Binary tree node positions (7 nodes, 3 levels) ────────────────────────
  // Level 0: root at top
  // Level 1: two children
  // Level 2: four grandchildren
  const nodes = [
    { id: 0, x:  0.00, y:  1.10, z: 0.00 }, // root
    { id: 1, x: -0.80, y:  0.25, z: 0.10 }, // left child
    { id: 2, x:  0.80, y:  0.25, z: 0.10 }, // right child
    { id: 3, x: -1.20, y: -0.65, z: 0.20 }, // left-left
    { id: 4, x: -0.35, y: -0.65, z: 0.20 }, // left-right
    { id: 5, x:  0.35, y: -0.65, z: 0.20 }, // right-left
    { id: 6, x:  1.20, y: -0.65, z: 0.20 }, // right-right
  ];

  // Edge connections
  const edges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6],
  ];

  // Node colors — root gold, level 1 blue, level 2 green
  const nodeColors = [
    0xc4a05c,                           // root
    0x4488ff, 0x4488ff,                 // level 1
    0x44ff88, 0x44ff88, 0x44ff88, 0x44ff88, // level 2
  ];

  // Draw edges first (behind nodes)
  edges.forEach(([a, b]) => {
    const pa = new THREE.Vector3(nodes[a].x, nodes[a].y, nodes[a].z);
    const pb = new THREE.Vector3(nodes[b].x, nodes[b].y, nodes[b].z);
    const edgeGeo = new THREE.BufferGeometry().setFromPoints([pa, pb]);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x334455,
      transparent: true,
      opacity: 0.7,
    });
    group.add(new THREE.Line(edgeGeo, edgeMat));
  });

  // Draw nodes as glowing spheres
  const nodeMeshes = nodes.map((n, i) => {
    const r = i === 0 ? 0.14 : i <= 2 ? 0.11 : 0.09;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 16, 16),
      new THREE.MeshStandardMaterial({
        color:             nodeColors[i],
        emissive:          nodeColors[i],
        emissiveIntensity: 0.5,
        roughness:         0.2,
        metalness:         0.4,
      })
    );
    mesh.position.set(n.x, n.y, n.z);
    group.add(mesh);
    return mesh;
  });

  // ── Floating binary digits orbiting the tree ──────────────────────────────
  const digitPositions = [];
  for (let i = 0; i < 12; i++) {
    const angle  = (i / 12) * Math.PI * 2;
    const radius = 1.55 + Math.random() * 0.3;
    const yOff   = (Math.random() - 0.5) * 1.8;
    const digit = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.14, 0.02),
      new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x44ff88 : 0x4488ff,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.3,
      })
    );
    digit.position.set(
      Math.cos(angle) * radius,
      yOff,
      Math.sin(angle) * radius * 0.4
    );
    group.add(digit);
    digitPositions.push({ mesh: digit, angle, radius, yOff, speed: 0.3 + Math.random() * 0.4 });
  }

  // ── Small glowing brackets { } around root ────────────────────────────────
  [[-0.28, 0], [0.28, 0]].forEach(([xOff, _], idx) => {
    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.3, 0.02),
      new THREE.MeshBasicMaterial({ color: 0xffcc44, transparent: true, opacity: 0.6 })
    );
    bracket.position.set(xOff, 1.1, 0.05);
    bracket.rotation.z = idx === 0 ? 0.2 : -0.2;
    group.add(bracket);
  });

  scene.add(group);

  let t = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    t += 0.016;

    // Slow continuous rotation
    group.rotation.y = t * 0.35;
    group.rotation.x = Math.sin(t * 0.2) * 0.15;

    // Pulse node emissive intensities
    nodeMeshes.forEach((mesh, i) => {
      mesh.material.emissiveIntensity = 0.4 + Math.sin(t * 1.5 + i * 0.9) * 0.25;
    });

    // Orbit floating digits
    digitPositions.forEach(d => {
      d.angle += d.speed * 0.012;
      d.mesh.position.x = Math.cos(d.angle) * d.radius;
      d.mesh.position.z = Math.sin(d.angle) * d.radius * 0.4;
      d.mesh.rotation.y = d.angle;
    });

    renderer.render(scene, camera);
  };
  animate();
}

// ── ECONOMICS: 3D supply/demand surfaces with animated equilibrium ────────────
function economicsScene(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = makeCamera();
  camera.position.set(1.8, 1.4, 3.8);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffeedd, 0.4));
  const dl = new THREE.DirectionalLight(0xfff5e0, 1.2);
  dl.position.set(3, 4, 3);
  scene.add(dl);
  const pl = new THREE.PointLight(0x4488ff, 0.8, 8);
  pl.position.set(-2, 1, 1);
  scene.add(pl);

  const group = new THREE.Group();

  // ── 3D Axes ───────────────────────────────────────────────────────────────
  const axMat = new THREE.MeshStandardMaterial({ color: 0x888899, roughness: 0.6 });
  const axisData = [
    { pos: [0.6, -1.0, -1.0], rot: [0, 0, 0],          scale: [0.025, 1.4, 0.025] }, // Q (x)
    { pos: [-1.1, 0.0, -1.0], rot: [0, 0, Math.PI / 2], scale: [0.025, 1.4, 0.025] }, // P (y)
    { pos: [-1.1, -1.0,  0.0], rot: [Math.PI / 2, 0, 0], scale: [0.025, 1.4, 0.025] }, // depth (z)
  ];
  axisData.forEach(({ pos, rot, scale }) => {
    const ax = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 6), axMat);
    ax.position.set(...pos);
    ax.rotation.set(...rot);
    ax.scale.set(...scale);
    group.add(ax);
  });

  // ── Demand surface — extruded plane, blue, downward slope ─────────────────
  // Demand: P = 1.0 − 0.9*Q  (Q ∈ [0, 2], depth Z ∈ [0, 2])
  const demandShape = new THREE.Shape();
  demandShape.moveTo(-1.0, -1.0);          // Q=0, P=low (base)
  demandShape.lineTo(-1.0,  0.9);          // Q=0, P=high
  demandShape.lineTo( 1.0, -0.9);          // Q=high, P=low
  demandShape.lineTo( 1.0, -1.0);          // close base
  demandShape.closePath();

  const extrudeSettings = { depth: 0.18, bevelEnabled: false };
  const demandGeo = new THREE.ExtrudeGeometry(demandShape, extrudeSettings);
  const demandMat = new THREE.MeshStandardMaterial({
    color: 0x2255cc,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    roughness: 0.4,
  });
  const demandMesh = new THREE.Mesh(demandGeo, demandMat);
  demandMesh.position.z = -0.9;
  group.add(demandMesh);

  // ── Supply surface — extruded plane, gold, upward slope ───────────────────
  const supplyShape = new THREE.Shape();
  supplyShape.moveTo(-1.0, -1.0);
  supplyShape.lineTo(-1.0, -0.9);
  supplyShape.lineTo( 1.0,  0.9);
  supplyShape.lineTo( 1.0, -1.0);
  supplyShape.closePath();

  const supplyGeo  = new THREE.ExtrudeGeometry(supplyShape, extrudeSettings);
  const supplyMat  = new THREE.MeshStandardMaterial({
    color: 0xc4a05c,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    roughness: 0.4,
  });
  const supplyMesh = new THREE.Mesh(supplyGeo, supplyMat);
  supplyMesh.position.z = -0.9;
  group.add(supplyMesh);

  // ── Equilibrium line (vertical — where supply meets demand at Q*) ─────────
  const eqLinePts = [
    new THREE.Vector3(0, -1.0, -0.9),
    new THREE.Vector3(0,  0.0, -0.9),
  ];
  group.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(eqLinePts),
    new THREE.LineBasicMaterial({ color: 0xff6666, linewidth: 2 })
  ));

  // ── Equilibrium point — pulsing red sphere ────────────────────────────────
  const eqDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xff5555,
      emissive: 0xff3333,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    })
  );
  eqDot.position.set(0, 0, -0.9);
  group.add(eqDot);

  // ── GDP growth curve — floating arc above ────────────────────────────────
  const gdpPts = [];
  for (let i = 0; i <= 40; i++) {
    const q = -1.0 + (i / 40) * 2.0;
    const p =  0.7 + Math.pow(q + 1.0, 0.55) * 0.25;
    gdpPts.push(new THREE.Vector3(q, p, -0.5));
  }
  const gdpTube = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(gdpPts), 40, 0.025, 6, false
  );
  group.add(new THREE.Mesh(gdpTube,
    new THREE.MeshStandardMaterial({ color: 0x44cc88, roughness: 0.3, emissive: 0x44cc88, emissiveIntensity: 0.2 })
  ));

  // ── Small floating coins (currency) ───────────────────────────────────────
  for (let i = 0; i < 5; i++) {
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.025, 16),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.1, metalness: 0.9 })
    );
    coin.position.set(
      -0.8 + i * 0.4,
      -0.7 + Math.sin(i * 1.3) * 0.15,
      -0.4 + Math.cos(i * 0.9) * 0.3
    );
    coin.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
    group.add(coin);
  }

  scene.add(group);

  let t = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    t += 0.016;
    group.rotation.y = t * 0.3;
    group.rotation.x = Math.sin(t * 0.2) * 0.12;
    // Pulse equilibrium
    const s = 1 + Math.sin(t * 2.5) * 0.18;
    eqDot.scale.setScalar(s);
    eqDot.material.emissiveIntensity = 0.4 + Math.sin(t * 2.5) * 0.3;
    renderer.render(scene, camera);
  };
  animate();
}

// ── Main init ─────────────────────────────────────────────────────────────────
export function initSubjectScenes() {
  const map = {
    'canvas-math':    mathScene,
    'canvas-physics': physicsScene,
    'canvas-chem':    chemScene,
    'canvas-cs':      csScene,
    'canvas-econ':    economicsScene,
  };

  Object.entries(map).forEach(([id, fn]) => {
    const canvas = document.getElementById(id);
    if (canvas) fn(canvas);
  });

  // ── Subject card click → open panel ────────────────────────────────────
  const cards = document.querySelectorAll('.subject-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('open');
    });

    const closeBtn = card.querySelector('.subject-panel-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        card.classList.remove('open');
      });
    }
  });
}
