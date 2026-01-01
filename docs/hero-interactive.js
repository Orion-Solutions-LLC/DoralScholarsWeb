// Interactive Hero Page Effects

document.addEventListener('DOMContentLoaded', function() {
  // Scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  let lastScroll = 0;
  let ticking = false;

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';

    // Change hero background opacity based on scroll
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroHeight = hero.offsetHeight;
      const scrollRatio = Math.min(scrollTop / heroHeight, 1);
      hero.style.opacity = 1 - scrollRatio * 0.3;
    }

    // Fade in sections as they come into view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const scrollPercent = Math.max(0, Math.min(100, (window.innerHeight - rect.top) / window.innerHeight * 100));
        section.style.opacity = Math.min(1, scrollPercent / 50);
      }
    });

    ticking = false;
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

