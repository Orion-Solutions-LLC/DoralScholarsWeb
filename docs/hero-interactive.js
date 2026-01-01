// Interactive Hero Page Effects

document.addEventListener('DOMContentLoaded', function() {
  // Scroll progress indicator - positioned above navigation
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  // Background color variables - more vibrant orange to red-orange
  const bgColors = {
    start: '#fff4e6',      // Light orange tint
    light: '#ffe8d6',      // Warm orange
    warm: '#ffddd0',       // Orange-red
    mid: '#ffc4b3',       // Medium red-orange
    deep: '#ffa88f'       // Deep red-orange
  };

  let lastScroll = 0;
  let ticking = false;

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';

    // Change background color based on scroll position
    const scrollRatio = Math.min(scrollTop / scrollHeight, 1);
    let bgColor;
    
    if (scrollRatio < 0.25) {
      // Start: light off-red
      bgColor = bgColors.start;
    } else if (scrollRatio < 0.5) {
      // Transition to light red
      const t = (scrollRatio - 0.25) / 0.25;
      bgColor = interpolateColor(bgColors.start, bgColors.light, t);
    } else if (scrollRatio < 0.75) {
      // Transition to medium red
      const t = (scrollRatio - 0.5) / 0.25;
      bgColor = interpolateColor(bgColors.light, bgColors.mid, t);
    } else {
      // Transition to deeper red, then back
      const t = (scrollRatio - 0.75) / 0.25;
      if (t < 0.5) {
        bgColor = interpolateColor(bgColors.mid, bgColors.deep, t * 2);
      } else {
        bgColor = interpolateColor(bgColors.deep, bgColors.mid, (t - 0.5) * 2);
      }
    }
    
    document.body.style.backgroundColor = bgColor;
    
    // Also update nav background to match
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.backgroundColor = bgColor;
    }

    // Change hero background opacity based on scroll
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroHeight = hero.offsetHeight;
      const heroScrollRatio = Math.min(scrollTop / heroHeight, 1);
      hero.style.opacity = 1 - heroScrollRatio * 0.3;
    }

    // Fade in sections as they come into view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const sectionScrollPercent = Math.max(0, Math.min(100, (window.innerHeight - rect.top) / window.innerHeight * 100));
        section.style.opacity = Math.min(1, sectionScrollPercent / 50);
      }
    });

    ticking = false;
  }
  
  // Color interpolation helper function
  function interpolateColor(color1, color2, factor) {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
  updateScrollProgress();

  // Smooth scroll to sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.card, section > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

