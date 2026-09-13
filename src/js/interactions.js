import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ══════════════════════════════════════════════════════════════════════════════
//  CUSTOM CURSOR
// ══════════════════════════════════════════════════════════════════════════════
export function initCursor() {
  const cursor     = document.getElementById('cursor');
  const dot        = cursor.querySelector('.cursor-dot');
  const ring       = cursor.querySelector('.cursor-ring');
  const label      = cursor.querySelector('.cursor-label');

  let cx = 0, cy = 0; // current (ring, lerped)
  let tx = 0, ty = 0; // target (dot, instant)

  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    // Dot follows instantly
    dot.style.left  = tx + 'px';
    dot.style.top   = ty + 'px';
  });

  // Ring follows with lag
  const tick = () => {
    cx = lerp(cx, tx, 0.12);
    cy = lerp(cy, ty, 0.12);
    ring.style.left  = cx + 'px';
    ring.style.top   = cy + 'px';
    label.style.left = cx + 'px';
    label.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  };
  tick();

  // Hover state: interactive elements
  const interactiveSelector = 'a, button, .btn, .subject-card, .testimonial-card, .faq-card, .book-item, .resource-item, .filter-btn, select, input, .booking-step, .desk-label';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      label.textContent = el.dataset.cursorLabel || 'VIEW →';
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      label.textContent = '';
    });
  });

  // Disappear off window
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
}

// ══════════════════════════════════════════════════════════════════════════════
//  REVEAL ANIMATIONS (ScrollTrigger)
// ══════════════════════════════════════════════════════════════════════════════
export function initReveal() {
  // Text reveals
  gsap.utils.toArray('.reveal-text').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Stagger reveal-up blocks
  gsap.utils.toArray('.reveal-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: (i % 3) * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  ANIMATED STAT COUNTERS
// ══════════════════════════════════════════════════════════════════════════════
export function initStats() {
  const stats = document.querySelectorAll('.stat-number');

  stats.forEach(el => {
    const target  = parseFloat(el.dataset.target);
    const prefix  = el.dataset.prefix  || '';
    const suffix  = el.dataset.suffix  || '';
    const decimal = el.hasAttribute('data-decimal');
    let started = false;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (started) return;
        started = true;
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            const v = decimal
              ? this.targets()[0].val.toFixed(1)
              : Math.round(this.targets()[0].val);
            el.textContent = prefix + v + suffix;
          },
        });
      },
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  METHODOLOGY — activate steps on scroll
// ══════════════════════════════════════════════════════════════════════════════
export function initMethodology() {
  const steps = document.querySelectorAll('.method-step');
  if (!steps.length) return;

  // Start with step 1 active
  steps[0].classList.add('active');

  steps.forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        step.classList.add('active');
      },
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  TESTIMONIAL CARD FLIP
// ══════════════════════════════════════════════════════════════════════════════
export function initTestimonials() {
  document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  CASE STUDY PROGRESS BARS
// ══════════════════════════════════════════════════════════════════════════════
export function initCaseStudies() {
  document.querySelectorAll('.grade-bar').forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => bar.classList.add('animated'),
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  TIMELINE (About section)
// ══════════════════════════════════════════════════════════════════════════════
export function initTimeline() {
  const nodes = document.querySelectorAll('.timeline-node');
  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
    });
  });

  // Auto-activate on scroll
  nodes.forEach(node => {
    ScrollTrigger.create({
      trigger: node,
      start: 'top 75%',
      once: true,
      onEnter: () => node.classList.add('active'),
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  FAQ CARDS
// ══════════════════════════════════════════════════════════════════════════════
export function initFAQ() {
  const cards = document.querySelectorAll('.faq-card');
  cards.forEach(card => {
    const question = card.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const wasOpen = card.classList.contains('open');
      cards.forEach(c => c.classList.remove('open'));
      if (!wasOpen) card.classList.add('open');
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  RESOURCES — search + filter
// ══════════════════════════════════════════════════════════════════════════════
export function initResources() {
  const searchInput = document.getElementById('resource-search');
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const items       = document.querySelectorAll('.resource-item');

  let activeFilter = 'all';
  let searchTerm   = '';

  function applyFilters() {
    items.forEach(item => {
      const tags   = (item.dataset.tags || '').toLowerCase();
      const title  = (item.querySelector('h4')?.textContent || '').toLowerCase();
      const desc   = (item.querySelector('p')?.textContent  || '').toLowerCase();

      const matchFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const matchSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm);

      item.classList.toggle('hidden', !(matchFilter && matchSearch));
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase().trim();
    applyFilters();
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  BOOKING FLOW — student details, step progression, confirmation modal,
//                 mailto: email delivery
// ══════════════════════════════════════════════════════════════════════════════
export function initBooking() {
  // ── Form fields ────────────────────────────────────────────────────────────
  const steps   = document.querySelectorAll('.booking-step');
  const nameEl  = document.getElementById('booking-name');
  const emailEl = document.getElementById('booking-email');
  const phoneEl = document.getElementById('booking-phone');
  const subject = document.getElementById('booking-subject');
  const type    = document.getElementById('booking-type');
  const date    = document.getElementById('booking-date');
  const submit  = document.getElementById('booking-submit');

  // ── Modal elements ─────────────────────────────────────────────────────────
  const modal      = document.getElementById('booking-modal');
  const closeBtn   = document.getElementById('bm-close');
  const sendBtn    = document.getElementById('bm-send-btn');

  // Modal detail fields
  const bmGreeting  = document.getElementById('bm-greeting');
  const bmName      = document.getElementById('bm-name');
  const bmEmailVal  = document.getElementById('bm-email-val');
  const bmPhoneVal  = document.getElementById('bm-phone-val');
  const bmPhoneRow  = document.getElementById('bm-phone-row');
  const bmSubject   = document.getElementById('bm-subject-val');
  const bmType      = document.getElementById('bm-type-val');
  const bmDate      = document.getElementById('bm-date-val');
  const bmTimestamp = document.getElementById('bm-timestamp');

  // ── Enforce future-only dates ──────────────────────────────────────────────
  if (date) {
    date.min = new Date().toISOString().split('T')[0];
  }

  // ── Step activation — progresses visually as fields are filled ────────────
  // Steps: 0=Details, 1=Subject, 2=Type, 3=Date, 4=Confirm
  function activate(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i <= index));
  }

  // Activate step 1 (Subject) once name AND email are filled
  function checkDetailsStep() {
    if (nameEl?.value.trim() && emailEl?.value.trim()) activate(1);
  }

  nameEl?.addEventListener('input',  checkDetailsStep);
  emailEl?.addEventListener('input', checkDetailsStep);

  subject?.addEventListener('change', () => { if (subject.value) activate(2); });
  type?.addEventListener('change',    () => { if (type.value)    activate(3); });
  date?.addEventListener('change',    () => { if (date.value)    activate(4); });

  // ── Validation ─────────────────────────────────────────────────────────────
  function validate() {
    const missing = [];
    if (!nameEl?.value.trim())    missing.push('your name');
    if (!emailEl?.value.trim())   missing.push('your email address');
    if (!subject?.value)          missing.push('a subject');
    if (!type?.value)             missing.push('a session type');
    if (!date?.value)             missing.push('a preferred date');

    if (missing.length) {
      // Highlight the first missing field
      if (!nameEl?.value.trim())  nameEl?.focus();
      else if (!emailEl?.value.trim()) emailEl?.focus();
      // Replace alert with inline shake on the step
      steps.forEach(s => s.classList.remove('booking-error'));
      if (!nameEl?.value.trim() || !emailEl?.value.trim()) {
        steps[0]?.classList.add('booking-error');
      }
      return false;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEl.value.trim())) {
      emailEl?.focus();
      steps[0]?.classList.add('booking-error');
      return false;
    }

    return true;
  }

  // ── Format the date nicely — "Monday, 15 September 2026" ─────────────────
  function formatDate(iso) {
    const d = new Date(iso + 'T12:00:00'); // noon avoids timezone-date-shift
    return d.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  // ── Build mailto: URL — prefilled subject + body ──────────────────────────
  function buildMailto(data) {
    const subject_line = encodeURIComponent(
      `📅 New Session Booking Request — ${data.subject} — ${data.name}`
    );

    const body = encodeURIComponent([
      `SESSION BOOKING REQUEST`,
      `${'─'.repeat(40)}`,
      ``,
      `Hello Alex,`,
      ``,
      `A new tutoring session has been requested. Please find the details below.`,
      ``,
      `SESSION DETAILS`,
      `${'─'.repeat(40)}`,
      `Student Name   : ${data.name}`,
      `Email Address  : ${data.email}`,
      data.phone ? `Phone Number   : ${data.phone}` : null,
      `Subject        : ${data.subject}`,
      `Session Type   : ${data.type}`,
      `Preferred Date : ${data.formattedDate}`,
      ``,
      `${'─'.repeat(40)}`,
      `Sent           : ${data.timestamp}`,
      `${'─'.repeat(40)}`,
      ``,
      `Please reply to this email within 24 hours to confirm the booking.`,
      ``,
      `Best regards,`,
      `${data.name}`,
    ].filter(line => line !== null).join('\n'));

    return `mailto:kiragucollins@gmail.com?subject=${subject_line}&body=${body}`;
  }

  // ── Open the confirmation modal ────────────────────────────────────────────
  function openModal() {
    const data = {
      name:          nameEl.value.trim(),
      email:         emailEl.value.trim(),
      phone:         phoneEl?.value.trim() || '',
      subject:       subject.value,
      type:          type.value,
      date:          date.value,
      formattedDate: formatDate(date.value),
      timestamp:     new Date().toLocaleString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }),
    };

    // Populate modal fields
    bmGreeting.textContent  = `Hello ${data.name.split(' ')[0]},`;
    bmName.textContent      = data.name;
    bmEmailVal.textContent  = data.email;
    bmDate.textContent      = data.formattedDate;
    bmSubject.textContent   = data.subject;
    bmType.textContent      = data.type;
    bmTimestamp.textContent = data.timestamp;

    if (data.phone) {
      bmPhoneVal.textContent = data.phone;
      bmPhoneRow?.classList.remove('hidden');
    } else {
      bmPhoneRow?.classList.add('hidden');
    }

    // Attach mailto to the modal send button
    sendBtn.onclick = () => {
      window.location.href = buildMailto(data);

      setTimeout(() => {
        closeModal();
        submit.textContent = '✓ Request Sent!';
        submit.classList.add('booking-sent-state');
        setTimeout(() => {
          submit.textContent = 'Reserve My Place';
          submit.classList.remove('booking-sent-state');
        }, 5000);
      }, 800);
    };

    modal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // ── Close modal ────────────────────────────────────────────────────────────
  function closeModal() {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Submit — validate then open modal ─────────────────────────────────────
  submit?.addEventListener('click', () => {
    // Clear previous error states
    steps.forEach(s => s.classList.remove('booking-error'));
    if (validate()) openModal();
  });

  // ── Close triggers ─────────────────────────────────────────────────────────
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  AI TUTOR CHAT  — Option A: intent-based, stateful, multi-turn
// ══════════════════════════════════════════════════════════════════════════════
export function initAITutor() {
  const btn     = document.getElementById('ai-tutor-btn');
  const panel   = document.getElementById('ai-tutor-panel');
  const close   = document.getElementById('ai-tutor-close');
  const input   = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send');
  const msgs    = document.getElementById('ai-messages');

  // ── Conversation state ─────────────────────────────────────────────────────
  // Tracks what topic/subject came up last so follow-up replies are contextual.
  const state = {
    lastSubject:  null,   // e.g. 'mathematics', 'physics', 'chemistry', 'cs', 'english'
    lastIntent:   null,   // e.g. 'booking', 'pricing', 'availability', 'subject', 'resources'
    messageCount: 0,
  };

  // ── Intent definitions ─────────────────────────────────────────────────────
  // Each intent has an array of keyword triggers (any match fires the intent)
  // and an array of response variants (picked randomly for variety).
  const INTENTS = [

    // ── Greetings ────────────────────────────────────────────────────────────
    {
      name: 'greeting',
      triggers: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'],
      responses: [
        "Hello! Great to have you here. I'm Collins's assistant — I can tell you about subjects, sessions, availability, or point you to free resources. What's on your mind?",
        "Hi there! I'm here to help you find out everything about tutoring with Collins. Are you looking for help with a particular subject, or would you like to know how sessions work?",
        "Hey! Welcome. Whether you're curious about subjects, booking, or just want to explore — I'm here. What can I help you with?",
      ],
    },

    // ── Mathematics (and synonyms) ────────────────────────────────────────────
    {
      name: 'mathematics',
      triggers: ['math', 'maths', 'mathematics', 'algebra', 'calculus', 'geometry', 'trigonometry', 'statistics', 'probability', 'differentiation', 'integration', 'vectors', 'mechanics', 'pure', 'further maths', 'a-level maths', 'gcse maths', 'ib maths'],
      responses: [
        "Mathematics is Collins's core specialism — from GCSE foundations right through to A-Level Further Maths and IB HL. Whether it's algebra, calculus, statistics, or mechanics, sessions are built around understanding first, technique second. Would you like to know about booking, or shall I point you to the free Maths resources?",
        "Great choice. Collins covers the full Mathematics curriculum: pure maths, statistics, and mechanics at GCSE, A-Level, and IB. The approach starts with 'why does this work?' before moving to practice. Want to book a session, or explore what's available first?",
        "Maths is where Collins works most deeply. Calculus, algebra, geometry, statistics — all levels from Year 10 upwards. Many students arrive struggling with one specific area; the diagnostic session identifies exactly where and builds from there. Shall I tell you how to book?",
      ],
    },

    // ── Calculus specifically ─────────────────────────────────────────────────
    {
      name: 'calculus',
      triggers: ['calculus', 'differentiation', 'integration', 'derivatives', 'limits', 'chain rule', 'product rule', 'quotient rule'],
      responses: [
        "Calculus is one of the most requested topics. Collins's approach always starts with limits and the concept of a derivative before introducing rules — so you understand what you're actually computing, not just how. The Calculus Formula Sheet in the Resources section is a great free starting point.",
        "Struggling with calculus? You're not alone — it's where most A-Level students lose marks. Collins builds conceptual understanding first: what a derivative actually means, why integration reverses it. Check the free Calculus Formula Sheet in Resources, or book a session for a personalised plan.",
        "Calculus sessions typically begin with diagnosing whether the gap is conceptual (what is a derivative?) or mechanical (applying chain rule under pressure). Once that's clear, a targeted plan is built. Want to book an initial diagnostic session?",
      ],
    },

    // ── Physics ───────────────────────────────────────────────────────────────
    {
      name: 'physics',
      triggers: ['physics', 'mechanics', 'waves', 'electricity', 'electromagnetism', 'quantum', 'thermodynamics', 'optics', 'forces', 'motion', 'energy', 'fields', 'a-level physics', 'ib physics', 'gcse physics'],
      responses: [
        "Physics is Collins's second deep specialism alongside Mathematics. Sessions cover mechanics, waves, electromagnetism, and quantum foundations at A-Level and IB HL. The emphasis is always on building physical intuition before the maths — so equations make sense rather than just working. Want to know more about how sessions are structured?",
        "A-Level and IB Physics are areas where having strong maths support makes a huge difference. Collins covers all major topics and specifically helps students bridge the gap between understanding concepts in class and applying them under exam conditions. The free Physics Equations Reference in Resources is worth a look too.",
        "Physics sessions often reveal that the difficulty isn't the physics — it's the maths underneath it. Collins addresses both simultaneously. Students who've struggled for months often have a breakthrough within a few sessions once the foundational gaps are identified. Shall I direct you to the booking section?",
      ],
    },

    // ── Chemistry ─────────────────────────────────────────────────────────────
    {
      name: 'chemistry',
      triggers: ['chemistry', 'organic', 'inorganic', 'physical chemistry', 'molecules', 'reactions', 'acids', 'moles', 'bonding', 'periodic table', 'a-level chemistry', 'ib chemistry'],
      responses: [
        "Chemistry — especially organic — is an area where Collins's structured framework approach makes a real difference. Rather than memorising reaction after reaction, students learn the underlying electron logic that connects everything. It's the difference between a list and a language. Interested in booking?",
        "Collins covers all three branches of A-Level and IB Chemistry. The most common request is organic chemistry, where students often feel lost in mechanisms. A visual, logical framework is used that students consistently say made things click for the first time. Want to explore the Resources section or book a session?",
        "Chemistry is one of those subjects where a few conceptual gaps can make everything downstream confusing. Collins runs an initial diagnostic to find exactly where understanding breaks down, then builds a targeted plan. Would you like to know how to get started?",
      ],
    },

    // ── Computer Science ──────────────────────────────────────────────────────
    {
      name: 'cs',
      triggers: ['computer science', 'computing', 'programming', 'python', 'java', 'algorithms', 'data structures', 'coding', 'software', 'cs', 'a-level computing', 'gcse computing'],
      responses: [
        "Computer Science tutoring covers algorithms, data structures, computational thinking, and programming in Python and Java — from GCSE through A-Level. Collins bridges the gap between theoretical concepts and practical coding, which is where many students get stuck. Would you like to book a session?",
        "CS sessions are built around problem-solving methodology first — how to break down a problem, design a solution, then implement it. Whether you're struggling with recursion, sorting algorithms, or exam-style questions, a structured approach makes the difference. Interested?",
        "For Computer Science, Collins covers the full A-Level and GCSE syllabuses including programming, theory, and Systems Architecture. Sessions often include live coding and step-by-step algorithm tracing. Would you like to know more or book a session?",
      ],
    },

    // ── Economics ─────────────────────────────────────────────────────────────
    {
      name: 'economics',
      triggers: ['economics', 'micro', 'macro', 'microeconomics', 'macroeconomics', 'econometrics', 'supply', 'demand', 'market', 'gdp', 'inflation', 'fiscal', 'monetary', 'a-level economics', 'ib economics', 'gcse economics', 'mathematical economics'],
      responses: [
        "Economics is taught from a rigorous mathematical foundation — supply and demand, market equilibrium, macroeconomic modelling, and econometrics. Alex's approach bridges the gap between economic intuition and the quantitative techniques that separate top marks from average ones. Want to know more or book a session?",
        "A-Level and IB Economics sessions cover both micro and macro, with particular depth in the mathematical and graphical analysis that examiners reward. If you're finding essay technique or diagram work tricky, that's exactly where targeted sessions make the biggest difference. Shall I point you to the booking section?",
        "Economics combines beautifully with Mathematics, and Alex teaches both — so sessions can reinforce the quantitative side (elasticity calculations, national income models, econometric analysis) alongside the theory. Interested in a session?",
      ],
    },

    // ── Booking / scheduling ──────────────────────────────────────────────────
    {
      name: 'booking',
      triggers: ['book', 'booking', 'session', 'schedule', 'appointment', 'reserve', 'sign up', 'enrol', 'enroll', 'start', 'get started', 'join', 'when can', 'how do i', 'how can i', 'i want to'],
      responses: [
        "Booking is straightforward — head to the 'Book a Session' section on this page. Choose your subject, session type (60 or 90 minutes), and preferred date, and Collins will confirm within 24 hours. Want me to scroll you there?",
        "To book, use the booking form on this page — it takes less than two minutes. Select your subject, session length, and a date that works for you. If you're unsure which session type to choose, a standard 60-minute session is the best starting point. Shall I point you to it?",
        "Getting started is easy. Fill in the booking form below: subject, session type, preferred date. Collins personally responds to all booking requests within 24 hours to confirm and discuss your goals before the first session. Ready to go?",
      ],
    },

    // ── Availability ──────────────────────────────────────────────────────────
    {
      name: 'availability',
      triggers: ['available', 'availability', 'when', 'free', 'times', 'days', 'weekday', 'weekend', 'evening', 'morning', 'slots', 'schedule'],
      responses: [
        "Collins teaches weekday evenings and weekends. Intake is kept intentionally selective to maintain session quality, so spaces are limited — especially in the run-up to exam season. It's worth booking early to secure a regular slot.",
        "Sessions are available on weekday evenings and at weekends, online or in-person in London. Availability varies by period — spots fill quickly before exam seasons. The best way to check current availability is to submit a booking request and Collins will respond within 24 hours.",
        "Weekday evenings and weekends are the core availability windows. Collins keeps the intake small deliberately — each student gets genuine attention rather than being one of dozens. If you have a specific time in mind, include it in the booking notes and Collins will do his best to accommodate it.",
      ],
    },

    // ── Online / in-person ────────────────────────────────────────────────────
    {
      name: 'format',
      triggers: ['online', 'in person', 'in-person', 'remote', 'virtual', 'zoom', 'teams', 'meet', 'whiteboard', 'location', 'london', 'where', 'how does it work', 'how do sessions work'],
      responses: [
        "Sessions run either online or in-person in London. Online sessions use an interactive shared whiteboard — fully real-time, students can write, annotate, and solve problems together with Collins. Many students actually prefer online for the flexibility. Both formats are equally effective.",
        "Collins teaches both online and in-person. Online sessions use a shared digital whiteboard that mirrors the in-person experience closely. Notes and worked examples are shared as PDFs after each session. In-person is available across London.",
        "Both formats work well. Online sessions run via an interactive whiteboard platform — not just a video call. You can draw, annotate, solve problems live, and everything is recorded and shared afterwards. In-person is available in London if that's preferred.",
      ],
    },

    // ── Session length / packages ─────────────────────────────────────────────
    {
      name: 'sessions',
      triggers: ['how long', 'length', 'duration', 'hour', 'minutes', '60', '90', 'package', 'packages', 'bundle', 'discount', 'multiple sessions'],
      responses: [
        "Standard sessions are 60 minutes. Extended 90-minute sessions are available and recommended during exam-intensive periods. Packages of 4, 8, or 12 sessions are also available — these work out more cost-effective and help maintain consistent progress. Which would suit you best?",
        "Sessions come in 60 or 90 minutes. For regular ongoing tutoring, package deals of 4, 8, or 12 sessions are available. Most students on a programme of improvement opt for the 8-session package. Would you like more detail on how sessions are structured?",
        "A 60-minute session is the standard. If you're in a focused exam preparation period, 90 minutes gives more room for past paper practice. Packages are available for students who want a sustained programme — Collins uses these to build a proper curriculum rather than ad hoc sessions. Shall I direct you to booking?",
      ],
    },

    // ── Pricing / cost ────────────────────────────────────────────────────────
    {
      name: 'pricing',
      triggers: ['price', 'prices', 'pricing', 'cost', 'costs', 'rate', 'rates', 'fee', 'fees', 'how much', 'charge', 'pay', 'payment', 'affordable', 'expensive'],
      responses: [
        "For current session rates, please use the contact form or send a direct enquiry — pricing is discussed personally to ensure the right session type is matched to your needs and goals. Collins responds to all enquiries within 24 hours.",
        "Pricing details are shared directly via email or the contact form, as rates vary by session type, package, and level. Collins is happy to discuss what would work best for your situation. Use the 'Send an Inquiry' button in the Contact section.",
        "Session fees are provided personally on enquiry — Collins prefers to have a quick conversation about your goals first to recommend the right session structure, and pricing is discussed as part of that. Feel free to use the contact form or email directly.",
      ],
    },

    // ── Homework / materials ──────────────────────────────────────────────────
    {
      name: 'homework',
      triggers: ['homework', 'practice', 'exercises', 'worksheets', 'materials', 'notes', 'resources', 'pdfs', 'handouts', 'past papers', 'revision'],
      responses: [
        "Yes — targeted practice problems are set after every session, calibrated to exactly what was covered. These are marked and returned before the next session. Collins also shares PDF notes from each lesson. The Resources section also has free study guides, formula sheets, and revision materials.",
        "After every session you'll receive a set of practice questions specifically chosen to reinforce what was covered — not generic exercises. Collins marks these before the next session and uses the results to adjust the following lesson. There are also free downloadable resources in the Resources section of this site.",
        "Homework is a core part of the programme. Practice problems are set after each session, marked by Collins, and reviewed at the start of the next. The Resources section also has free formula sheets, study guides, and exam technique materials available to download now.",
      ],
    },

    // ── Age groups / levels ───────────────────────────────────────────────────
    {
      name: 'levels',
      triggers: ['gcse', 'a-level', 'a level', 'ib', 'university', 'undergraduate', 'year 10', 'year 11', 'year 12', 'year 13', 'age', 'student', 'children', 'adults', 'who do you teach', 'what level', 'sixth form'],
      responses: [
        "Collins primarily works with GCSE (Years 10–11) and A-Level / IB (Years 12–13) students, with a strong focus on A-Level and IB. University-level support is also available for students needing help with foundational Mathematics or Physics modules in their first year.",
        "The main focus is GCSE, A-Level, and IB across Mathematics, Physics, Chemistry, Computer Science, and Economics. First-year university students sometimes come for support with maths-heavy modules too. Is there a specific level you're enquiring about?",
        "Students range from Year 10 through to first-year university. The most common group is Sixth Form — Years 12 and 13 working toward A-Levels or the IB Diploma. Collins also works with motivated Year 10 and 11 students wanting to get ahead. What level are you at?",
      ],
    },

    // ── Results / testimonials ────────────────────────────────────────────────
    {
      name: 'results',
      triggers: ['results', 'grades', 'improvement', 'success', 'testimonial', 'review', 'student', 'outcome', 'does it work', 'evidence', 'track record', 'successful'],
      responses: [
        "94% of Collins's students achieve their target grade. The average grade improvement across all students is 2.3 grades. There are detailed case studies in the Student Results section of this page — real journeys with before/after evidence. Would you like to see them?",
        "The Results section of this site has detailed student case studies — including a student who went from Grade E to A in Chemistry in 12 weeks, and another from 4 to 7 in IB Physics in one term. These are real students, real timelines. Scroll down to the Results section to read them.",
        "Results speak clearly: over 500 students taught, 94% target grade achievement, average improvement of 2.3 grades. But numbers don't tell the full story — the Case Studies section shows the actual journeys in detail, including challenge, strategy, and outcome. Worth a read.",
      ],
    },

    // ── Exam preparation ──────────────────────────────────────────────────────
    {
      name: 'exams',
      triggers: ['exam', 'exams', 'test', 'mock', 'preparation', 'prepare', 'revision', 'a-level exam', 'ib exam', 'gcse exam', 'past paper', 'mark scheme', 'technique', 'under pressure', 'timed'],
      responses: [
        "Exam preparation is one of the most requested areas. Collins's approach covers three dimensions: content knowledge, question technique (how to read what a mark scheme is actually asking for), and timed practice under realistic conditions. The free Exam Technique Guide in Resources is a great starting point.",
        "Exam prep sessions are focused and structured: past papers under timed conditions, mark scheme analysis, and targeted work on the specific question types where marks are being dropped. Many students are surprised how much they improve simply by learning to read exam questions correctly.",
        "For exam preparation, Collins builds a specific programme based on the syllabus, likely question types, and the student's identified weak areas. Sessions include timed practice, mark scheme training, and model answers. The Exam Technique Guide in the Resources section is free to download too.",
      ],
    },

    // ── Teaching approach / methodology ──────────────────────────────────────
    {
      name: 'methodology',
      triggers: ['method', 'approach', 'how do you teach', 'teaching style', 'philosophy', 'different', 'unique', 'why choose', 'why Collins', 'what makes', 'your style'],
      responses: [
        "Collins's approach is built on six stages: Diagnose → Plan → Teach → Practice → Evaluate → Master. The first step is always understanding where the student actually is, not where they think they are. From there a personalised roadmap is built. The goal is always independent thinkers, not exam-passing machines.",
        "The core philosophy is: understanding before memorisation. Every concept is taught from first principles — why it works — before technique is introduced. This produces students who can handle unseen problems, not just ones they've practised. The Methodology section of this page explains the full approach.",
        "What makes the sessions different is the diagnostic-first approach. Before planning anything, Collins identifies exactly where understanding breaks down — often it's one specific conceptual gap that's causing cascading problems downstream. Fix that, and the rest often resolves quickly.",
      ],
    },

    // ── Contact ───────────────────────────────────────────────────────────────
    {
      name: 'contact',
      triggers: ['contact', 'email', 'message', 'reach', 'get in touch', 'speak', 'talk', 'call', 'enquire', 'enquiry', 'inquiry'],
      responses: [
        "The easiest way to get in touch is via the Contact section at the bottom of this page — either the booking form or the email link. Collins responds to all enquiries personally within 24 hours.",
        "You can reach Collins directly via the Contact section below, or use the booking form if you already know you'd like to start sessions. All messages are answered within 24 hours.",
        "Head to the Contact section at the bottom of the page. There's a direct email link and a booking form. Collins handles all enquiries personally — no automated responses at that end.",
      ],
    },

    // ── Free resources ────────────────────────────────────────────────────────
    {
      name: 'resources',
      triggers: ['free', 'resource', 'resources', 'download', 'formula', 'sheet', 'guide', 'study guide', 'formula sheet', 'notes', 'material', 'revision sheet'],
      responses: [
        "There are several free resources in the Resources section of this page: a Calculus Formula Sheet, Physics Equations Reference, Exam Technique Guide, Algebra Fundamentals sheet, Waves & Optics summary, and a Revision Timetable template. All free, no sign-up required. Scroll to Resources to grab them.",
        "The Resources section has free downloadable PDFs: formula sheets, study guides, an exam technique guide, and a revision timetable template. These are the same materials Collins uses with students in sessions. Completely free — no account needed.",
        "Free resources are available right now in the Resources section — formula sheets for Maths and Physics, an exam technique guide, a revision timetable, and more. Filter by subject or search for what you need. All PDFs, no sign-up.",
      ],
    },

    // ── Gratitude / positive acknowledgement ─────────────────────────────────
    {
      name: 'thanks',
      triggers: ['thank', 'thanks', 'thank you', 'cheers', 'appreciate', 'helpful', 'great', 'perfect', 'brilliant', 'awesome', 'amazing', 'excellent', 'wonderful'],
      responses: [
        "You're very welcome! If there's anything else you'd like to know — about subjects, sessions, or resources — just ask. And whenever you're ready to get started, the booking form is right on this page.",
        "Happy to help! Feel free to ask anything else. If you'd like to explore Collins's approach in more depth, the About and Methodology sections are worth a read.",
        "Glad that was useful. Any other questions, just fire away. When you're ready to book, it takes less than two minutes using the form below.",
      ],
    },

    // ── Farewell ──────────────────────────────────────────────────────────────
    {
      name: 'farewell',
      triggers: ['bye', 'goodbye', 'see you', 'take care', 'later', 'ciao', 'done', 'all good', 'no thanks', 'nothing else'],
      responses: [
        "Take care! If you think of any questions later, this chat is always here. Good luck with your studies.",
        "Goodbye! Hope to see you in a session soon. Best of luck with your work.",
        "See you around! The Resources section has plenty to explore in the meantime. Good luck!",
      ],
    },
  ];

  // ── Intent matching ────────────────────────────────────────────────────────
  // Normalise input, then score each intent by counting how many of its
  // trigger phrases appear in the message. Highest score wins.
  function detectIntent(text) {
    const t = text.toLowerCase().replace(/[^\w\s]/g, ' ');

    let bestIntent = null;
    let bestScore  = 0;

    for (const intent of INTENTS) {
      let score = 0;
      for (const trigger of intent.triggers) {
        if (t.includes(trigger)) score++;
      }
      if (score > bestScore) {
        bestScore  = score;
        bestIntent = intent;
      }
    }
    return bestScore > 0 ? bestIntent : null;
  }

  // Pick a response variant, avoiding immediate repetition
  const lastResponseIndex = {};
  function pickResponse(intent) {
    const pool = intent.responses;
    let idx;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (pool.length > 1 && idx === lastResponseIndex[intent.name]);
    lastResponseIndex[intent.name] = idx;
    return pool[idx];
  }

  // ── Context-aware fallback ─────────────────────────────────────────────────
  // If no intent is matched, use state to give a contextual reply rather
  // than a generic one.
  function buildFallback() {
    if (state.lastSubject) {
      const subjectNames = {
        mathematics: 'Mathematics', physics: 'Physics', chemistry: 'Chemistry',
        calculus: 'Calculus', cs: 'Computer Science', economics: 'Economics',
      };
      const name = subjectNames[state.lastSubject] || 'that subject';
      const fallbacks = [
        `I want to make sure I answer your question about ${name} properly. Could you rephrase or give me a bit more detail? I'm here to help.`,
        `Tell me more about what you're looking for with ${name} — I'll point you in the right direction.`,
        `Happy to help with ${name}. Could you be a little more specific? Are you asking about sessions, resources, or something else?`,
      ];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    const generic = [
      "I want to give you the right answer — could you rephrase that a little? I can help with subjects, booking, sessions, availability, resources, and more.",
      "I'm not quite sure I caught that. I can help with subjects (Maths, Physics, Chemistry, CS, Economics), booking sessions, availability, or free resources. What would you like to know?",
      "Could you try rephrasing that? I can answer questions about subjects, how sessions work, availability, pricing, results, or free resources.",
    ];
    return generic[Math.floor(Math.random() * generic.length)];
  }

  // ── Main response function ────────────────────────────────────────────────
  function getResponse(text) {
    state.messageCount++;
    const intent = detectIntent(text);

    if (!intent) return buildFallback();

    // Update conversation state
    const subjectIntents = ['mathematics', 'physics', 'chemistry', 'calculus', 'cs', 'economics'];
    if (subjectIntents.includes(intent.name)) state.lastSubject = intent.name;
    state.lastIntent = intent.name;

    return pickResponse(intent);
  }

  // ── Typing indicator ───────────────────────────────────────────────────────
  function showTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'ai-message ai-message--bot ai-typing';
    div.id = 'ai-typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTypingIndicator() {
    document.getElementById('ai-typing-indicator')?.remove();
  }

  // ── Add message ────────────────────────────────────────────────────────────
  function addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `ai-message ai-message--${isUser ? 'user' : 'bot'}`;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Send message ───────────────────────────────────────────────────────────
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, true);
    input.value = '';

    // Realistic typing delay: longer responses feel more considered
    showTypingIndicator();
    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      removeTypingIndicator();
      addMessage(getResponse(text));
    }, delay);
  }

  // ── Event listeners ────────────────────────────────────────────────────────
  btn?.addEventListener('click',   () => panel.classList.toggle('open'));
  close?.addEventListener('click', () => panel.classList.remove('open'));
  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAGNETIC BUTTONS
// ══════════════════════════════════════════════════════════════════════════════
export function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.35;
      const dy   = (e.clientY - cy) * 0.35;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  TILT CARDS (cards that lean toward the cursor)
// ══════════════════════════════════════════════════════════════════════════════
export function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = ((e.clientY - cy) / (rect.height / 2)) * 6;  // deg
      const ry   = ((e.clientX - cx) / (rect.width  / 2)) * -6;
      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        scale: 1.02,
        duration: 0.35,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.55,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  FOOTER SPARK
// ══════════════════════════════════════════════════════════════════════════════
export function initFooterSpark() {
  const spark = document.getElementById('footer-spark');
  if (!spark) return;

  spark.addEventListener('click', e => {
    const rect = spark.getBoundingClientRect();
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'spark-particle';
      const angle = (i / 16) * Math.PI * 2;
      const dist  = 40 + Math.random() * 40;
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      p.style.left = (rect.left + rect.width  / 2) + 'px';
      p.style.top  = (rect.top  + rect.height / 2) + 'px';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION ENTRANCE — scale+fade sections as camera storytelling
// ══════════════════════════════════════════════════════════════════════════════
export function initSectionEntrance() {
  gsap.utils.toArray('.section').forEach(section => {
    gsap.fromTo(section.querySelectorAll('h2, .section-label, .section-sub'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });
}
