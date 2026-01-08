// Programs Page - Hover Logic
// Ensures one column is always open (default: middle column)
// Once you hover over a column, it stays open until you hover over a different one
// If navigating via hash link, opens the corresponding column
document.addEventListener('DOMContentLoaded', function() {
  const programColumns = document.querySelectorAll('.program-category-column');
  
  // Map hash values to column IDs
  const hashToColumnMap = {
    'academic': 'academic',
    'college-career': 'college-career',
    'enrichment': 'enrichment'
  };
  
  // Check for hash in URL
  const hash = window.location.hash.substring(1); // Remove the #
  let targetColumn = null;
  
  if (hash && hashToColumnMap[hash]) {
    // Find the column with matching ID
    programColumns.forEach((column) => {
      if (column.id === hashToColumnMap[hash]) {
        targetColumn = column;
      }
    });
  }
  
  // If no hash or column not found, use middle column (index 1) as default
  if (!targetColumn && programColumns[1]) {
    targetColumn = programColumns[1];
  }
  
  // Open the target column
  if (targetColumn) {
    // Remove open state from all columns first
    programColumns.forEach(col => {
      col.classList.remove('is-open');
    });
    // Add open state to target column
    targetColumn.classList.add('is-open');
    
    // Smooth scroll to the column if hash is present
    if (hash && hashToColumnMap[hash]) {
      setTimeout(() => {
        targetColumn.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
  
  // Handle hover to switch columns
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

