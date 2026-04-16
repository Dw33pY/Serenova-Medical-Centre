/* =============================================
   SERENOVA MEDICAL CENTRE — SCRIPT
   ============================================= */

(function () {
  'use strict';

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    document.body.style.overflow = 'hidden';
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('done');
      }
      document.body.style.overflow = '';
      triggerHeroReveal();
      
      setTimeout(() => {
        checkCountersInView();
      }, 100);
    }, 2000);
  });

  // ===== CUSTOM CURSOR =====
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .service-card, .doctor-card, .pillar').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0'; ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1'; ring.style.opacity = '0.7';
    });
  }

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const menuOverlay = document.getElementById('menuOverlay');

  if (hamburger && mobileMenu && mobileClose && menuOverlay) {
    function openMenu() {
      mobileMenu.classList.add('open');
      menuOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
      const spans = hamburger.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      }
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      menuOverlay.classList.remove('show');
      document.body.style.overflow = '';
      const spans = hamburger.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    }

    hamburger.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ===== HERO REVEAL =====
  function triggerHeroReveal() {
    document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 100);
    });
  }

  // ===== COUNTER ANIMATION =====
  const countersAnimated = new Set();
  
  function animateCounter(el) {
    if (!el || countersAnimated.has(el)) return;
    countersAnimated.add(el);
    
    const target = parseInt(el.dataset.count);
    if (isNaN(target)) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  function checkCountersInView() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        animateCounter(el);
      }
    });
  }

  // ===== INTERSECTION OBSERVER =====
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px 0px 0px' });

  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));
  
  window.addEventListener('scroll', () => {
    requestAnimationFrame(checkCountersInView);
  });
  
  setTimeout(checkCountersInView, 500);
  setTimeout(checkCountersInView, 1500);

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ===== PARALLAX HERO =====
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${scrollY * 0.28}px)`;
      }
    }, { passive: true });
  }

  // ===== NAVBAR LINK ACTIVE STATE =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

})();