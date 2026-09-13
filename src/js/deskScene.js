import * as THREE from 'three';
import { gsap } from 'gsap';

const DESK_ITEMS = {
  book: {
    label: 'My Teaching Philosophy',
    content: `
      <h3>📖 Teaching Philosophy</h3>
      <p>I believe that genuine understanding is built from first principles. Before a student can apply a formula, they must understand what it represents and why it works.</p>
      <p style="margin-top:1rem">My sessions begin with <em>why</em>, move through <em>how</em>, and end with <em>what</em> — reversing the order most schools use. This produces students who can reason independently, not just recall.</p>
    `,
  },
  laptop: {
    label: 'Online Learning',
    content: `
      <h3>💻 Online Learning Experience</h3>
      <p>Every online session uses an interactive shared whiteboard. Students can write, annotate, and solve problems in real time — the experience mirrors an in-person session precisely.</p>
      <p style="margin-top:1rem">Sessions are recorded on request, and all notes are shared as PDFs after each lesson.</p>
    `,
  },
  calculator: {
    label: 'Mathematics Expertise',
    content: `
      <h3>🧮 Mathematics Expertise</h3>
      <p>From GCSE algebra to university-level calculus, my mathematics teaching is built on conceptual depth first, mechanical fluency second.</p>
      <p style="margin-top:1rem">Specialisms: A-Level Pure & Statistics, IB Mathematics HL, Further Mathematics, SAT/ACT preparation.</p>
    `,
  },
  award: {
    label: 'Qualifications',
    content: `
      <h3>🏆 Qualifications & Certifications</h3>
      <ul style="list-style:disc;padding-left:1.2rem;display:flex;flex-direction:column;gap:0.5rem;margin-top:0.5rem">
        <li style="color:var(--text-secondary);font-size:0.9rem">BSc Mathematics — University of Edinburgh (First Class)</li>
        <li style="color:var(--text-secondary);font-size:0.9rem">MSc Applied Mathematics — Imperial College London</li>
        <li style="color:var(--text-secondary);font-size:0.9rem">Qualified Teacher Status (QTS)</li>
        <li style="color:var(--text-secondary);font-size:0.9rem">Cambridge CELTA Certified</li>
        <li style="color:var(--text-secondary);font-size:0.9rem">DBS Enhanced Certificate (current)</li>
      </ul>
    `,
  },
  notes: {
    label: 'Lesson Planning',
    content: `
      <h3>📋 Lesson Planning</h3>
      <p>Every session is planned in advance. Before the first lesson, I review the student's syllabus, past papers, and any marked work available.</p>
      <p style="margin-top:1rem">Each student receives a personalised learning roadmap — a living document updated after every session to reflect progress and priorities.</p>
    `,
  },
};

export function initDeskScene() {
  const canvas = document.getElementById('desk-canvas');
  if (!canvas) return;

  const container = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 2.8, 6.5);
  camera.lookAt(0, 0, 0);

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // ── Background image — Tutor's Desk photograph ────────────────────────────
  // Loaded as a texture on a large plane behind all 3D objects.
  // The 3D items (book, laptop, etc.) sit in front of it with matching
  // perspective, so they appear to rest on the real desk surface.
  const texLoader = new THREE.TextureLoader();
  texLoader.load('/tutors-desk.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;

    // Size the plane to fill the camera view at z = -3
    const dist = camera.position.z - (-3);
    const vFov = (camera.fov * Math.PI) / 180;
    const planeH = 2 * Math.tan(vFov / 2) * dist;
    const planeW = planeH * (container.clientWidth / container.clientHeight);

    const bgPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(planeW, planeH),
      new THREE.MeshBasicMaterial({ map: tex })
    );
    bgPlane.position.z = -3;
    // Slight darken overlay so 3D objects read against the photo
    const overlay = new THREE.Mesh(
      new THREE.PlaneGeometry(planeW, planeH),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.45,
      })
    );
    overlay.position.z = -2.98;
    scene.add(bgPlane);
    scene.add(overlay);
  });

  // ── Lighting ─────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0xffeedd, 0.6));

  const keyLight = new THREE.SpotLight(0xffe8b0, 4, 18, Math.PI / 5, 0.4, 1.5);
  keyLight.position.set(-2.2, 4.5, 2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);
  scene.add(keyLight.target);

  const rimDl = new THREE.DirectionalLight(0x3355aa, 0.5);
  rimDl.position.set(4, 2, -3);
  scene.add(rimDl);

  const fillPt = new THREE.PointLight(0xffe8b0, 1.2, 10);
  fillPt.position.set(2, 2, 3);
  scene.add(fillPt);

  // ── Desk surface (semi-transparent — photo shows through) ─────────────────
  const deskMat = new THREE.MeshStandardMaterial({
    color: 0x2f1f0f,
    roughness: 0.5,
    metalness: 0.05,
    transparent: true,
    opacity: 0.0,   // fully transparent — background photo provides the desk
  });
  const desk = new THREE.Mesh(new THREE.BoxGeometry(7, 0.15, 3.5), deskMat);
  desk.position.y = -0.5;
  desk.receiveShadow = true;
  scene.add(desk);

  // ── Clickable objects ─────────────────────────────────────────────────────
  const clickables = {};

  // Book — open, navy cover
  const bookGrp = new THREE.Group();
  bookGrp.position.set(-1.8, -0.38, 0.4);
  bookGrp.userData.id = 'book';
  const bkPageMat  = new THREE.MeshStandardMaterial({ color: 0xf0ece0, roughness: 0.9 });
  const bkSpineMat = new THREE.MeshStandardMaterial({ color: 0x6b3310, roughness: 0.5 });
  const bkCoverMat = new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.5 });
  const bkL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.03, 1.0), bkPageMat);
  bkL.position.x = -0.42; bkL.rotation.z = -0.04; bkL.castShadow = true;
  const bkR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.03, 1.0), bkPageMat);
  bkR.position.x = 0.42; bkR.rotation.z = 0.04; bkR.castShadow = true;
  const bkSp  = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 1.0), bkSpineMat);
  const bkCvL = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.025, 1.02), bkCoverMat);
  bkCvL.position.set(-0.42, -0.015, 0);
  const bkCvR = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.025, 1.02), bkCoverMat);
  bkCvR.position.set(0.42, -0.015, 0);
  [bkL, bkR, bkSp, bkCvL, bkCvR].forEach(m => bookGrp.add(m));
  scene.add(bookGrp);
  clickables.book = bookGrp;

  // Laptop — metallic, screen glowing
  const laptopGrp = new THREE.Group();
  laptopGrp.position.set(1.5, -0.36, 0);
  laptopGrp.rotation.y = -0.2;
  laptopGrp.userData.id = 'laptop';
  const ltMat    = new THREE.MeshStandardMaterial({ color: 0x2a2d35, roughness: 0.25, metalness: 0.75 });
  const ltBase   = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.04, 1.0), ltMat);
  ltBase.castShadow = true;
  const ltScreen = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.96, 0.04), ltMat);
  ltScreen.position.set(0, 0.5, -0.48);
  ltScreen.rotation.x = -0.2;
  ltScreen.castShadow = true;
  const ltDisplay = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 0.84, 0.01),
    new THREE.MeshBasicMaterial({ color: 0x0d1117 })
  );
  ltDisplay.position.set(0, 0.5, -0.46);
  ltDisplay.rotation.x = -0.2;
  const screenColors = [0x44ff88, 0x88bbff, 0xffcc44];
  const screenWidths = [0.6, 0.8, 0.4];
  screenColors.forEach((c, i) => {
    const gl = new THREE.Mesh(
      new THREE.BoxGeometry(screenWidths[i], 0.022, 0.01),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.8 })
    );
    gl.position.set(-0.1, 0.5 + 0.24 - i * 0.24, -0.45);
    gl.rotation.x = -0.2;
    laptopGrp.add(gl);
  });
  [ltBase, ltScreen, ltDisplay].forEach(m => laptopGrp.add(m));
  scene.add(laptopGrp);
  clickables.laptop = laptopGrp;

  // Calculator
  const calcGrp = new THREE.Group();
  calcGrp.position.set(-0.3, -0.42, -0.6);
  calcGrp.rotation.y = 0.2;
  calcGrp.userData.id = 'calculator';
  const calcBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.04, 0.75),
    new THREE.MeshStandardMaterial({ color: 0x1a1f2e, roughness: 0.5, metalness: 0.3 })
  );
  calcBody.castShadow = true;
  calcGrp.add(calcBody);
  const calcScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.01, 0.18),
    new THREE.MeshBasicMaterial({ color: 0x88ffcc, transparent: true, opacity: 0.7 })
  );
  calcScreen.position.set(0, 0.025, 0.24);
  calcGrp.add(calcScreen);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const btn = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.022, 0.07),
        new THREE.MeshStandardMaterial({ color: 0x2a3040, roughness: 0.6 })
      );
      btn.position.set(-0.15 + c * 0.1, 0.031, 0 - r * 0.1);
      calcGrp.add(btn);
    }
  }
  scene.add(calcGrp);
  clickables.calculator = calcGrp;

  // Award — gold trophy
  const awardGrp = new THREE.Group();
  awardGrp.position.set(2.8, -0.4, -0.5);
  awardGrp.userData.id = 'award';
  const cupMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.08, metalness: 0.95 });
  const aBase  = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.07, 0.35), cupMat);
  const aStem  = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.35, 12), cupMat);
  aStem.position.y = 0.21;
  const aCup = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.1, 0.45, 16, 1, true), cupMat);
  aCup.position.y = 0.55;
  const aLid = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 8, 0, Math.PI*2, 0, Math.PI/2), cupMat);
  aLid.position.y = 0.55;
  [aBase, aStem, aCup, aLid].forEach(m => { m.castShadow = true; awardGrp.add(m); });
  scene.add(awardGrp);
  clickables.award = awardGrp;

  // Notes — paper stack with pen
  const notesGrp = new THREE.Group();
  notesGrp.position.set(0.4, -0.44, -0.8);
  notesGrp.rotation.y = 0.15;
  notesGrp.userData.id = 'notes';
  for (let i = 0; i < 5; i++) {
    const pg = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.006, 0.9),
      new THREE.MeshStandardMaterial({ color: 0xfaf6ec, roughness: 0.95 })
    );
    pg.position.y = i * 0.006;
    pg.rotation.y = (Math.random() - 0.5) * 0.08;
    pg.castShadow = true;
    notesGrp.add(pg);
  }
  const notePen = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.7, 8),
    new THREE.MeshStandardMaterial({ color: 0xc4a05c, roughness: 0.25, metalness: 0.65 })
  );
  notePen.rotation.z = Math.PI / 2;
  notePen.position.set(0, 0.04, 0.1);
  notesGrp.add(notePen);
  scene.add(notesGrp);
  clickables.notes = notesGrp;

  // Lamp
  const lampGrp = new THREE.Group();
  lampGrp.position.set(-2.8, -0.44, 0);
  const lBase  = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.06, 16),
    new THREE.MeshStandardMaterial({ color: 0x1e1208, roughness: 0.4, metalness: 0.5 }));
  const lStem  = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.8, 8),
    new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.12, metalness: 0.88 }));
  lStem.position.y = 0.93;
  const lArm   = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8),
    new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.12, metalness: 0.88 }));
  lArm.position.set(0.3, 1.7, 0); lArm.rotation.z = Math.PI / 3.5;
  const lShade = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.4, 16, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xe8d5a3, roughness: 0.6, side: THREE.DoubleSide }));
  lShade.position.set(0.55, 1.95, 0);
  [lBase, lStem, lArm, lShade].forEach(m => lampGrp.add(m));
  scene.add(lampGrp);

  // Coffee mug
  const mugGrp = new THREE.Group();
  mugGrp.position.set(2.2, -0.38, 0.8);
  const mugMat    = new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.6 });
  const mugBody   = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.28, 16, 1, true), mugMat);
  mugBody.castShadow = true;
  const mugBottom = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), mugMat);
  mugBottom.rotation.x = -Math.PI/2; mugBottom.position.y = -0.14;
  const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 16, Math.PI), mugMat);
  mugHandle.position.set(0.16, 0, 0); mugHandle.rotation.y = Math.PI/2;
  [mugBody, mugBottom, mugHandle].forEach(m => mugGrp.add(m));
  scene.add(mugGrp);

  // ── Label positions ───────────────────────────────────────────────────────
  const labelPositions = {
    book:       { x: -1.8, y: 0.2,  z: 0.4  },
    laptop:     { x:  1.5, y: 0.7,  z: 0    },
    calculator: { x: -0.3, y: 0.1,  z: -0.6 },
    award:      { x:  2.8, y: 0.35, z: -0.5 },
    notes:      { x:  0.4, y: 0.1,  z: -0.8 },
  };

  const labelsContainer = document.getElementById('desk-labels');
  const labelEls = labelsContainer?.querySelectorAll('.desk-label') || [];

  // ── Mouse parallax ────────────────────────────────────────────────────────
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Raycaster ─────────────────────────────────────────────────────────────
  const raycaster = new THREE.Raycaster();
  const pointer   = new THREE.Vector2();

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const allMeshes = Object.values(clickables).flatMap(g => g.children.concat([g]));
    const hits = raycaster.intersectObjects(allMeshes, true);
    if (hits.length > 0) {
      let obj = hits[0].object;
      while (obj.parent && !obj.userData.id) obj = obj.parent;
      const id = obj.userData.id;
      if (id && DESK_ITEMS[id]) openDeskModal(id);
    }
  });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const allMeshes = Object.values(clickables).flatMap(g => g.children.concat([g]));
    const hits = raycaster.intersectObjects(allMeshes, true);
    if (hits.length > 0) {
      document.body.classList.add('cursor-hover');
      document.querySelector('.cursor-label').textContent = 'CLICK';
    } else {
      document.body.classList.remove('cursor-hover');
    }
  });

  // ── Modal ─────────────────────────────────────────────────────────────────
  const modal       = document.getElementById('desk-modal');
  const modalContent = document.getElementById('desk-modal-content');
  const modalClose   = modal?.querySelector('.desk-modal-close');

  function openDeskModal(id) {
    const item = DESK_ITEMS[id];
    if (!item || !modal) return;
    modalContent.innerHTML = item.content;
    modal.classList.add('open');
  }

  modalClose?.addEventListener('click', () => modal.classList.remove('open'));
  modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  // ── Labels appear when section enters view ────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      labelEls.forEach((el, i) => {
        if (entry.isIntersecting) setTimeout(() => el.classList.add('visible'), i * 120);
      });
    });
  }, { threshold: 0.3 });
  const deskSection = document.getElementById('desk');
  if (deskSection) observer.observe(deskSection);

  // ── Project 3D → 2D for label positioning ────────────────────────────────
  function project3Dto2D(x, y, z) {
    const v = new THREE.Vector3(x, y, z);
    v.project(camera);
    return {
      x: (v.x * 0.5 + 0.5) * container.clientWidth,
      y: (-v.y * 0.5 + 0.5) * container.clientHeight,
    };
  }

  // ── Animation loop ────────────────────────────────────────────────────────
  let raf;
  const lampPt = new THREE.PointLight(0xffe8b0, 3, 8);
  lampPt.position.set(-2.2, 2.8, 0.5);
  scene.add(lampPt);
  const clock = new THREE.Clock();

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    camera.position.x += (mx * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (2.8 - my * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    awardGrp.rotation.y = t * 0.4;
    notesGrp.position.y = -0.44 + Math.sin(t * 0.7) * 0.015;
    lampPt.intensity = 3 + Math.sin(t * 12) * 0.06;

    labelEls.forEach(el => {
      const id  = el.getAttribute('data-item');
      const pos = labelPositions[id];
      if (!pos) return;
      const p = project3Dto2D(pos.x, pos.y, pos.z);
      el.style.left      = p.x + 'px';
      el.style.top       = p.y + 'px';
      el.style.transform = 'translate(-50%, -50%)';
    });

    renderer.render(scene, camera);
  };
  animate();
}
