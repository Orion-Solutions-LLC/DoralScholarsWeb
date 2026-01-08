// Programs Page - Hover Logic
// Ensures one column is always open (default: middle column)
// Once you hover over a column, it stays open until you hover over a different one
document.addEventListener('DOMContentLoaded', function() {
  const programColumns = document.querySelectorAll('.program-category-column');
  
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
      
      // Add open state to hovered column - it will stay open
      this.classList.add('is-open');
    });
  });
});

