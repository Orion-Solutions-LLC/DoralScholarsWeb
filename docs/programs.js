// Programs Page - Hover Logic
// Ensures one column is always open (default: middle column)
document.addEventListener('DOMContentLoaded', function() {
  const programColumns = document.querySelectorAll('.program-category-column');
  const grid = document.getElementById('program-categories');
  
  // Set middle column as open by default
  if (programColumns[1]) {
    programColumns[1].classList.add('is-open');
  }
  
  programColumns.forEach((column) => {
    column.addEventListener('mouseenter', function() {
      // Remove open state from all columns
      programColumns.forEach(col => {
        col.classList.remove('is-open');
      });
      
      // Add open state to hovered column
      this.classList.add('is-open');
    });
  });
  
  // Ensure middle column stays open when mouse leaves grid
  grid.addEventListener('mouseleave', function() {
    programColumns.forEach(col => {
      col.classList.remove('is-open');
    });
    // Reset to middle column
    if (programColumns[1]) {
      programColumns[1].classList.add('is-open');
    }
  });
});

