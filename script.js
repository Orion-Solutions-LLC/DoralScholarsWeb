// Animated Elements
const animatedElements = document.querySelectorAll('.slide-up, .fade-in, .zoom-in');
animatedElements.forEach(el => {
  el.style.animationPlayState = 'paused';
});

// Intersection Observer for animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => observer.observe(el));

// Impact Bubble Count Up
const counters = document.querySelectorAll('.impact-bubble');

if (counters.length > 0) {
  const bubbleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const bubble = entry.target;
        const numberEl = bubble.querySelector('.number');
        if (numberEl && !bubble.dataset.animated) {
          bubble.dataset.animated = 'true';
          const target = +bubble.dataset.value;
          let count = 0;
          const increment = Math.max(1, Math.floor(target / 50));
          const duration = 2000; // 2 seconds
          const steps = 50;
          const stepTime = duration / steps;
          
          const update = () => {
            count += increment;
            if(count >= target) {
              numberEl.textContent = target + (target > 1 ? '+' : '');
            } else {
              numberEl.textContent = count;
              setTimeout(update, stepTime);
            }
          };
          update();
        }
        bubbleObserver.unobserve(bubble);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(bubble => {
    bubbleObserver.observe(bubble);
  });
}

const stylus = document.getElementById('stylus-pointer');

// Function to check hover over interactive elements
function checkHover(e) {
  const hovered = document.elementFromPoint(e.clientX, e.clientY);
  if (hovered && (hovered.tagName === 'BUTTON' || hovered.tagName === 'A' || hovered.classList.contains('card'))) {
    stylus.classList.add('hovering');
  } else {
    stylus.classList.remove('hovering');
  }
}

document.addEventListener('mousemove', e => {
  // Move the stylus
  stylus.style.top = e.clientY + 'px';
  stylus.style.left = e.clientX + 'px';

  // Add glow animation
  stylus.classList.add('moving');
  clearTimeout(stylus._timeout);
  stylus._timeout = setTimeout(() => stylus.classList.remove('moving'), 100);

  // Check hover effects
  checkHover(e);
});





