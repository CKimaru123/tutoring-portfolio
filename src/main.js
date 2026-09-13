import './styles/main.css';

import { initLoader }         from './js/loader.js';
import { initNav }            from './js/nav.js';
import { initHeroScene }      from './js/heroScene.js';
import { initSubjectScenes }  from './js/subjectScenes.js';
import { initClassroom }      from './js/classroomScene.js';   // replaces initDeskScene
import { initContactScene }   from './js/contactScene.js';
import { initFlipbook }       from './js/flipbook.js';
import {
  initCursor,
  initReveal,
  initStats,
  initMethodology,
  initTestimonials,
  initCaseStudies,
  initTimeline,
  initFAQ,
  initResources,
  initBooking,
  initAITutor,
  initMagnetic,
  initTiltCards,
  initFooterSpark,
  initSectionEntrance,
} from './js/interactions.js';

// ── Boot: runs immediately, before loader is dismissed ──────────────────────
// initCursor();  /* COMMENTED OUT — using browser default cursor instead */
initNav();
initAITutor();

// ── After loader "Enter" is clicked ──────────────────────────────────────────
function bootSite() {
  // 3D scenes
  initHeroScene();
  initSubjectScenes();
  initClassroom();       // entry card + full-screen classroom overlay
  initContactScene();

  // Flipbook (Academic Projects)
  initFlipbook();

  // Scroll & interaction systems
  initReveal();
  initSectionEntrance();
  initStats();
  initMethodology();
  initTestimonials();
  initCaseStudies();
  initTimeline();
  initFAQ();
  initResources();
  initBooking();
  initMagnetic();
  initTiltCards();
  initFooterSpark();

  // Smooth-scroll all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

initLoader(bootSite);
