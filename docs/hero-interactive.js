/**
 * Doral Scholars - Interactive Page Effects
 * Handles scroll-triggered animations and visual enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for subtle entrance animations
  document.querySelectorAll('.card, .program-category-card, .event-card').forEach(el => {
    // Only apply if not already visible
    if (!el.classList.contains('is-visible')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    }
  });

  // Stagger animation delays for grid items
  document.querySelectorAll('.grid, .highlights, .program-category-grid').forEach(grid => {
    const items = grid.querySelectorAll('.card, .program-category-card');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // Hero parallax effect (subtle)
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroContent = hero.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset;
      const heroHeight = hero.offsetHeight;
      
      if (scrollTop < heroHeight) {
        const parallaxOffset = scrollTop * 0.3;
        if (heroContent) {
          heroContent.style.transform = `translateY(${parallaxOffset}px)`;
          heroContent.style.opacity = 1 - (scrollTop / heroHeight) * 0.5;
        }
      }
    }, { passive: true });
  }
});
