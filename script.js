// Animated Elements
const animatedElements = document.querySelectorAll('.slide-up, .fade-in, .zoom-in');
animatedElements.forEach(el => {
  el.style.animationPlayState = 'paused';
});

// Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

animatedElements.forEach(el => observer.observe(el));

// Impact Bubble Count Up
const counters = document.querySelectorAll('.impact-bubble');

counters.forEach(bubble => {
  const numberEl = bubble.querySelector('.number');
  const target = +bubble.dataset.value;
  let count = 0;
  const increment = Math.max(1, Math.floor(target / 50));
  const update = () => {
    count += increment;
    if(count >= target) {
      numberEl.textContent = target + (target > 1 ? '+' : '');
    } else {
      numberEl.textContent = count;
      requestAnimationFrame(update);
    }
  };
  observer.observe(bubble);
  bubble.addEventListener('mouseenter', () => {
    bubble.style.transform += ' rotateY(15deg)';
  });
  bubble.addEventListener('mouseleave', () => {
    bubble.style.transform = bubble.style.transform.replace(' rotateY(15deg)','');
  });
  update();
});

// Mouse Parallax Effect on Bubbles
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.impact-bubble').forEach(bubble => {
    const rect = bubble.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    bubble.style.transform = `translate(${x*0.02}px, ${y*0.02}px) scale(1.05)`;
  });
});



