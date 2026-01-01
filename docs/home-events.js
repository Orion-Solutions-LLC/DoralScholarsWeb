// Load upcoming events preview on home page

async function loadEventsPreview() {
  try {
    const response = await fetch('events.json');
    if (response.ok) {
      const events = await response.json();
      if (events && events.length > 0) {
        // Get next 3 upcoming events
        const now = new Date();
        const upcoming = events
          .filter(event => new Date(event.date) >= now)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        
        displayEventsPreview(upcoming);
        return;
      }
    }
  } catch (e) {
    // Fallback to localStorage
  }
  
  // Try localStorage
  const stored = localStorage.getItem('doral_events');
  if (stored) {
    const events = JSON.parse(stored);
    const now = new Date();
    const upcoming = events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
    
    displayEventsPreview(upcoming);
  } else {
    // Show placeholder
    const container = document.getElementById('events-preview');
    if (container) {
      container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Check back soon for upcoming events!</p>';
    }
  }
}

function displayEventsPreview(events) {
  const container = document.getElementById('events-preview');
  if (!container) return;
  
  if (events.length === 0) {
    container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Check back soon for upcoming events!</p>';
    return;
  }
  
  container.innerHTML = events.map(event => {
    const date = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `
      <div class="event-card">
        <div class="event-date-badge">${date}</div>
        <h3 style="color: var(--doral-red); margin-bottom: 0.5rem;">${event.title || 'Event'}</h3>
        ${event.text ? `<p style="margin-bottom: 1rem;">${event.text.substring(0, 100)}${event.text.length > 100 ? '...' : ''}</p>` : ''}
        <a href="events.html#event-${event.id || event.title?.toLowerCase().replace(/\s+/g, '-')}" class="btn btn-primary" style="display: inline-block;">Learn More</a>
      </div>
    `;
  }).join('');
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadEventsPreview);
} else {
  loadEventsPreview();
}

