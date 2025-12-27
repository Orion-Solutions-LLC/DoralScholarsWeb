// Events Data Loader for Public Events Page

async function loadEventsData() {
  // First, try to load from events.json file (for GitHub Pages)
  try {
    const response = await fetch('events.json');
    if (response.ok) {
      const jsonEvents = await response.json();
      if (jsonEvents && jsonEvents.length > 0) {
        return jsonEvents.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      }
    }
  } catch (e) {
    // File doesn't exist or can't be loaded, continue to localStorage
  }
  
  // Fallback: Try to load from localStorage (set by admin)
  const stored = localStorage.getItem('doral_events');
  const events = stored ? JSON.parse(stored) : [];
  
  // If no events in storage, use default monthly programs
  if (events.length === 0) {
    return null; // Will show default content
  }
  
  // Sort events by date
  return events.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
}

// Make function available globally
window.loadEventsData = loadEventsData;

async function displayEventsOnPage() {
  const events = await loadEventsData();
  const eventsContainer = document.getElementById('dynamic-events');
  const dynamicSection = document.getElementById('dynamic-events-section');
  const monthlySection = document.getElementById('monthly-programs');
  
  if (!eventsContainer) return;
  
  if (!events || events.length === 0) {
    // Show default monthly programs (existing content)
    if (dynamicSection) dynamicSection.style.display = 'none';
    if (monthlySection) monthlySection.style.display = 'block';
    return;
  }
  
  // Show dynamic events, hide monthly programs
  if (dynamicSection) dynamicSection.style.display = 'block';
  if (monthlySection) monthlySection.style.display = 'none';
  
  // Clear existing content and show dynamic events
  eventsContainer.innerHTML = events.map(event => {
    const date = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `
      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="color: var(--doral-red);">${event.title}</h3>
        <p style="margin-bottom: 1rem; font-weight: 500; color: var(--doral-burgundy);">${date}</p>
        ${event.names ? `<p style="margin-bottom: 1rem;"><strong>Organizers:</strong> ${event.names}</p>` : ''}
        ${event.text ? `<p style="margin-bottom: 1.5rem;">${event.text}</p>` : ''}
      </div>
    `;
  }).join('');
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', displayEventsOnPage);
} else {
  displayEventsOnPage();
}

