// Event Detail Page with Views/Likes Tracking

let currentEvent = null;
let eventId = null;

// Get event ID from URL
const urlParams = new URLSearchParams(window.location.search);
eventId = urlParams.get('id');

// Track view
function trackView(eventId) {
  // Check if already viewed today (dedupe)
  const viewKey = `event_view_${eventId}_${new Date().toDateString()}`;
  if (localStorage.getItem(viewKey)) {
    return; // Already viewed today
  }

  // Mark as viewed
  localStorage.setItem(viewKey, 'true');

  // Increment view count
  const metricsKey = 'event_metrics';
  let metrics = JSON.parse(localStorage.getItem(metricsKey) || '{}');
  
  if (!metrics[eventId]) {
    metrics[eventId] = { views: 0, likes: 0 };
  }
  
  metrics[eventId].views = (metrics[eventId].views || 0) + 1;
  localStorage.setItem(metricsKey, JSON.stringify(metrics));

  // Update display
  updateMetrics();
}

// Track like
function trackLike(eventId) {
  // Check rate limiting (prevent spam)
  const likeKey = `event_like_${eventId}`;
  const lastLike = localStorage.getItem(likeKey);
  const now = Date.now();
  
  if (lastLike && (now - parseInt(lastLike)) < 60000) {
    alert('Please wait a moment before liking again.');
    return; // Rate limit: 1 like per minute per event
  }

  // Record like timestamp
  localStorage.setItem(likeKey, now.toString());

  // Increment like count
  const metricsKey = 'event_metrics';
  let metrics = JSON.parse(localStorage.getItem(metricsKey) || '{}');
  
  if (!metrics[eventId]) {
    metrics[eventId] = { views: 0, likes: 0 };
  }
  
  metrics[eventId].likes = (metrics[eventId].likes || 0) + 1;
  localStorage.setItem(metricsKey, JSON.stringify(metrics));

  // Update display
  updateMetrics();
  updateLikeButton();
}

function updateMetrics() {
  const metricsKey = 'event_metrics';
  const metrics = JSON.parse(localStorage.getItem(metricsKey) || '{}');
  
  if (eventId && metrics[eventId]) {
    document.getElementById('views-count').textContent = metrics[eventId].views || 0;
    document.getElementById('likes-count').textContent = metrics[eventId].likes || 0;
  }
}

function updateLikeButton() {
  const likeBtn = document.getElementById('like-btn');
  const likeCount = document.getElementById('like-count');
  const metricsKey = 'event_metrics';
  const metrics = JSON.parse(localStorage.getItem(metricsKey) || '{}');
  
  if (eventId && metrics[eventId]) {
    likeCount.textContent = `(${metrics[eventId].likes || 0})`;
  }
}

async function loadEvent() {
  if (!eventId) {
    document.getElementById('event-title').textContent = 'Event Not Found';
    return;
  }

  // Try to load from events.json
  try {
    const response = await fetch('events.json');
    if (response.ok) {
      const events = await response.json();
      currentEvent = events.find(e => (e.id || e.title?.toLowerCase().replace(/\s+/g, '-')) === eventId);
      if (currentEvent) {
        displayEvent(currentEvent);
        trackView(eventId);
        return;
      }
    }
  } catch (e) {
    console.log('Could not load events.json');
  }

  // Fallback to localStorage
  const stored = localStorage.getItem('doral_events');
  if (stored) {
    const events = JSON.parse(stored);
    currentEvent = events.find(e => (e.id || e.title?.toLowerCase().replace(/\s+/g, '-')) === eventId);
    if (currentEvent) {
      displayEvent(currentEvent);
      trackView(eventId);
      return;
    }
  }

  // Event not found
  document.getElementById('event-title').textContent = 'Event Not Found';
  document.getElementById('event-description').innerHTML = '<p>The event you are looking for could not be found.</p>';
}

function displayEvent(event) {
  // Update title
  document.getElementById('event-title').textContent = event.title || 'Event';
  document.title = `${event.title} - Doral Scholars Events`;

  // Date and location
  const date = new Date(event.date || event.startDateTime);
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  const timeStr = event.startDateTime ? new Date(event.startDateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  }) : '';

  let dateLocationHtml = dateStr;
  if (timeStr) dateLocationHtml += ` at ${timeStr}`;
  if (event.locationName) dateLocationHtml += `<br>📍 ${event.locationName}`;
  if (event.locationAddress) dateLocationHtml += `<br>${event.locationAddress}`;
  
  document.getElementById('event-date-location').innerHTML = dateLocationHtml;

  // Description
  document.getElementById('event-description').innerHTML = 
    `<p style="font-size: 1.1rem; line-height: 1.8;">${event.description || event.text || event.summary || 'No description available.'}</p>`;

  // Audience
  if (event.audienceTags && event.audienceTags.length > 0) {
    document.getElementById('event-audience').innerHTML = 
      `<p>This event is designed for: ${event.audienceTags.map(tag => `<strong>${tag}</strong>`).join(', ')}</p>`;
  } else {
    document.getElementById('event-audience').innerHTML = '<p>All are welcome!</p>';
  }

  // Agenda (if available)
  if (event.agenda) {
    document.getElementById('event-agenda').innerHTML = `<p>${event.agenda}</p>`;
  } else {
    document.getElementById('event-agenda').innerHTML = '<p>Agenda details coming soon.</p>';
  }

  // Gallery (if available)
  if (event.galleryImages && event.galleryImages.length > 0) {
    document.getElementById('event-gallery').innerHTML = 
      event.galleryImages.map(img => `<img src="${img}" alt="Event photo" style="max-width: 100%; margin: 1rem 0; border-radius: 8px;">`).join('');
  } else {
    document.getElementById('event-gallery').innerHTML = '<p>Photos will be added after the event.</p>';
  }

  // Sidebar details
  let sidebarHtml = '';
  if (event.startDateTime && event.endDateTime) {
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);
    sidebarHtml += `<p><strong>Start:</strong> ${start.toLocaleString()}</p>`;
    sidebarHtml += `<p><strong>End:</strong> ${end.toLocaleString()}</p>`;
  }
  if (event.host) {
    sidebarHtml += `<p><strong>Host:</strong> ${event.host}</p>`;
  }
  if (event.capacity) {
    sidebarHtml += `<p><strong>Capacity:</strong> ${event.capacity} attendees</p>`;
  }
  if (event.virtualLink) {
    sidebarHtml += `<p><strong>Virtual:</strong> <a href="${event.virtualLink}" target="_blank">Join Online</a></p>`;
  }
  document.getElementById('event-details-sidebar').innerHTML = sidebarHtml || '<p>Details coming soon.</p>';

  // Registration button
  if (event.registrationUrl) {
    document.getElementById('register-btn').href = event.registrationUrl;
  } else {
    document.getElementById('register-btn').href = `contact.html?event=${encodeURIComponent(event.title)}`;
    document.getElementById('register-btn').textContent = 'Contact Us to Register';
  }

  // Tags
  if (event.programTags && event.programTags.length > 0) {
    const tagsHtml = event.programTags.map(tag => `<span class="event-tag">${tag}</span>`).join('');
    document.getElementById('event-description').innerHTML += `<div class="event-tags" style="margin-top: 1rem;">${tagsHtml}</div>`;
  }

  // Update metrics
  updateMetrics();
  updateLikeButton();

  // Load related events
  loadRelatedEvents(event);
}

function loadRelatedEvents(currentEvent) {
  // Load all events and find related ones
  // This would ideally filter by program tags or date proximity
  const container = document.getElementById('related-events');
  if (!container) return;

  // For now, show a message
  container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Check the <a href="events.html">events calendar</a> for more upcoming events.</p>';
}

function shareEvent(platform) {
  const url = window.location.href;
  const title = currentEvent?.title || 'Doral Scholars Event';
  
  if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  } else if (platform === 'copy') {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  }
}

// Setup like button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('like-btn')?.addEventListener('click', () => {
    if (eventId) {
      trackLike(eventId);
    }
  });
});

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadEvent);
} else {
  loadEvent();
}

// Export metrics API (for admin dashboard)
window.getEventMetrics = function() {
  const metricsKey = 'event_metrics';
  return JSON.parse(localStorage.getItem(metricsKey) || '{}');
};

