/**
 * Doral Scholars - Main JavaScript
 * Handles animations, video playback, and scroll progress
 */

// ===== SCROLL PROGRESS BAR =====
document.addEventListener('DOMContentLoaded', function() {
  const scrollProgress = document.getElementById('scroll-progress');
  
  if (scrollProgress) {
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial call
  }
});

// ===== VIDEO AUTOPLAY =====
const heroVideo = document.querySelector('.hero-background-video');
if (heroVideo) {
  // Ensure video is muted (required for autoplay)
  heroVideo.muted = true;
  heroVideo.loop = true;
  
  // Force play for browsers that require user interaction
  heroVideo.play().catch(error => {
    setTimeout(() => {
      heroVideo.play().catch(() => {
        console.log('Video autoplay prevented by browser');
      });
    }, 100);
  });
  
  // Handle video loading
  heroVideo.addEventListener('loadeddata', () => {
    heroVideo.play().catch(() => {});
  });
}

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.slide-up, .fade-in, .zoom-in');
  
  if (animatedElements.length === 0) return;
  
  // Pause animations initially
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
});

// ===== IMPACT NUMBERS COUNT UP =====
document.addEventListener('DOMContentLoaded', function() {
  // Handle both .impact-number and .stat-number elements
  const impactNumbers = document.querySelectorAll('.impact-number, .stat-number[data-target]');

  if (impactNumbers.length === 0) return;

  // Initialize all numbers to 0
  impactNumbers.forEach(number => {
    const suffix = number.dataset.suffix || '';
    number.textContent = '0' + suffix;
  });

  const impactObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numberEl = entry.target;
        
        if (numberEl.dataset.animated) return;
        numberEl.dataset.animated = 'true';
        
        const target = parseInt(numberEl.dataset.target) || 0;
        const suffix = numberEl.dataset.suffix || '';
        let count = 0;
        
        // Animation settings
        const duration = 1500;
        const steps = 60;
        const stepTime = duration / steps;
        const increment = target / steps;
        
        const update = () => {
          count += increment;
          if (count >= target) {
            numberEl.textContent = target + suffix;
          } else {
            numberEl.textContent = Math.floor(count) + suffix;
            setTimeout(update, stepTime);
          }
        };
        
        update();
        impactObserver.unobserve(numberEl);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  impactNumbers.forEach(number => {
    impactObserver.observe(number);
  });
});

// ===== IMPACT BUBBLES COUNT UP =====
document.addEventListener('DOMContentLoaded', function() {
  const bubbles = document.querySelectorAll('.impact-bubble');

  if (bubbles.length === 0) return;

  const bubbleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bubble = entry.target;
        const numberEl = bubble.querySelector('.number');
        
        if (!numberEl || bubble.dataset.animated) return;
        bubble.dataset.animated = 'true';
        
        const target = parseInt(bubble.dataset.value) || 0;
        let count = 0;
        
        const duration = 2000;
        const steps = 50;
        const stepTime = duration / steps;
        const increment = Math.max(1, Math.floor(target / steps));
        
        const update = () => {
          count += increment;
          if (count >= target) {
            numberEl.textContent = target + (target > 1 ? '+' : '');
          } else {
            numberEl.textContent = count;
            setTimeout(update, stepTime);
          }
        };
        
        update();
        bubbleObserver.unobserve(bubble);
      }
    });
  }, { threshold: 0.5 });

  bubbles.forEach(bubble => {
    bubbleObserver.observe(bubble);
  });
});



//new stuff
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (top < triggerPoint) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
////////////////////////////////////////////////////



// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
