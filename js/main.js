/* =========================================================
   Khalid Baker – Portfolio interacties & animaties
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* genegeerd */ }
    },
  };

  /* ---------------------------------------------------------
     Vertalingen (Nederlands staat in de HTML, Engels hieronder)
     --------------------------------------------------------- */
  const EN = {
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cv': 'View CV',

    'hero.status': 'Currently interning at Competa IT',
    'hero.hello': "Hi, I'm",
    'hero.build': 'I build',
    'hero.subtitle': 'Software developer in training (MBO level 4) at ROC Mondriaan and intern at Competa IT. From front-end to back-end, with Laravel, TypeScript, Prisma and PostgreSQL.',
    'hero.cta1': 'View my work',
    'hero.cta2': 'My CV',
    'hero.caption': "that's me! :)",
    'hero.spin': 'OPEN TO OPPORTUNITIES ✦ INTERN @ COMPETA IT ✦',
    'hero.stickerNew': 'New:',

    'bands.text': 'Motivated ✺ Always on time ✺ Eager to learn ✺ Team player ✺ Structured ✺ ',

    'about.title1': 'About',
    'about.title2': 'me',
    'about.lead': "I'm Khalid: a motivated and positive developer in training, originally from Kurdistan.",
    'about.p1': 'What started as a fascination with games grew into a passion for building complete web applications. At school I work with PHP, Symfony, Next.js and Tailwind CSS, developing both front-end and back-end.',
    'about.p2': "Right now I'm diving into <strong>Laravel</strong>, <strong>TypeScript</strong>, <strong>Prisma</strong>, <strong>PostgreSQL</strong> and <strong>Postman</strong>. I work in a structured way, I'm always on time and I finish what I start.",

    'bento.now': 'Now',
    'bento.nowTitle': 'Intern at Competa IT',
    'bento.nowText': 'Working within a professional development team.',
    'bento.learning': 'Currently learning',
    'bento.dreamTitle': 'My dream',
    'bento.dreamText': 'One day releasing my own successful game.',
    'bento.langs': 'Languages',
    'bento.workTitle': 'Also working',
    'bento.workText': 'At New York Pizza since July.',
    'stats.projects': 'projects built',
    'stats.tech': 'tools & technologies',

    'exp.title1': 'My',
    'exp.title2': 'journey',
    'exp.now': 'present',
    'exp.current': 'Now',
    'exp.jul': 'Jul',
    'exp.feb': 'Feb',
    'exp.dec': 'Dec',
    'exp.education': 'Education',
    'exp.competa.role': 'Software Development Intern',
    'exp.competa.b1': 'Contributing to software projects within a professional development team',
    'exp.competa.b2': 'Building with TypeScript, Prisma and PostgreSQL',
    'exp.competa.b3': 'Testing APIs with Postman',
    'exp.nyp.role': 'Team member',
    'exp.nyp.b1': 'Handling orders quickly and accurately',
    'exp.nyp.b2': 'Staying customer-friendly, even during busy shifts',
    'exp.nyp.b3': 'Working together as a team',
    'exp.roc.role': 'Software Developer · Level 4',
    'exp.roc.text': 'Worked with PHP, Symfony, Next.js, HTML, CSS, JavaScript, Bootstrap and Tailwind CSS. Experience with responsive websites, databases, front-end and back-end, and collaborating via GitHub.',
    'exp.lidl.role': 'Shelf Stocker / Sales Associate',
    'exp.lidl.b1': 'Restocking shelves and keeping the store tidy',
    'exp.lidl.b2': 'Helping customers and answering questions',
    'exp.lidl.b3': 'Working the checkout',
    'exp.lidl.b4': 'Working as a team and following the schedule',

    'skills.title1': 'My',
    'skills.sub': 'Everything with a <span class="new-sticker new-sticker-inline">New</span> sticker is what I\'m learning right now.',
    'skills.new': 'New',
    'skills.backend': 'Back-end & data',
    'skills.tools': 'Tools & workflow',
    'skills.nl': 'Dutch',
    'skills.en': 'English',
    'skills.ar': 'Arabic',

    'projects.title1': "Things I've",
    'projects.title2': 'built',
    'projects.all': 'All',
    'projects.web': 'Web apps',
    'projects.bb': 'Personal finance app that helps users keep track of their expenses and savings goals. School project built with Symfony.',
    'projects.sdg': 'Dashboard that collects and clearly visualises data about the Sustainable Development Goals (SDGs).',
    'projects.code': 'View code',
    'projects.c4': 'Strategic two-player game with win detection in every direction.',
    'projects.hl': 'Dice game where you guess whether the next roll is higher or lower, with credits, a spin machine and a leaderboard.',
    'projects.wam': 'Arcade game where you hit as many moles as you can before time runs out.',
    'projects.ttt': 'The classic two-player game, with a clean and responsive design.',
    'projects.play': 'Play now',
    'projects.soon': 'In development',
    'projects.newTitle': 'New full-stack project',
    'projects.newDesc': "I'm building my next project with my new stack. Keep an eye on this spot!",
    'projects.more': 'More on GitHub',

    'contact.title': 'Let\'s build something <span class="outline">awesome</span>!',
    'contact.sub': 'Looking for a motivated intern or junior developer, or just want to chat? Feel free to send me a message.',
    'contact.copy': 'Copy',
    'contact.download': 'Download CV',

    'footer.made': 'Built with ❤️ and lots of coffee',
  };

  const FLIP = {
    nl: ['websites', 'web-apps', "API's", 'dashboards', 'games'],
    en: ['websites', 'web apps', 'APIs', 'dashboards', 'games'],
  };

  const UI = {
    nl: {
      copied: 'E-mailadres gekopieerd! 📋',
      copyFail: 'Kopiëren lukte niet, selecteer het adres handmatig.',
      menuOpen: 'Menu openen',
      menuClose: 'Menu sluiten',
    },
    en: {
      copied: 'Email address copied! 📋',
      copyFail: 'Copy failed, please select the address manually.',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
  };

  let lang = 'nl';
  const originals = new Map();

  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'nl';
    root.lang = lang;

    $$('[data-i18n]').forEach((el) => {
      if (!originals.has(el)) originals.set(el, el.textContent);
      const value = EN[el.dataset.i18n];
      el.textContent = lang === 'en' && value ? value : originals.get(el);
    });

    $$('[data-i18n-html]').forEach((el) => {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      const value = EN[el.dataset.i18nHtml];
      el.innerHTML = lang === 'en' && value ? value : originals.get(el);
    });

    const toggle = $('#navToggle');
    if (toggle) {
      const open = $('#nav').classList.contains('nav-open');
      toggle.setAttribute('aria-label', open ? UI[lang].menuClose : UI[lang].menuOpen);
    }

    storage.set('lang', lang);
    flipper.restart();
  }

  /* ---------------------------------------------------------
     Naam in de hero: letters één voor één omhoog laten komen
     --------------------------------------------------------- */
  function splitChars() {
    $$('.split').forEach((el) => {
      const chars = Array.from(el.textContent);
      el.textContent = '';
      chars.forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.setProperty('--ci', i);
        span.textContent = ch;
        el.appendChild(span);
      });
    });
  }

  /* ---------------------------------------------------------
     "Ik bouw [woord]" – wisselend woord in het groene blok
     --------------------------------------------------------- */
  const flipper = (() => {
    const word = $('#flipWord');
    if (!word) return { restart() {}, fit() {} };
    const box = word.parentElement;
    let words = FLIP.nl;
    let index = 0;
    let timer = null;

    function fit() {
      const cs = getComputedStyle(box);
      const extra = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
        + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
      box.style.width = Math.ceil(word.offsetWidth + extra) + 'px';
    }

    function show(next) {
      word.classList.add('out');
      setTimeout(() => {
        word.textContent = next;
        word.classList.remove('out');
        word.classList.add('in');
        fit();
        void word.offsetWidth; // start de animatie opnieuw
        word.classList.remove('in');
      }, 300);
    }

    function tick() {
      index = (index + 1) % words.length;
      show(words[index]);
      timer = setTimeout(tick, 2400);
    }

    function restart() {
      clearTimeout(timer);
      words = FLIP[lang];
      index = 0;
      word.textContent = words[0];
      fit();
      if (!reduceMotion) timer = setTimeout(tick, 2600);
    }

    return { restart, fit };
  })();

  /* ---------------------------------------------------------
     Navigatie: mobiel menu, verbergen bij omlaag scrollen, actieve link
     --------------------------------------------------------- */
  function navigation() {
    const nav = $('#nav');
    const toggle = $('#navToggle');
    const links = $$('.nav-link');

    const setOpen = (open) => {
      nav.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? UI[lang].menuClose : UI[lang].menuOpen);
      if (open) nav.classList.remove('nav-hidden');
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
    $$('#navLinks a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', (e) => { if (!nav.contains(e.target)) setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 880) setOpen(false); });

    if ('IntersectionObserver' in window) {
      const band = { rootMargin: '-45% 0px -50% 0px' };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === id));
        });
      }, band);
      links.map((link) => $(link.getAttribute('href'))).filter(Boolean).forEach((s) => observer.observe(s));

      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) links.forEach((l) => l.classList.remove('active'));
      }, band).observe($('#home'));
    }
  }

  /* ---------------------------------------------------------
     Scroll: voortgangsbalk + nav verbergen/tonen
     --------------------------------------------------------- */
  function scrollEffects() {
    const nav = $('#nav');
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--progress', max > 0 ? clamp(y / max, 0, 1).toFixed(4) : 0);

      if (!nav.classList.contains('nav-open')) {
        if (y > lastY + 4 && y > 320) nav.classList.add('nav-hidden');
        else if (y < lastY - 4 || y <= 320) nav.classList.remove('nav-hidden');
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------------------------------------------------
     Elementen laten verschijnen tijdens het scrollen
     --------------------------------------------------------- */
  function reveals() {
    $$('.tiles').forEach((list) => {
      $$('.tile', list).forEach((tile, i) => tile.style.setProperty('--ti', i));
    });

    const items = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach((el) => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     Tellers
     --------------------------------------------------------- */
  function counters() {
    const els = $$('.counter');
    const run = (el) => {
      const target = Number(el.dataset.target) || 0;
      if (reduceMotion) { el.textContent = target; return; }
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const t = clamp((now - start) / duration, 0, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    els.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     Groene cursor-stip die groter wordt boven klikbare dingen
     --------------------------------------------------------- */
  function cursorDot() {
    if (!finePointer || reduceMotion) return;
    const dot = $('.cursor-dot');
    let x = 0;
    let y = 0;
    let queued = false;

    window.addEventListener('pointermove', (e) => {
      x = e.clientX;
      y = e.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        dot.style.setProperty('--cx', x + 'px');
        dot.style.setProperty('--cy', y + 'px');
        dot.classList.add('is-active');
        queued = false;
      });
    }, { passive: true });

    document.addEventListener('pointerover', (e) => {
      dot.classList.toggle('is-hover', Boolean(e.target.closest('a, button, .tile, .chips li')));
    });
    document.documentElement.addEventListener('pointerleave', () => dot.classList.remove('is-active'));
  }

  /* ---------------------------------------------------------
     Projecten filteren
     --------------------------------------------------------- */
  function projectFilter() {
    const buttons = $$('.filter-btn');
    const cards = $$('#projectsGrid .project');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        cards.forEach((card) => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !show);
          card.classList.remove('pop');
          if (show) {
            card.classList.add('revealed');
            void card.offsetWidth; // start de animatie opnieuw
            card.classList.add('pop');
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------
     E-mail kopiëren + melding
     --------------------------------------------------------- */
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  function copyEmail() {
    const btn = $('#copyEmail');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const area = document.createElement('textarea');
          area.value = email;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          const ok = document.execCommand('copy');
          area.remove();
          if (!ok) throw new Error('copy failed');
        }
        toast(UI[lang].copied);
        const icon = $('i', btn);
        icon.className = 'fas fa-check';
        setTimeout(() => { icon.className = 'far fa-copy'; }, 2000);
      } catch (e) {
        toast(UI[lang].copyFail);
      }
    });
  }

  /* ---------------------------------------------------------
     Start
     --------------------------------------------------------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  splitChars();
  navigation();
  scrollEffects();
  reveals();
  counters();
  cursorDot();
  projectFilter();
  copyEmail();

  $('#langToggle').addEventListener('click', () => applyLang(lang === 'nl' ? 'en' : 'nl'));

  if (storage.get('lang') === 'en') {
    applyLang('en');
  } else {
    root.lang = 'nl';
    flipper.restart();
  }

  // Breedte van het groene woord-blok opnieuw meten zodra de fonts geladen zijn
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(flipper.fit);
  window.addEventListener('resize', flipper.fit);
})();
