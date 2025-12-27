const animatedElements = document.querySelectorAll(
  '.slide-up, .fade-in, .zoom-in'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
});

animatedElements.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
