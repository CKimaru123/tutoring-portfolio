import { gsap } from 'gsap';

// ══════════════════════════════════════════════════════════════════════════════
//  BOOK CONTENT — 6 pages per project, displayed as 3 two-page spreads
// ══════════════════════════════════════════════════════════════════════════════
const BOOKS = {

  calculus: {
    title:    'Calculus Mastery',
    subtitle: 'INTERACTIVE CURRICULUM',
    icon:     '∫',
    spreads: [
      // Spread 1 — Cover + Overview
      {
        left: `<div class="fp-cover">
          <div class="fp-cover-icon">∫</div>
          <div class="fp-cover-rule"></div>
          <p class="fp-cover-type">Interactive Curriculum</p>
          <h2 class="fp-cover-title">Calculus Mastery</h2>
          <p style="font-size:0.72rem;color:rgba(255,255,255,0.35);margin-top:0.8rem">Alex Morgan · A-Level &amp; IB Mathematics</p>
        </div>`,
        right: `<p class="fp-page-num fp-page-num--right">1</p>
          <h2 class="fp-h1">Overview</h2>
          <p class="fp-p">This curriculum was developed over three years of intensive A-Level and IB teaching. It builds calculus from the ground up — starting with the intuition of limits, not the mechanics of rules.</p>
          <p class="fp-p">Used by over 1,200 students across five countries, with a 94% first-attempt pass rate at A or A*.</p>
          <h2 class="fp-h2">Who it's for</h2>
          <ul class="fp-ul">
            <li>A-Level Mathematics (Edexcel, AQA, OCR)</li>
            <li>IB Mathematics HL and SL</li>
            <li>Students transitioning to university analysis</li>
            <li>Confident GCSE students wanting a head start</li>
          </ul>
          <div class="fp-stat"><span class="fp-stat-num">1,200+</span><span class="fp-stat-label">Students who have used this curriculum</span></div>`,
      },
      // Spread 2 — Curriculum Structure
      {
        left: `<p class="fp-page-num fp-page-num--left">2</p>
          <h2 class="fp-h1">Curriculum Structure</h2>
          <h2 class="fp-h2">Module 1 — Limits &amp; Continuity</h2>
          <p class="fp-p">What does it mean to approach a value? Epsilon-delta intuition without formal analysis. Continuity and the Intermediate Value Theorem.</p>
          <h2 class="fp-h2">Module 2 — Differentiation from First Principles</h2>
          <p class="fp-p">The derivative as a limit of a difference quotient. Why the rules work, not just how to use them.</p>
          <h2 class="fp-h2">Module 3 — Techniques of Differentiation</h2>
          <p class="fp-p">Product, quotient, and chain rules with geometric interpretation. Implicit differentiation and parametric curves.</p>`,
        right: `<p class="fp-page-num fp-page-num--right">3</p>
          <h2 class="fp-h1">Curriculum Structure (cont.)</h2>
          <h2 class="fp-h2">Module 4 — Integration</h2>
          <p class="fp-p">Riemann sums and the definite integral. The Fundamental Theorem of Calculus as the bridge between differentiation and area.</p>
          <h2 class="fp-h2">Module 5 — Techniques of Integration</h2>
          <p class="fp-p">Substitution, integration by parts, partial fractions, and trigonometric methods.</p>
          <h2 class="fp-h2">Module 6 — Applications</h2>
          <p class="fp-p">Optimisation, related rates, area between curves, volumes of revolution, and differential equations.</p>
          <div class="fp-quote">"By the end of Module 3, students consistently report that calculus no longer feels like memorising rules — it feels like reading a language."</div>`,
      },
      // Spread 3 — Pedagogy + Results
      {
        left: `<p class="fp-page-num fp-page-num--left">4</p>
          <h2 class="fp-h1">Pedagogical Approach</h2>
          <p class="fp-p">Every concept is introduced in three phases:</p>
          <ul class="fp-ul">
            <li><strong>Intuition</strong> — A visual or physical example before any algebra</li>
            <li><strong>Formalisation</strong> — The mathematical definition, precisely stated</li>
            <li><strong>Application</strong> — Exam-style problems, progressively harder</li>
          </ul>
          <p class="fp-p">Students are never asked to apply a result they haven't yet understood.</p>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">6</span><span class="fp-stat-label">Core modules</span></div>
            <div class="fp-stat"><span class="fp-stat-num">48</span><span class="fp-stat-label">Lesson plans</span></div>
          </div>`,
        right: `<p class="fp-page-num fp-page-num--right">5</p>
          <h2 class="fp-h1">Student Results</h2>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">94%</span><span class="fp-stat-label">Achieved A or A*</span></div>
            <div class="fp-stat"><span class="fp-stat-num">+2.1</span><span class="fp-stat-label">Avg grade improvement</span></div>
          </div>
          <div class="fp-quote">"I failed my Year 12 mock. After 8 sessions using this curriculum, I got an A in the final exam." — S.K., Edexcel A-Level</div>
          <h2 class="fp-h2">Topics covered</h2>
          <div>
            <span class="fp-tag">Limits</span><span class="fp-tag">Derivatives</span><span class="fp-tag">Chain Rule</span>
            <span class="fp-tag">Integration</span><span class="fp-tag">FTC</span><span class="fp-tag">ODEs</span>
            <span class="fp-tag">Optimisation</span><span class="fp-tag">Volumes</span>
          </div>`,
      },
    ],
  },

  physics: {
    title:    'Physics Fundamentals',
    subtitle: 'STUDENT LEARNING PROGRAM',
    icon:     '⚛',
    spreads: [
      {
        left: `<div class="fp-cover">
          <div class="fp-cover-icon">⚛</div>
          <div class="fp-cover-rule"></div>
          <p class="fp-cover-type">Student Learning Program</p>
          <h2 class="fp-cover-title">Physics Fundamentals</h2>
          <p style="font-size:0.72rem;color:rgba(255,255,255,0.35);margin-top:0.8rem">Alex Morgan · A-Level &amp; IB Physics</p>
        </div>`,
        right: `<p class="fp-page-num fp-page-num--right">1</p>
          <h2 class="fp-h1">Overview</h2>
          <p class="fp-p">This program was created after observing a consistent pattern: students who struggle with A-Level Physics are almost always struggling with the mathematics underneath it, not the physics itself.</p>
          <p class="fp-p">Physics Fundamentals addresses both simultaneously — building physical intuition and mathematical fluency side by side.</p>
          <h2 class="fp-h2">Scope</h2>
          <ul class="fp-ul">
            <li>A-Level Physics (Edexcel, AQA, OCR, Cambridge)</li>
            <li>IB Physics Standard and Higher Level</li>
            <li>Pre-university Physics bridging</li>
          </ul>
          <div class="fp-stat"><span class="fp-stat-num">400+</span><span class="fp-stat-label">Students on this programme</span></div>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">2</p>
          <h2 class="fp-h1">Programme Units</h2>
          <h2 class="fp-h2">Unit 1 — Mechanics</h2>
          <p class="fp-p">Kinematics, Newton's laws, momentum, energy, and circular motion. Vector analysis introduced through physical context.</p>
          <h2 class="fp-h2">Unit 2 — Waves &amp; Optics</h2>
          <p class="fp-p">Progressive and stationary waves, superposition, interference, and diffraction. Ray optics and wave optics unified through Huygens' principle.</p>
          <h2 class="fp-h2">Unit 3 — Electricity &amp; Magnetism</h2>
          <p class="fp-p">Circuit analysis, field theory, electromagnetic induction, and AC circuits.</p>`,
        right: `<p class="fp-page-num fp-page-num--right">3</p>
          <h2 class="fp-h1">Programme Units (cont.)</h2>
          <h2 class="fp-h2">Unit 4 — Thermal Physics</h2>
          <p class="fp-p">Temperature, heat, ideal gas laws, kinetic theory, and the laws of thermodynamics.</p>
          <h2 class="fp-h2">Unit 5 — Nuclear &amp; Quantum</h2>
          <p class="fp-p">Radioactive decay, nuclear reactions, photoelectric effect, wave-particle duality, and the de Broglie hypothesis.</p>
          <h2 class="fp-h2">Unit 6 — Exam Mastery</h2>
          <p class="fp-p">Data analysis, error treatment, extended writing questions, and past-paper strategy.</p>
          <div class="fp-quote">"Physics makes sense when you understand why — not just how."</div>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">4</p>
          <h2 class="fp-h1">The Dual-Track Method</h2>
          <p class="fp-p">Every lesson runs two parallel tracks:</p>
          <ul class="fp-ul">
            <li><strong>Physical track</strong> — what is actually happening in nature</li>
            <li><strong>Mathematical track</strong> — how we quantify and predict it</li>
          </ul>
          <p class="fp-p">The two tracks are woven together so every equation has a physical story and every physical idea has a mathematical representation.</p>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">6</span><span class="fp-stat-label">Programme units</span></div>
            <div class="fp-stat"><span class="fp-stat-num">52</span><span class="fp-stat-label">Worked examples</span></div>
          </div>`,
        right: `<p class="fp-page-num fp-page-num--right">5</p>
          <h2 class="fp-h1">Outcomes &amp; Evidence</h2>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">91%</span><span class="fp-stat-label">Achieved target grade</span></div>
            <div class="fp-stat"><span class="fp-stat-num">+2.4</span><span class="fp-stat-label">Avg grade improvement</span></div>
          </div>
          <div class="fp-quote">"I went from a 4 to a 7 in IB Physics HL in one term. The dual-track method is the reason." — J.P., IB HL</div>
          <h2 class="fp-h2">Topics covered</h2>
          <div>
            <span class="fp-tag">Mechanics</span><span class="fp-tag">Waves</span><span class="fp-tag">Fields</span>
            <span class="fp-tag">Electricity</span><span class="fp-tag">Quantum</span><span class="fp-tag">Nuclear</span>
            <span class="fp-tag">Thermal</span><span class="fp-tag">Optics</span>
          </div>`,
      },
    ],
  },

  exam: {
    title:    'Exam Preparation System',
    subtitle: 'FRAMEWORK & RESOURCE PACK',
    icon:     '✎',
    spreads: [
      {
        left: `<div class="fp-cover">
          <div class="fp-cover-icon">✎</div>
          <div class="fp-cover-rule"></div>
          <p class="fp-cover-type">Framework &amp; Resource Pack</p>
          <h2 class="fp-cover-title">Exam Preparation System</h2>
          <p style="font-size:0.72rem;color:rgba(255,255,255,0.35);margin-top:0.8rem">Alex Morgan · All Subjects &amp; Levels</p>
        </div>`,
        right: `<p class="fp-page-num fp-page-num--right">1</p>
          <h2 class="fp-h1">The Problem with Exam Prep</h2>
          <p class="fp-p">Most students prepare for exams by rereading notes and doing random practice questions. This is one of the least effective revision strategies known to educational psychology.</p>
          <p class="fp-p">This system was built around the evidence: spaced repetition, interleaved practice, retrieval under time pressure, and mark-scheme literacy are the four drivers of exam performance.</p>
          <h2 class="fp-h2">Works with</h2>
          <ul class="fp-ul">
            <li>A-Level (all boards: Edexcel, AQA, OCR, Cambridge)</li>
            <li>IB Diploma (HL and SL)</li>
            <li>GCSE (all major boards)</li>
            <li>SAT / ACT Mathematics</li>
          </ul>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">2</p>
          <h2 class="fp-h1">The Four Pillars</h2>
          <h2 class="fp-h2">Pillar 1 — Diagnostic</h2>
          <p class="fp-p">Before any revision begins, a diagnostic past paper identifies exactly which topics lose marks. Revision is targeted, not broad.</p>
          <h2 class="fp-h2">Pillar 2 — Spaced Repetition</h2>
          <p class="fp-p">A personalised 8-week timetable uses spaced intervals to schedule topic revisits at the optimal forgetting curve point.</p>
          <h2 class="fp-h2">Pillar 3 — Retrieval Practice</h2>
          <p class="fp-p">Every session ends with closed-book retrieval, not open-book review. Students who retrieve outperform those who reread by a significant margin.</p>`,
        right: `<p class="fp-page-num fp-page-num--right">3</p>
          <h2 class="fp-h1">The Four Pillars (cont.)</h2>
          <h2 class="fp-h2">Pillar 4 — Mark Scheme Literacy</h2>
          <p class="fp-p">Examiners reward specific words, phrases, and structures. Students are trained to read mark schemes as a language, then write answers that satisfy that language.</p>
          <p class="fp-p">A single session on mark-scheme literacy typically improves a student's extended-answer score by 15–25%.</p>
          <div class="fp-quote">"I always knew the material. I just didn't know how to write it in a way that got marks." — M.T., A-Level Biology</div>
          <h2 class="fp-h2">Resource Pack Contents</h2>
          <ul class="fp-ul">
            <li>8-week spaced revision timetable template</li>
            <li>Mark scheme annotation framework</li>
            <li>Retrieval practice question banks</li>
            <li>Extended writing structure guides</li>
          </ul>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">4</p>
          <h2 class="fp-h1">Full Resource List</h2>
          <ul class="fp-ul">
            <li>Diagnostic past paper selection guide (by board)</li>
            <li>Timed practice session protocols</li>
            <li>Extended writing guides (6-mark, 9-mark)</li>
            <li>Common examiner comments &amp; how to avoid them</li>
            <li>Stress and performance management strategies</li>
          </ul>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">8</span><span class="fp-stat-label">Week revision schedule</span></div>
            <div class="fp-stat"><span class="fp-stat-num">200+</span><span class="fp-stat-label">Practice questions</span></div>
          </div>`,
        right: `<p class="fp-page-num fp-page-num--right">5</p>
          <h2 class="fp-h1">Evidence &amp; Results</h2>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">+1.8</span><span class="fp-stat-label">Avg grade improvement</span></div>
            <div class="fp-stat"><span class="fp-stat-num">96%</span><span class="fp-stat-label">Met or exceeded target</span></div>
          </div>
          <div class="fp-quote">"The timetable and the mark scheme training are worth more than three months of random revision." — A.O., IB SL Chemistry</div>
          <div>
            <span class="fp-tag">A-Level</span><span class="fp-tag">IB</span><span class="fp-tag">GCSE</span>
            <span class="fp-tag">Retrieval</span><span class="fp-tag">Spaced Rep</span><span class="fp-tag">Mark Schemes</span>
          </div>`,
      },
    ],
  },

  organic: {
    title:    'Organic Chemistry Framework',
    subtitle: 'VISUAL STUDY GUIDE',
    icon:     '⬡',
    spreads: [
      {
        left: `<div class="fp-cover">
          <div class="fp-cover-icon">⬡</div>
          <div class="fp-cover-rule"></div>
          <p class="fp-cover-type">Visual Study Guide</p>
          <h2 class="fp-cover-title">Organic Chemistry Framework</h2>
          <p style="font-size:0.72rem;color:rgba(255,255,255,0.35);margin-top:0.8rem">Alex Morgan · A-Level &amp; IB Chemistry</p>
        </div>`,
        right: `<p class="fp-page-num fp-page-num--right">1</p>
          <h2 class="fp-h1">Why Organic Chemistry Feels Impossible</h2>
          <p class="fp-p">Students who struggle with organic chemistry are almost always trying to memorise reactions as isolated facts. There are hundreds of them. Memorisation fails.</p>
          <p class="fp-p">This framework teaches organic chemistry as a <em>language</em>. Once you understand electron movement — nucleophiles, electrophiles, and arrow-pushing — every reaction becomes predictable rather than arbitrary.</p>
          <div class="fp-stat"><span class="fp-stat-num">40%</span><span class="fp-stat-label">Average mark improvement in organic chemistry after using this framework</span></div>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">2</p>
          <h2 class="fp-h1">The Electron Logic Framework</h2>
          <h2 class="fp-h2">Level 1 — Functional Groups</h2>
          <p class="fp-p">Master the 12 core functional groups and their characteristic reactions before anything else.</p>
          <h2 class="fp-h2">Level 2 — Electron Movement</h2>
          <p class="fp-p">All organic reactions involve electrons moving from electron-rich centres to electron-poor centres. Arrow-pushing notation makes this visible.</p>
          <h2 class="fp-h2">Level 3 — Mechanism Families</h2>
          <p class="fp-p">Reactions fall into families: nucleophilic substitution (SN1/SN2), electrophilic addition, EAS, and elimination.</p>`,
        right: `<p class="fp-page-num fp-page-num--right">3</p>
          <h2 class="fp-h1">Mechanism Maps</h2>
          <p class="fp-p">Visual flowcharts that connect functional groups to reactions to products, showing the electron logic at each step. Students can:</p>
          <ul class="fp-ul">
            <li>Predict unfamiliar reactions from first principles</li>
            <li>Navigate multi-step synthesis questions</li>
            <li>Identify the reagents needed for a transformation</li>
            <li>Understand why stereochemistry follows from mechanism</li>
          </ul>
          <div class="fp-quote">"I went from failing every organic question to getting full marks on the mechanisms paper." — M.R., A-Level Chemistry</div>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">4</p>
          <h2 class="fp-h1">Topics Covered</h2>
          <ul class="fp-ul">
            <li>Alkanes, alkenes, alkynes — addition and substitution</li>
            <li>Halogenoalkanes — SN1 and SN2 mechanisms</li>
            <li>Alcohols and ethers</li>
            <li>Carbonyl compounds — aldehydes, ketones, carboxylic acids</li>
            <li>Amines and amides</li>
            <li>Aromatic chemistry — EAS and directing effects</li>
            <li>Stereochemistry — chirality and E/Z isomerism</li>
            <li>Multi-step synthesis planning</li>
          </ul>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">8</span><span class="fp-stat-label">Mechanism families</span></div>
            <div class="fp-stat"><span class="fp-stat-num">60+</span><span class="fp-stat-label">Worked mechanisms</span></div>
          </div>`,
        right: `<p class="fp-page-num fp-page-num--right">5</p>
          <h2 class="fp-h1">Student Evidence</h2>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">40%</span><span class="fp-stat-label">Mark improvement (organic section)</span></div>
            <div class="fp-stat"><span class="fp-stat-num">3 wks</span><span class="fp-stat-label">Typical time to see improvement</span></div>
          </div>
          <div class="fp-quote">"Organic chemistry was the reason I was going to drop Chemistry. Three weeks with this framework and it became my strongest topic." — F.A., IB HL</div>
          <div>
            <span class="fp-tag">Mechanisms</span><span class="fp-tag">Nucleophiles</span><span class="fp-tag">SN1/SN2</span>
            <span class="fp-tag">Carbonyl</span><span class="fp-tag">Aromatic</span><span class="fp-tag">Synthesis</span>
          </div>`,
      },
    ],
  },

  thinking: {
    title:    'Critical Thinking in STEM',
    subtitle: 'METHODOLOGY PAPER',
    icon:     '◈',
    spreads: [
      {
        left: `<div class="fp-cover">
          <div class="fp-cover-icon">◈</div>
          <div class="fp-cover-rule"></div>
          <p class="fp-cover-type">Methodology Paper</p>
          <h2 class="fp-cover-title">Critical Thinking in STEM</h2>
          <p style="font-size:0.72rem;color:rgba(255,255,255,0.35);margin-top:0.8rem">Alex Morgan · Teaching Methodology</p>
        </div>`,
        right: `<p class="fp-page-num fp-page-num--right">1</p>
          <h2 class="fp-h1">Abstract</h2>
          <p class="fp-p">This paper argues that the dominant mode of STEM education — rule transmission and procedural practice — systematically undermines the development of genuine reasoning ability in students.</p>
          <p class="fp-p">Drawing on cognitive science, epistemology, and eight years of tutoring practice, it proposes a framework that treats argument construction as the primary output, and calculation as a means to that end.</p>
          <div class="fp-quote">"A student who can only solve problems they have been shown is not educated. They are trained." — Opening premise</div>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">2</p>
          <h2 class="fp-h1">The Argument</h2>
          <h2 class="fp-h2">The transmission model</h2>
          <p class="fp-p">Most STEM teaching transmits knowledge: facts, definitions, procedures. Students who receive and recall this knowledge are rewarded. Those who question it are often penalised for inefficiency.</p>
          <h2 class="fp-h2">The problem</h2>
          <p class="fp-p">Transmitted knowledge does not transfer. A student who memorised the quadratic formula cannot derive it, adapt it to novel contexts, or identify when it is the wrong tool.</p>
          <h2 class="fp-h2">The alternative</h2>
          <p class="fp-p">Argument-first teaching: before showing any result, ask students to conjecture it. The answer may be wrong — but the thinking is irreplaceable.</p>`,
        right: `<p class="fp-page-num fp-page-num--right">3</p>
          <h2 class="fp-h1">Framework for Practice</h2>
          <p class="fp-p">Six instructional moves that develop critical reasoning alongside content knowledge:</p>
          <ul class="fp-ul">
            <li><strong>Conjecture before instruction</strong> — ask students to predict before revealing</li>
            <li><strong>Justify, not just answer</strong> — "Why?" is required for every result</li>
            <li><strong>Counter-example hunting</strong> — under what conditions does this break?</li>
            <li><strong>Proof by contradiction</strong> — introduced early as a reasoning structure</li>
            <li><strong>Multiple representations</strong> — algebraic, graphical, and narrative forms</li>
            <li><strong>Meta-cognitive reflection</strong> — "What did you learn about how you think?"</li>
          </ul>`,
      },
      {
        left: `<p class="fp-page-num fp-page-num--left">4</p>
          <h2 class="fp-h1">Evidence from Practice</h2>
          <p class="fp-p">Over three academic years, students taught with argument-first methods were compared to matched peers on the same syllabus.</p>
          <div class="fp-grid-2">
            <div class="fp-stat"><span class="fp-stat-num">+0.8</span><span class="fp-stat-label">Extra grade points on unseen problems</span></div>
            <div class="fp-stat"><span class="fp-stat-num">3×</span><span class="fp-stat-label">More likely to self-correct errors</span></div>
          </div>
          <p class="fp-p" style="margin-top:0.8rem">The greatest difference appeared on novel exam questions — those requiring argument construction rather than procedure recall.</p>`,
        right: `<p class="fp-page-num fp-page-num--right">5</p>
          <h2 class="fp-h1">Conclusions</h2>
          <p class="fp-p">Critical thinking in STEM is not a separate subject to be taught alongside mathematics and science. It is the mode of engagement with those subjects.</p>
          <p class="fp-p">The paper concludes with a call to shift the primary output of STEM education from <em>correct procedures</em> to <em>defensible arguments</em>.</p>
          <div class="fp-quote">"The student who can argue why an answer is correct is more educated — and more employable — than one who can only produce it."</div>
          <div>
            <span class="fp-tag">Pedagogy</span><span class="fp-tag">Reasoning</span><span class="fp-tag">Argumentation</span>
            <span class="fp-tag">Metacognition</span><span class="fp-tag">STEM</span><span class="fp-tag">Critical Thinking</span>
          </div>`,
      },
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════════════
//  ENGINE — portal-based CSS 3D flip
//
//  Why portal?  The CSS 3D card flip requires transform-style:preserve-3d on
//  the flipping element.  Any ancestor with overflow:hidden, opacity, filter,
//  or will-change silently flattens the 3D context and breaks backface-
//  visibility.  By appending the flipping leaf directly to document.body
//  (a "portal") it has no such ancestors — the flip is always crisp.
//
//  Flow:
//    1. Scene shows two static page divs (left + right).
//    2. On flip, measure the scene's bounding rect.
//    3. Create a portal div on body, position:fixed, matching that rect.
//    4. Inside the portal: a 3D leaf that covers the right (or left) half.
//    5. GSAP tweens rotateY  0→-180 (forward) or -180→0 (backward).
//    6. On complete: remove portal, update static pages, done.
// ══════════════════════════════════════════════════════════════════════════════
export function initFlipbook() {

  // ── DOM refs ────────────────────────────────────────────────────────────────
  const overlay    = document.getElementById('flipbook-overlay');
  const closeBtn   = document.getElementById('flipbook-close');
  const prevBtn    = document.getElementById('flipbook-prev');
  const nextBtn    = document.getElementById('flipbook-next');
  const counter    = document.getElementById('flipbook-counter');
  const titleEl    = document.getElementById('flipbook-title');
  const subtitleEl = document.getElementById('flipbook-subtitle');
  const scene      = document.getElementById('flipbook-scene');

  // ── State ────────────────────────────────────────────────────────────────────
  let currentBook = null;
  let spreadIndex = 0;
  let isAnimating = false;

  // ── Static page elements built once into the scene ───────────────────────────
  let leftPage  = null;   // .flipbook-page--left  > .flipbook-page-inner
  let rightPage = null;   // .flipbook-page--right > .flipbook-page-inner

  function buildScene() {
    scene.innerHTML = '';

    // Crease
    const crease = document.createElement('div');
    crease.className = 'flipbook-spine-crease';
    scene.appendChild(crease);

    // Left static page
    const lWrap = document.createElement('div');
    lWrap.className = 'flipbook-page flipbook-page--left';
    leftPage = document.createElement('div');
    leftPage.className = 'flipbook-page-inner';
    lWrap.appendChild(leftPage);
    scene.appendChild(lWrap);

    // Right static page
    const rWrap = document.createElement('div');
    rWrap.className = 'flipbook-page flipbook-page--right';
    rightPage = document.createElement('div');
    rightPage.className = 'flipbook-page-inner';
    rWrap.appendChild(rightPage);
    scene.appendChild(rWrap);
  }

  // ── Spread data ───────────────────────────────────────────────────────────────
  function getSpread(book, si) {
    return book.spreads[si] ?? { left: '', right: '' };
  }

  function renderSpread(book, si) {
    const s = getSpread(book, si);
    leftPage.innerHTML  = s.left;
    rightPage.innerHTML = s.right;
    updateControls(si);
  }

  function updateControls(si) {
    prevBtn.disabled = si <= 0;
    nextBtn.disabled = si >= (currentBook?.spreads.length ?? 1) - 1;
    const labels = ['Cover & Overview', 'Pages 2 — 3', 'Pages 4 — 5'];
    counter.textContent = labels[si] ?? `Spread ${si + 1}`;
  }

  // ── Portal-based 3D flip ──────────────────────────────────────────────────────
  //
  //  The portal is appended to document.body so it has NO ancestor with
  //  overflow:hidden — the only thing that was killing 3D context before.
  //
  function animateFlip(direction, onComplete) {
    // Measure scene position in viewport
    const rect   = scene.getBoundingClientRect();
    const sceneW = rect.width;
    const sceneH = rect.height;
    const halfW  = sceneW / 2;

    // Portal root — covers the full scene, fixed to viewport
    const portal = document.createElement('div');
    portal.style.cssText = `
      position: fixed;
      top:    ${rect.top}px;
      left:   ${rect.left}px;
      width:  ${sceneW}px;
      height: ${sceneH}px;
      pointer-events: none;
      z-index: 9999;
      perspective: ${sceneW * 2}px;
    `;
    document.body.appendChild(portal);

    // The leaf covers exactly one half of the scene (the turning page)
    const leaf = document.createElement('div');
    leaf.style.cssText = `
      position: absolute;
      top:    0;
      width:  ${halfW}px;
      height: 100%;
      transform-style: preserve-3d;
      transform-origin: ${direction === 1 ? 'left' : 'right'} center;
    `;

    // Forward flip: leaf starts on right half, folds left
    // Backward flip: leaf starts on left half, unfolds right
    if (direction === 1) {
      leaf.style.left = `${halfW}px`;
    } else {
      leaf.style.left = '0px';
    }
    portal.appendChild(leaf);

    // Front face of the leaf (page being turned away)
    const front = document.createElement('div');
    front.style.cssText = `
      position: absolute; inset: 0;
      background: #faf8f4;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      padding: 1.8rem;
      font-family: 'Inter', sans-serif;
      font-size: 0.82rem;
      color: #1a1a2a;
      line-height: 1.7;
      overflow: hidden;
      box-shadow: ${direction === 1
        ? '-4px 0 20px rgba(0,0,0,0.25)'
        : '4px 0 20px rgba(0,0,0,0.25)'};
    `;

    // Back face (page being revealed)
    const back = document.createElement('div');
    back.style.cssText = `
      position: absolute; inset: 0;
      background: #faf8f4;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform: rotateY(180deg);
      padding: 1.8rem;
      font-family: 'Inter', sans-serif;
      font-size: 0.82rem;
      color: #1a1a2a;
      line-height: 1.7;
      overflow: hidden;
      box-shadow: ${direction === 1
        ? '4px 0 20px rgba(0,0,0,0.25)'
        : '-4px 0 20px rgba(0,0,0,0.25)'};
    `;

    // Populate faces with the correct page content
    if (direction === 1) {
      // Forward: front shows current right page, back shows next left page
      front.innerHTML = rightPage.innerHTML;
      const nextSpread = getSpread(currentBook, spreadIndex + 1);
      back.innerHTML  = nextSpread.left;
    } else {
      // Backward: front shows current left page, back shows prev right page
      front.innerHTML = leftPage.innerHTML;
      const prevSpread = getSpread(currentBook, spreadIndex - 1);
      back.innerHTML  = prevSpread.right;
    }

    leaf.appendChild(front);
    leaf.appendChild(back);

    // Pre-load the static pages that will show underneath during the flip
    if (direction === 1) {
      // Underneath: left stays, right already shows next right
      const nextSpread = getSpread(currentBook, spreadIndex + 1);
      rightPage.innerHTML = nextSpread.right;
    } else {
      // Underneath: right stays, left already shows prev left
      const prevSpread = getSpread(currentBook, spreadIndex - 1);
      leftPage.innerHTML = prevSpread.left;
    }

    // Animate
    const startAngle = direction === 1 ?    0 : -180;
    const endAngle   = direction === 1 ? -180 :    0;

    gsap.fromTo(leaf,
      { rotateY: startAngle },
      {
        rotateY:  endAngle,
        duration: 0.7,
        ease:     'power2.inOut',
        onComplete() {
          // Remove portal — static pages already show the right content
          document.body.removeChild(portal);
          onComplete();
        },
      }
    );
  }

  // ── Flip forward ─────────────────────────────────────────────────────────────
  function flipForward() {
    if (isAnimating || !currentBook) return;
    if (spreadIndex >= currentBook.spreads.length - 1) return;
    isAnimating = true;

    animateFlip(1, () => {
      spreadIndex++;
      // Static pages: left was already loaded; load right too
      const s = getSpread(currentBook, spreadIndex);
      leftPage.innerHTML = s.left;
      // rightPage.innerHTML was pre-loaded in animateFlip
      updateControls(spreadIndex);
      isAnimating = false;
    });
  }

  // ── Flip backward ─────────────────────────────────────────────────────────────
  function flipBackward() {
    if (isAnimating || !currentBook) return;
    if (spreadIndex <= 0) return;
    isAnimating = true;

    animateFlip(-1, () => {
      spreadIndex--;
      // Static pages: right was already loaded; load left too
      const s = getSpread(currentBook, spreadIndex);
      rightPage.innerHTML = s.right;
      // leftPage.innerHTML was pre-loaded in animateFlip
      updateControls(spreadIndex);
      isAnimating = false;
    });
  }

  // ── Open / close ─────────────────────────────────────────────────────────────
  function openBook(key) {
    const book = BOOKS[key];
    if (!book) return;
    currentBook = book;
    spreadIndex = 0;
    isAnimating = false;

    titleEl.textContent    = book.title;
    subtitleEl.textContent = book.subtitle;

    buildScene();
    renderSpread(book, 0);

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBook() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    isAnimating = false;
    // Clean up any orphaned portal in case close was mid-animation
    document.querySelectorAll('[data-flipportal]').forEach(p => p.remove());
  }

  // ── Events ────────────────────────────────────────────────────────────────────
  closeBtn?.addEventListener('click', closeBook);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeBook(); });
  prevBtn?.addEventListener('click', flipBackward);
  nextBtn?.addEventListener('click', flipForward);

  document.addEventListener('keydown', e => {
    if (!overlay?.classList.contains('open')) return;
    if (e.key === 'Escape')     closeBook();
    if (e.key === 'ArrowRight') flipForward();
    if (e.key === 'ArrowLeft')  flipBackward();
  });

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const key = btn.dataset.project;
      if (key) openBook(key);
    });
  });
}

