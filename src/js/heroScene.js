import * as THREE from 'three';
import { gsap } from 'gsap';

export function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const container = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 1.6, 6);
  camera.lookAt(0, 0, 0);

  // ── Resize ──────────────────────────────────────────────────────────────
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // ── Lighting ─────────────────────────────────────────────────────────────
  const ambient = new THREE.AmbientLight(0xffeedd, 0.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.6);
  keyLight.position.set(3, 5, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xc4a05c, 0.6);
  rimLight.position.set(-4, 2, -3);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0x3366ff, 0.4, 12);
  fillLight.position.set(-3, 1, 2);
  scene.add(fillLight);

  // ── Desk surface ─────────────────────────────────────────────────────────
  const deskGeo = new THREE.BoxGeometry(5.5, 0.12, 2.8);
  const deskMat = new THREE.MeshStandardMaterial({
    color: 0x3d2a1a,
    roughness: 0.4,
    metalness: 0.05,
  });
  const desk = new THREE.Mesh(deskGeo, deskMat);
  desk.position.y = -0.5;
  desk.receiveShadow = true;
  scene.add(desk);

  // Desk legs
  const legGeo = new THREE.BoxGeometry(0.1, 1.2, 0.1);
  const legMat = new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.6 });
  const legPositions = [[-2.5, -1.1, 1.2], [2.5, -1.1, 1.2], [-2.5, -1.1, -1.2], [2.5, -1.1, -1.2]];
  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    scene.add(leg);
  });

  // ── Open book ────────────────────────────────────────────────────────────
  const bookGroup = new THREE.Group();
  bookGroup.position.set(-1, -0.38, 0.2);

  const pageL = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.02, 0.9),
    new THREE.MeshStandardMaterial({ color: 0xf5f0e8, roughness: 0.9 })
  );
  pageL.position.x = -0.36;
  pageL.rotation.z = -0.05;
  pageL.castShadow = true;
  bookGroup.add(pageL);

  const pageR = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.02, 0.9),
    new THREE.MeshStandardMaterial({ color: 0xf2ede0, roughness: 0.9 })
  );
  pageR.position.x = 0.36;
  pageR.rotation.z = 0.05;
  pageR.castShadow = true;
  bookGroup.add(pageR);

  const spine = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.06, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.5, metalness: 0.1 })
  );
  spine.castShadow = true;
  bookGroup.add(spine);
  scene.add(bookGroup);

  // ── Notebook ─────────────────────────────────────────────────────────────
  const notebookGroup = new THREE.Group();
  notebookGroup.position.set(0.9, -0.42, -0.1);
  notebookGroup.rotation.y = -0.3;

  const cover = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.04, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.6 })
  );
  cover.castShadow = true;
  notebookGroup.add(cover);

  // Pages stacked
  for (let i = 0; i < 5; i++) {
    const page = new THREE.Mesh(
      new THREE.BoxGeometry(0.86, 0.005, 1.16),
      new THREE.MeshStandardMaterial({ color: 0xf8f4ec, roughness: 0.95 })
    );
    page.position.y = 0.022 + i * 0.005;
    notebookGroup.add(page);
  }
  scene.add(notebookGroup);

  // ── Pen / pencil ─────────────────────────────────────────────────────────
  const penGroup = new THREE.Group();
  penGroup.position.set(-0.3, -0.43, 0.7);
  penGroup.rotation.z = 0.3;
  penGroup.rotation.y = 0.6;

  const penBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 1.2, 8),
    new THREE.MeshStandardMaterial({ color: 0xc4a05c, roughness: 0.3, metalness: 0.6 })
  );
  penBody.rotation.z = Math.PI / 2;
  penGroup.add(penBody);

  const penTip = new THREE.Mesh(
    new THREE.ConeGeometry(0.025, 0.12, 8),
    new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.7 })
  );
  penTip.position.x = 0.66;
  penTip.rotation.z = -Math.PI / 2;
  penGroup.add(penTip);
  scene.add(penGroup);

  // ── Desk lamp ────────────────────────────────────────────────────────────
  const lampGroup = new THREE.Group();
  lampGroup.position.set(2, -0.44, 0);

  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.22, 0.05, 16),
    new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.4, metalness: 0.5 })
  );
  lampGroup.add(lampBase);

  const lampStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 1.4, 8),
    new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.2, metalness: 0.8 })
  );
  lampStem.position.y = 0.72;
  lampGroup.add(lampStem);

  const lampArmGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.7, 8);
  const lampArmMat = new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.2, metalness: 0.8 });
  const lampArm = new THREE.Mesh(lampArmGeo, lampArmMat);
  lampArm.position.set(-0.25, 1.35, 0);
  lampArm.rotation.z = Math.PI / 4;
  lampGroup.add(lampArm);

  const lampShade = new THREE.Mesh(
    new THREE.ConeGeometry(0.25, 0.35, 16, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xe8d5a3, roughness: 0.6, side: THREE.DoubleSide })
  );
  lampShade.position.set(-0.5, 1.6, 0);
  lampGroup.add(lampShade);

  const lampLight = new THREE.PointLight(0xffe8b0, 1.5, 3.5);
  lampLight.position.set(-0.5, 1.45, 0);
  lampGroup.add(lampLight);

  scene.add(lampGroup);

  // ── Floating equations ────────────────────────────────────────────────────
  // Represented as glowing flat planes with texture-like appearance
  const equationGroup = new THREE.Group();
  const equColors = [0xc4a05c, 0x8bc4ff, 0xe0c07a];
  const equSizes = [[0.5, 0.12], [0.4, 0.1], [0.35, 0.09]];
  const equPositions = [
    [0.5, 0.8, -0.5],
    [-0.8, 1.1, -0.2],
    [1.2, 0.5, -0.8],
  ];
  equPositions.forEach(([x, y, z], i) => {
    const [w, h] = equSizes[i];
    const eqGeo = new THREE.PlaneGeometry(w, h);
    const eqMat = new THREE.MeshBasicMaterial({
      color: equColors[i],
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const eq = new THREE.Mesh(eqGeo, eqMat);
    eq.position.set(x, y, z);
    eq.rotation.y = Math.random() * 0.4 - 0.2;
    equationGroup.add(eq);
  });
  scene.add(equationGroup);

  // Initials on desk
  const initialsGeo = new THREE.TorusGeometry(0.12, 0.014, 8, 32);
  const initialsMat = new THREE.MeshStandardMaterial({
    color: 0xc4a05c,
    roughness: 0.2,
    metalness: 0.8,
  });
  const initials = new THREE.Mesh(initialsGeo, initialsMat);
  initials.position.set(0, -0.43, 0);
  initials.rotation.x = Math.PI / 2;
  scene.add(initials);

  // ── Mouse parallax ────────────────────────────────────────────────────────
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Hover interactions ────────────────────────────────────────────────────
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hoveredMesh = null;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects([
      ...bookGroup.children,
      ...notebookGroup.children,
    ], true);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (hoveredMesh !== obj) {
        hoveredMesh = obj;
        document.body.classList.add('cursor-3d');

        if (bookGroup.children.includes(obj) || obj.parent === bookGroup) {
          gsap.to(bookGroup.rotation, { x: -0.25, duration: 0.5, ease: 'power2.out' });
        }
        if (notebookGroup.children.includes(obj) || obj.parent === notebookGroup) {
          gsap.to(notebookGroup.position, { y: -0.3, duration: 0.4, ease: 'power2.out' });
        }
      }
    } else {
      if (hoveredMesh) {
        hoveredMesh = null;
        document.body.classList.remove('cursor-3d');
        gsap.to(bookGroup.rotation, { x: 0, duration: 0.5, ease: 'power2.out' });
        gsap.to(notebookGroup.position, { y: -0.42, duration: 0.4, ease: 'power2.out' });
      }
    }
  });

  // Scroll: camera drifts toward desk
  const onScroll = () => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.8)));
    gsap.to(camera.position, {
      z: 6 - progress * 2,
      y: 1.6 - progress * 0.5,
      duration: 0.3,
      ease: 'none',
      overwrite: 'auto',
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Animation loop ─────────────────────────────────────────────────────────
  let raf;
  const clock = new THREE.Clock();

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth camera parallax
    targetX += (mouseX * 0.4 - targetX) * 0.05;
    targetY += (mouseY * 0.2 - targetY) * 0.05;
    camera.position.x = targetX;
    camera.rotation.y = -targetX * 0.04;

    // Floating equations gently bob
    equationGroup.children.forEach((eq, i) => {
      eq.position.y += Math.sin(t * 0.8 + i * 1.2) * 0.0008;
      eq.rotation.z = Math.sin(t * 0.5 + i) * 0.05;
    });

    // Lamp light flicker
    lampLight.intensity = 1.5 + Math.sin(t * 8) * 0.04;

    // Slow initials rotation
    initials.rotation.z = t * 0.2;

    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', onScroll);
    renderer.dispose();
  };
}
