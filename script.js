const animatedElements = document.querySelectorAll(
  '.slide-up, .fade-in, .zoom-in'
);

animatedElements.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

/* Count-up animation */
const counters = document.querySelectorAll('.impact-bubble');

const animateCounter = (bubble) => {
  const numberEl = bubble.querySelector('.number');
  const target = +bubble.dataset.value;
  let count = 0;

  const increment = Math.max(1, Math.floor(target / 50));

  const update = () => {
    count += increment;
    if (count >= target) {
      numberEl.textContent = target + (target > 1 ? "+" : "");
    } else {
      numberEl.textContent = count;
      requestAnimationFrame(update);
    }
  };

  update();
};

/* Intersection Observer */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(bubble => observer.observe(bubble));


document.addEventListener('mousemove', e => {
  document.querySelectorAll('.impact-bubble').forEach(bubble => {
    const rect = bubble.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    bubble.style.transform = `
      translate(${x * 0.02}px, ${y * 0.02}px)
      scale(1.02)
    `;
  });
});


