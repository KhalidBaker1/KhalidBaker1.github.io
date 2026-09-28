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
    'hero.subtitle': 'Software development student (MBO level 4) at ROC Mondriaan. I build modern, responsive web applications: from polished front-ends to back-ends with TypeScript, Prisma and PostgreSQL.',
    'hero.cta1': 'View my work',
    'hero.cta2': 'My CV',
    'hero.compiled': 'Compiled successfully',

    'about.kicker': 'About me',
    'about.title': 'Who am I?',
    'about.badge': 'Open to opportunities',
    'about.lead': "I'm Khalid: a motivated and positive developer in training, originally from Kurdistan.",
    'about.p1': 'What started as a fascination with games grew into a passion for building complete web applications. At school I work with PHP, Symfony, Next.js and Tailwind CSS, developing both front-end and back-end.',
    'about.p2': "Right now I'm an intern at <strong>Competa IT</strong> and I'm diving into <strong>TypeScript</strong>, <strong>Prisma</strong>, <strong>PostgreSQL</strong> and <strong>Postman</strong>. I also work at <strong>New York Pizza</strong>. I work in a structured way, I'm always on time and I finish what I start.",
    'about.p3': 'My big goal? One day releasing my own successful game. 🎮',
    'about.fact.level': 'Level 4',
    'about.fact.intern': 'Intern at',
    'about.fact.country': 'the Netherlands',
    'about.fact.langs': 'Dutch · English · Arabic',

    'stats.projects': 'Projects',
    'stats.tech': 'Technologies',
    'stats.years': 'Years of coding',
    'stats.langs': 'Languages spoken',

    'exp.kicker': 'My journey',
    'exp.title': 'Experience & education',
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
    'exp.roc.text': 'Worked with PHP, Symfony, Next.js, HTML, CSS, JavaScript, Bootstrap and Tailwind CSS. Experience with responsive websites, databases, both front-end and back-end, and collaborating via GitHub.',
    'exp.lidl.role': 'Shelf Stocker / Sales Associate',
    'exp.lidl.b1': 'Restocking shelves and keeping the store tidy',
    'exp.lidl.b2': 'Helping customers and answering questions',
    'exp.lidl.b3': 'Working the checkout',
    'exp.lidl.b4': 'Working as a team and following the schedule',

    'skills.title': 'My toolbox',
    'skills.sub': 'Technologies I work with. Items marked <span class="new-tag">New</span> are what I\'m learning right now.',
    'skills.new': 'New',
    'skills.backend': 'Back-end & data',
    'skills.tools': 'Tools & workflow',
    'skills.soft': 'Soft skills & languages',
    'skills.s1': 'Structured',
    'skills.s2': 'Always on time',
    'skills.s3': 'Team player',
    'skills.s4': 'Eager to learn',
    'skills.nl': 'Dutch',
    'skills.en': 'English',
    'skills.ar': 'Arabic',

    'projects.kicker': 'Projects',
    'projects.title': "Things I've built",
    'projects.all': 'All',
    'projects.web': 'Web apps',
    'projects.bb': 'Personal finance app that helps users keep track of their expenses and savings goals. School project built with Symfony.',
    'projects.sdg': 'Dashboard that collects and clearly visualises data about the Sustainable Development Goals (SDGs).',
    'projects.code': 'View code',
    'projects.soon': 'In development',
    'projects.newTitle': 'New full-stack project',
    'projects.newDesc': "I'm building my next project with my new stack. Keep an eye on this spot!",
    'projects.soonBtn': 'Coming soon',
    'projects.c4': 'Strategic two-player game with win detection in every direction.',
    'projects.hl': 'Dice game where you guess whether the next roll is higher or lower, with credits, a spin machine and a leaderboard.',
    'projects.wam': 'Arcade game where you hit as many moles as you can before time runs out.',
    'projects.ttt': 'The classic two-player game, with a clean and responsive design.',
    'projects.play': 'Play now',
    'projects.more': 'More on GitHub',

    'contact.title': 'Let\'s build something <span class="gradient-text">awesome</span> together.',
    'contact.sub': 'Looking for a motivated intern or junior developer, or just want to chat? Feel free to send me a message!',
    'contact.copy': 'Copy',
    'contact.phone': 'Phone',
    'contact.download': 'Download PDF',

    'footer.made': 'Built with ❤️ and lots of coffee',
  };

  const ROLES = {
    nl: ['Software Developer', 'Full-stack student', 'Stagiair @ Competa IT', 'TypeScript-fan', 'Toekomstig game developer'],
    en: ['Software Developer', 'Full-stack student', 'Intern @ Competa IT', 'TypeScript fan', 'Future game developer'],
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
      const open = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-label', open ? UI[lang].menuClose : UI[lang].menuOpen);
    }

    storage.set('lang', lang);
    typer.restart();
  }

  /* ---------------------------------------------------------
     Typewriter voor de rol in de hero
     --------------------------------------------------------- */
  const typer = (() => {
    const el = $('#typedRole');
    let words = ROLES.nl;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = null;

    function tick() {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        el.textContent = word.slice(0, charIndex);
        if (charIndex >= word.length) {
          deleting = true;
          timer = setTimeout(tick, 1900);
          return;
        }
        timer = setTimeout(tick, 60 + Math.random() * 60);
      } else {
        charIndex -= 1;
        el.textContent = word.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = setTimeout(tick, 380);
          return;
        }
        timer = setTimeout(tick, 32);
      }
    }

    function restart(delay = 250) {
      if (!el) return;
      clearTimeout(timer);
      words = ROLES[lang];
      wordIndex = 0;
      charIndex = 0;
      deleting = false;
      if (reduceMotion) {
        el.textContent = words[0];
        return;
      }
      el.textContent = '';
      timer = setTimeout(tick, delay);
    }

    return { restart };
  })();

  /* ---------------------------------------------------------
     Code die zichzelf typt in het hero-venster
     --------------------------------------------------------- */
  const CODE = [
    [['kw', 'import'], ['punc', ' { '], ['type', 'Developer'], ['punc', ' } '], ['kw', 'from'], ['punc', ' '], ['str', '"./dev"'], ['punc', ';']],
    [],
    [['kw', 'const'], ['punc', ' '], ['prop', 'khalid'], ['punc', ': '], ['type', 'Developer'], ['punc', ' = {']],
    [['punc', '  '], ['prop', 'role'], ['punc', ': '], ['str', '"Software Developer"'], ['punc', ',']],
    [['punc', '  '], ['prop', 'internship'], ['punc', ': '], ['str', '"Competa IT"'], ['punc', ',']],
    [['punc', '  '], ['prop', 'school'], ['punc', ': '], ['str', '"ROC Mondriaan"'], ['punc', ',']],
    [['punc', '  '], ['prop', 'stack'], ['punc', ': [']],
    [['punc', '    '], ['str', '"TypeScript"'], ['punc', ', '], ['str', '"Next.js"'], ['punc', ',']],
    [['punc', '    '], ['str', '"Prisma"'], ['punc', ', '], ['str', '"PostgreSQL"'], ['punc', ',']],
    [['punc', '  ],']],
    [['punc', '  '], ['prop', 'openToWork'], ['punc', ': '], ['bool', 'true'], ['punc', ',']],
    [['punc', '};']],
    [],
    [['prop', 'khalid'], ['punc', '.'], ['fn', 'build'], ['punc', '('], ['str', '"the future"'], ['punc', ');'], ['com', ' // 🚀']],
  ];

  function typeCode() {
    const codeEl = $('#codeTyping');
    const footer = $('#codeFooter');
    if (!codeEl) return;

    const caret = document.createElement('span');
    caret.className = 'code-caret';

    const makeLine = () => {
      const line = document.createElement('span');
      line.className = 'code-line';
      codeEl.appendChild(line);
      return line;
    };
    const makeToken = (cls) => {
      const tok = document.createElement('span');
      tok.className = 'tok-' + cls;
      return tok;
    };

    if (reduceMotion) {
      CODE.forEach((tokens) => {
        const line = makeLine();
        tokens.forEach(([cls, text]) => {
          const tok = makeToken(cls);
          tok.textContent = text;
          line.appendChild(tok);
        });
      });
      if (footer) footer.classList.add('show');
      return;
    }

    let lineIndex = 0;
    let tokenIndex = 0;
    let chars = null;
    let charIndex = 0;
    let lineEl = makeLine();
    let tokenEl = null;
    lineEl.appendChild(caret);

    function step() {
      const tokens = CODE[lineIndex];

      if (tokenIndex >= tokens.length) {
        lineIndex += 1;
        tokenIndex = 0;
        if (lineIndex >= CODE.length) {
          if (footer) footer.classList.add('show');
          return;
        }
        lineEl = makeLine();
        lineEl.appendChild(caret);
        setTimeout(step, 80);
        return;
      }

      const [cls, text] = tokens[tokenIndex];
      if (!chars) {
        chars = Array.from(text);
        charIndex = 0;
        tokenEl = makeToken(cls);
        lineEl.insertBefore(tokenEl, caret);
      }

      if (/^\s+$/.test(text)) {
        tokenEl.textContent = text;
        charIndex = chars.length;
      } else {
        tokenEl.textContent += chars[charIndex];
        charIndex += 1;
      }

      if (charIndex >= chars.length) {
        tokenIndex += 1;
        chars = null;
      }
      setTimeout(step, 10 + Math.random() * 26);
    }

    setTimeout(step, 1100);
  }

  /* ---------------------------------------------------------
     Deeltjes-netwerk op de achtergrond van de hero
     --------------------------------------------------------- */
  function heroCanvas() {
    const canvas = $('#heroCanvas');
    const hero = $('#home');
    if (!canvas || !hero || reduceMotion) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = null;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 120;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = clamp(Math.floor((width * height) / 15000), 24, 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < 130) {
          const force = (130 - dist) / 130;
          p.x += (dx / dist) * force * 1.6;
          p.y += (dy / dist) * force * 1.6;
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(74, 222, 128, ${(1 - d / LINK) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 190) {
          ctx.strokeStyle = `rgba(45, 212, 191, ${(1 - md / 190) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(134, 239, 172, 0.75)';
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    const start = () => { if (!rafId) rafId = requestAnimationFrame(frame); };
    const stop = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } };

    hero.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('pointerleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    resize();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start(); else stop();
      }).observe(hero);
    } else {
      start();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (hero.getBoundingClientRect().bottom > 0) start();
    });
  }

  /* ---------------------------------------------------------
     Navigatie: scroll-stijl, mobiel menu, actieve link
     --------------------------------------------------------- */
  function navigation() {
    const nav = $('#nav');
    const toggle = $('#navToggle');
    const links = $$('.nav-link');

    const setOpen = (open) => {
      document.body.classList.toggle('nav-open', open);
      nav.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? UI[lang].menuClose : UI[lang].menuOpen);
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
    $$('#navLinks a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 860) setOpen(false); });

    if ('IntersectionObserver' in window) {
      const sections = links
        .map((link) => $(link.getAttribute('href')))
        .filter(Boolean);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });

      sections.forEach((s) => observer.observe(s));
      // Bovenaan de pagina is er geen actieve sectie
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) links.forEach((l) => l.classList.remove('active'));
      }, { rootMargin: '-45% 0px -50% 0px' }).observe($('#home'));
    }
  }

  /* ---------------------------------------------------------
     Alles wat op scroll reageert (één rAF-loop)
     --------------------------------------------------------- */
  function scrollEffects() {
    const nav = $('#nav');
    const toTop = $('#toTop');
    const timeline = $('#timeline');
    const fill = $('#timelineFill');
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;

      root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
      nav.classList.toggle('scrolled', y > 20);
      toTop.classList.toggle('show', y > 700);

      if (timeline && fill) {
        const rect = timeline.getBoundingClientRect();
        const progress = clamp((vh * 0.65 - rect.top) / rect.height, 0, 1);
        fill.style.setProperty('--tl', progress.toFixed(4));
      }
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

    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     Elementen laten verschijnen tijdens het scrollen
     --------------------------------------------------------- */
  function reveals() {
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
     Tellers in de statistieken
     --------------------------------------------------------- */
  function counters() {
    const els = $$('.counter');
    const run = (el) => {
      const target = Number(el.dataset.target) || 0;
      if (reduceMotion) { el.textContent = target; return; }
      const duration = 1600;
      const startTime = performance.now();
      const tick = (now) => {
        const t = clamp((now - startTime) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased);
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
     Muis-effecten: glow, 3D-tilt, magnetische knoppen, spotlight
     --------------------------------------------------------- */
  function pointerEffects() {
    if (!finePointer || reduceMotion) return;

    const glow = $('.cursor-glow');
    let gx = 0;
    let gy = 0;
    let glowQueued = false;
    window.addEventListener('pointermove', (e) => {
      gx = e.clientX;
      gy = e.clientY;
      if (!glowQueued) {
        glowQueued = true;
        requestAnimationFrame(() => {
          glow.style.setProperty('--cx', gx + 'px');
          glow.style.setProperty('--cy', gy + 'px');
          glow.classList.add('is-active');
          glowQueued = false;
        });
      }
    }, { passive: true });
    document.addEventListener('pointerleave', () => glow.classList.remove('is-active'));

    $$('.tilt').forEach((el) => {
      const max = Number(el.dataset.tiltMax) || 6;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', (-y * max).toFixed(2) + 'deg');
        el.style.setProperty('--ry', (x * max).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });

    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    $$('.spotlight').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------------------------------------------------------
     Projecten filteren
     --------------------------------------------------------- */
  function projectFilter() {
    const buttons = $$('.filter-btn');
    const cards = $$('#projectsGrid .project-card');

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
            void card.offsetWidth; // herstart de animatie
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
     Marquee naadloos maken (tweede kopie van de logo's)
     --------------------------------------------------------- */
  function marquee() {
    const group = $('#marqueeGroup');
    if (!group) return;
    const clone = group.cloneNode(true);
    clone.removeAttribute('id');
    clone.setAttribute('aria-hidden', 'true');
    group.parentElement.appendChild(clone);
  }

  /* ---------------------------------------------------------
     Start
     --------------------------------------------------------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  marquee();
  navigation();
  scrollEffects();
  reveals();
  counters();
  pointerEffects();
  projectFilter();
  copyEmail();
  heroCanvas();
  typeCode();

  const langToggle = $('#langToggle');
  langToggle.addEventListener('click', () => applyLang(lang === 'nl' ? 'en' : 'nl'));

  const savedLang = storage.get('lang');
  if (savedLang === 'en') {
    applyLang('en');
  } else {
    root.lang = 'nl';
    typer.restart(1000);
  }
})();
