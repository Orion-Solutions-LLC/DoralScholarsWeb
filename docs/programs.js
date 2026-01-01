// Programs Page Filtering Logic

document.addEventListener('DOMContentLoaded', function() {
  const pathButtons = document.querySelectorAll('.path-selector-btn');
  const programCards = document.querySelectorAll('.program-category-card');

  pathButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      pathButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const selectedPath = this.dataset.path;

      // Filter programs
      programCards.forEach(card => {
        if (selectedPath === 'all') {
          card.style.display = 'block';
        } else {
          const cardCategories = card.dataset.categories.split(',');
          if (cardCategories.includes(selectedPath)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });

      // Smooth scroll to top of programs section
      document.getElementById('program-categories').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});

