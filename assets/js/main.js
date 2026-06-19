

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  if (typeof Typed !== 'undefined') {
    new Typed('#typed-el', {
      strings: [
        'Full Stack Developer',
        'ASP.NET Core Specialist',
        'Angular Developer',
        'Web API Engineer',
        'Clean Architecture Advocate'
      ],
      typeSpeed: 55,
      backSpeed: 32,
      backDelay: 2200,
      startDelay: 600,
      loop: true,
      smartBackspace: true
    });
  }

  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
 
    navbar.classList.toggle('scrolled', window.scrollY > 24);


    document.getElementById('scroll-top')
      .classList.toggle('show', window.scrollY > 500);


    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); 


  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });

  const themeBtn = document.getElementById('theme-toggle');
  const html     = document.documentElement;
  let dark = localStorage.getItem('mbr-theme') == 'light';

  const applyTheme = () => {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeBtn.textContent = dark ? '🌙' : '☀️';
    themeBtn.title = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  };

  applyTheme();

  themeBtn.addEventListener('click', () => {
    dark = !dark;
    localStorage.setItem('mbr-theme', dark ? 'dark' : 'light');
    applyTheme();
  });

  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale'
  );

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
      const s = (i + 1) * 18;
      orb.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
    });
  }, { passive: true });

  const TECH_TAGS = [
    'ASP.NET Core', 'C#', 'Web API', 'MVC', '.NET', 'Angular', 'TypeScript',
    'RxJS', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'SQL Server', 'T-SQL',
    'Entity Framework', 'JWT', 'OAuth 2.0', 'Clean Architecture', 'SOLID',
    'Git', 'GitHub', 'Swagger', 'Postman', 'IIS', 'Classic ASP', 'VBScript',
    'ADO', 'REST API', 'Visual Studio', 'VS Code'
  ];

  const sphereEl = document.getElementById('tag-sphere');
  if (!sphereEl) return;

  const R    = sphereEl.offsetWidth  / 2 || 240;
  const tags = [];


  const COLORS = [
    { bg: 'rgba(124,58,237,0.18)',  border: 'rgba(124,58,237,0.35)',  color: '#9F67FF' },
    { bg: 'rgba(6,182,212,0.14)',   border: 'rgba(6,182,212,0.35)',   color: '#22D3EE' },
    { bg: 'rgba(16,185,129,0.14)',  border: 'rgba(16,185,129,0.35)',  color: '#10B981' },
  ];

  const n   = TECH_TAGS.length;
  const phi = Math.PI * (3 - Math.sqrt(5)); 

  TECH_TAGS.forEach((text, i) => {
    const y     = 1 - (i / (n - 1)) * 2;
    const rad   = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x0 = Math.cos(theta) * rad * R;
    const y0 = y * R;
    const z0 = Math.sin(theta) * rad * R;

    const c   = COLORS[i % COLORS.length];
    const el  = document.createElement('div');
    el.className   = 'tag-item';
    el.textContent = text;
    el.style.cssText = `
      background: ${c.bg};
      border: 1px solid ${c.border};
      color: ${c.color};
    `;

    sphereEl.appendChild(el);
    tags.push({ el, x: x0, y: y0, z: z0, origX: x0, origY: y0, origZ: z0 });
  });

  /* Rotation state */
  let rotX   = 0.012;
  let rotY   = 0.022;
  let mouseX = 0;
  let mouseY = 0;
  let dragging   = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  function rotateX(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
  }
  function rotateY(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
  }

  let frame;
  function render() {

    tags.forEach(t => {
      let p = { x: t.x, y: t.y, z: t.z };
      p = rotateX(p, dragging ? mouseY * 0.004 : rotX);
      p = rotateY(p, dragging ? mouseX * 0.004 : rotY);
      t.x = p.x; t.y = p.y; t.z = p.z;
    });

    if (dragging) { mouseX = 0; mouseY = 0; }

    tags.forEach(t => {
      const scale  = (t.z + R) / (2 * R); 
      const alpha  = 0.3 + scale * 0.7;
      const fsize  = 11 + scale * 3;       

      t.el.style.transform = `
        translate(-50%, -50%)
        translate3d(${t.x}px, ${t.y}px, 0)
        scale(${0.7 + scale * 0.6})
      `;
      t.el.style.opacity  = alpha;
      t.el.style.fontSize = fsize + 'px';
      t.el.style.zIndex   = Math.round(t.z + R);
    });

    frame = requestAnimationFrame(render);
  }

  render();

  sphereEl.addEventListener('mouseenter', () => { rotX = 0; rotY = 0; });
  sphereEl.addEventListener('mouseleave', () => {
    if (!dragging) { rotX = 0.003; rotY = 0.006; }
  });

  sphereEl.addEventListener('mousedown', e => {
    dragging   = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    mouseX = e.clientX - lastMouseX;
    mouseY = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    rotX = 0.003;
    rotY = 0.006;
  });

  let lastTX = 0, lastTY = 0;
  sphereEl.addEventListener('touchstart', e => {
    lastTX = e.touches[0].clientX;
    lastTY = e.touches[0].clientY;
  }, { passive: true });
  sphereEl.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - lastTX;
    const dy = e.touches[0].clientY - lastTY;
    tags.forEach(t => {
      let p = rotateY({ x: t.x, y: t.y, z: t.z }, dx * 0.006);
      p     = rotateX(p, dy * 0.006);
      t.x = p.x; t.y = p.y; t.z = p.z;
    });
    lastTX = e.touches[0].clientX;
    lastTY = e.touches[0].clientY;
  }, { passive: true });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards  = document.querySelectorAll('.proj-card[data-cat]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      projCards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat.includes(cat);
        card.style.transition = 'opacity 0.35s, transform 0.35s';
        if (show) {
          card.style.opacity   = '1';
          card.style.transform = '';
          card.style.pointerEvents = 'auto';
        } else {
          card.style.opacity   = '0.2';
          card.style.transform = 'scale(0.95)';
          card.style.pointerEvents = 'none';
        }
      });
    });
  });

  const form = document.getElementById('contact-form');
  if (!form) return;

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const setErr = (groupId, hasErr) => {
    document.getElementById(groupId)?.classList.toggle('has-error', hasErr);
  };

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('f-name').value.trim();
    const email   = document.getElementById('f-email').value.trim();
    const subject = document.getElementById('f-subject').value.trim();
    const message = document.getElementById('f-message').value.trim();

    setErr('fg-name', false);
    setErr('fg-email', false);
    setErr('fg-subject', false);
    setErr('fg-message', false);

    let ok = true;
    if (!name || name.length < 2)      { setErr('fg-name', true);    ok = false; }
    if (!email || !isEmail(email))     { setErr('fg-email', true);   ok = false; }
    if (!subject || subject.length < 3){ setErr('fg-subject', true); ok = false; }
    if (!message || message.length < 10){ setErr('fg-message', true); ok = false; }

    if (!ok) return;

    const btn     = document.getElementById('f-submit');
    const btnTxt  = document.getElementById('f-submit-txt');

    btn.disabled   = true;
    btnTxt.textContent = '⏳ Sending…';

    const successMsg = document.getElementById('form-success');
    const errorMsg   = document.getElementById('form-error');

    successMsg.classList.remove('show');
    errorMsg.classList.remove('show');

    fetch('https://formspree.io/f/xykapgwk', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      btn.disabled = false;
      btnTxt.textContent = '✉️ Send Message';
      if (response.ok) {
        successMsg.classList.add('show');
        form.reset();
        setTimeout(() => successMsg.classList.remove('show'), 5500);
      } else {
        response.json().then(data => {
          if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
            console.error('Formspree errors:', data.errors);
          }
        });
        errorMsg.classList.add('show');
        setTimeout(() => errorMsg.classList.remove('show'), 5500);
      }
    })
    .catch(error => {
      console.error('Submission error:', error);
      btn.disabled = false;
      btnTxt.textContent = '✉️ Send Message';
      errorMsg.classList.add('show');
      setTimeout(() => errorMsg.classList.remove('show'), 5500);
    });
  });

  ['f-name','f-email','f-subject','f-message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function () {
      this.closest('.form-group')?.classList.remove('has-error');
    });
  });

  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseFloat(el.dataset.count);
      const dur = 1800;
      const start = performance.now();

      const tick = now => {
        const t   = Math.min((now - start) / dur, 1);
        const val = t < 1
          ? end * (1 - Math.pow(1 - t, 3))   
          : end;
        el.textContent = Number.isInteger(end)
          ? Math.round(val).toString()
          : val.toFixed(1);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObs.observe(el));

}); 
