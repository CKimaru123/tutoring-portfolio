import * as THREE from 'three';

export function initContactScene() {
  const canvas = document.getElementById('contact-canvas');
  if (!canvas) return;

  const container = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 5);

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // ── Desk in darkness (minimal, atmospheric) ────────────────────────────────
  const deskMat = new THREE.MeshStandardMaterial({ color: 0x1a0f06, roughness: 0.5 });
  const desk = new THREE.Mesh(new THREE.BoxGeometry(6, 0.1, 3), deskMat);
  desk.position.y = -1.5;
  scene.add(desk);

  // Lamp
  const lampGlow = new THREE.PointLight(0xffe0a0, 0, 8);
  lampGlow.position.set(-1.5, 1.2, 1);
  scene.add(lampGlow);

  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.18, 0.05, 12),
    new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.2, metalness: 0.8 })
  );
  lampBase.position.set(-1.5, -1.44, 0.5);
  scene.add(lampBase);

  const lampStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8),
    new THREE.MeshStandardMaterial({ color: 0xd4af70, roughness: 0.2, metalness: 0.8 })
  );
  lampStem.position.set(-1.5, -0.74, 0.5);
  scene.add(lampStem);

  const lampShade = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.3, 12, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xe8d5a3, roughness: 0.6, side: THREE.DoubleSide })
  );
  lampShade.position.set(-1.5, -0.06, 0.5);
  scene.add(lampShade);

  // Notebook on desk
  const notebook = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.03, 1.1),
    new THREE.MeshStandardMaterial({ color: 0x0d1a2e, roughness: 0.7 })
  );
  notebook.position.set(0.6, -1.44, 0.2);
  notebook.rotation.y = 0.15;
  scene.add(notebook);

  // Particle field (stars / dust)
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const ptMat = new THREE.PointsMaterial({
    color: 0xc4a05c,
    size: 0.04,
    transparent: true,
    opacity: 0.3,
  });
  const particles = new THREE.Points(ptGeo, ptMat);
  scene.add(particles);

  // ── Lamp illumination on scroll ────────────────────────────────────────────
  const section = document.getElementById('contact');
  let lampIntensity = 0;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio;
        lampIntensity = ratio * 2.5;
      }
    });
  }, { threshold: Array.from({ length: 20 }, (_, i) => i / 19) });

  if (section) observer.observe(section);

  // ── Mouse parallax ─────────────────────────────────────────────────────────
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Animation ──────────────────────────────────────────────────────────────
  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    lampGlow.intensity += (lampIntensity - lampGlow.intensity) * 0.03;

    particles.rotation.y = t * 0.02;
    particles.rotation.x = t * 0.01;

    camera.position.x += (mx * 0.3 - camera.position.x) * 0.03;
    camera.position.y += (-my * 0.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  animate();
}
