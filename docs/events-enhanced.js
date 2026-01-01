// Enhanced Events Page with Calendar and List Views

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let events = [];
let filteredEvents = [];
let showPastEvents = false;

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

async function loadEvents() {
  try {
    const response = await fetch('events.json');
    if (response.ok) {
      const jsonEvents = await response.json();
      if (jsonEvents && jsonEvents.length > 0) {
        events = jsonEvents.map(event => ({
          ...event,
          id: event.id || event.title?.toLowerCase().replace(/\s+/g, '-') || `event-${Date.now()}`,
          date: event.date || event.startDateTime,
          views: event.views || 0,
          likes: event.likes || 0
        }));
        filteredEvents = [...events];
        renderEvents();
        renderCalendar();
        return;
      }
    }
  } catch (e) {
    console.log('Could not load events.json');
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem('doral_events');
  if (stored) {
    const storedEvents = JSON.parse(stored);
    events = storedEvents.map(event => ({
      ...event,
      id: event.id || event.title?.toLowerCase().replace(/\s+/g, '-') || `event-${Date.now()}`,
      views: event.views || 0,
      likes: event.likes || 0
    }));
    filteredEvents = [...events];
    renderEvents();
    renderCalendar();
  }
}

function renderEvents() {
  const container = document.getElementById('events-list-container');
  if (!container) return;

  const now = new Date();
  const eventsToShow = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    return showPastEvents || eventDate >= now;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (eventsToShow.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 3rem;">No events found. Check back soon!</p>';
    return;
  }

  container.innerHTML = eventsToShow.map(event => {
    const date = new Date(event.date);
    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeStr = event.startDateTime ? new Date(event.startDateTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }) : '';

    return `
      <div class="event-card" onclick="window.location.href='event-detail.html?id=${event.id}'">
        <div class="event-date-badge">${dateStr}${timeStr ? ' • ' + timeStr : ''}</div>
        <h3 style="color: var(--doral-red); margin-bottom: 0.5rem;">${event.title || 'Event'}</h3>
        ${event.locationName ? `<p style="color: var(--doral-burgundy); margin-bottom: 0.5rem;"><strong>📍</strong> ${event.locationName}</p>` : ''}
        ${event.summary || event.text ? `<p style="margin-bottom: 1rem;">${(event.summary || event.text).substring(0, 150)}${(event.summary || event.text).length > 150 ? '...' : ''}</p>` : ''}
        <div class="event-tags">
          ${event.audienceTags ? event.audienceTags.map(tag => `<span class="event-tag">${tag}</span>`).join('') : ''}
          ${event.programTags ? event.programTags.map(tag => `<span class="event-tag">${tag}</span>`).join('') : ''}
        </div>
        <div class="event-metrics">
          <span>👁️ ${event.views || 0} views</span>
          <span>❤️ ${event.likes || 0} likes</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderCalendar() {
  const monthYearEl = document.getElementById('calendar-month-year');
  const gridEl = document.getElementById('calendar-grid');
  const eventsListEl = document.getElementById('calendar-events-list');
  
  if (!monthYearEl || !gridEl) return;

  monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Clear grid
  gridEl.innerHTML = '';

  // Add day headers
  dayNames.forEach(day => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = day;
    gridEl.appendChild(header);
  });

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day';
    gridEl.appendChild(empty);
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    dayEl.textContent = day;
    
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toISOString().split('T')[0] === dateStr;
    });

    if (dayEvents.length > 0) {
      dayEl.classList.add('has-events');
      dayEl.title = `${dayEvents.length} event(s)`;
    }

    const today = new Date();
    if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate()) {
      dayEl.classList.add('today');
    }

    dayEl.addEventListener('click', () => {
      if (dayEvents.length > 0) {
        showDayEvents(dayEvents, dateStr);
      }
    });

    gridEl.appendChild(dayEl);
  }

  // Show month events
  const monthEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (monthEvents.length > 0) {
    eventsListEl.innerHTML = '<h3 style="margin-bottom: 1rem;">Events This Month</h3>' + monthEvents.map(event => {
      const date = new Date(event.date);
      return `
        <div class="event-card" onclick="window.location.href='event-detail.html?id=${event.id}'" style="margin-bottom: 1rem;">
          <div class="event-date-badge">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          <h3 style="color: var(--doral-red);">${event.title}</h3>
        </div>
      `;
    }).join('');
  } else {
    eventsListEl.innerHTML = '<p>No events scheduled for this month.</p>';
  }
}

function showDayEvents(dayEvents, dateStr) {
  // Could open a modal or scroll to events
  alert(`${dayEvents.length} event(s) on ${dateStr}`);
}

function setupEventListeners() {
  // View toggle
  document.getElementById('view-list-btn')?.addEventListener('click', () => {
    document.getElementById('list-view').style.display = 'block';
    document.getElementById('calendar-view').style.display = 'none';
    document.getElementById('view-list-btn').classList.add('active');
    document.getElementById('view-calendar-btn').classList.remove('active');
  });

  document.getElementById('view-calendar-btn')?.addEventListener('click', () => {
    document.getElementById('list-view').style.display = 'none';
    document.getElementById('calendar-view').style.display = 'block';
    document.getElementById('view-list-btn').classList.remove('active');
    document.getElementById('view-calendar-btn').classList.add('active');
    renderCalendar();
  });

  // Calendar navigation
  document.getElementById('prev-month')?.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  document.getElementById('next-month')?.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // Filters
  document.getElementById('filter-audience')?.addEventListener('change', applyFilters);
  document.getElementById('filter-type')?.addEventListener('change', applyFilters);
  document.getElementById('filter-past')?.addEventListener('click', function() {
    showPastEvents = !showPastEvents;
    this.classList.toggle('active');
    renderEvents();
    renderCalendar();
  });
}

function applyFilters() {
  const audienceFilter = document.getElementById('filter-audience')?.value || '';
  const typeFilter = document.getElementById('filter-type')?.value || '';

  filteredEvents = events.filter(event => {
    if (audienceFilter && event.audienceTags && !event.audienceTags.includes(audienceFilter)) {
      return false;
    }
    if (typeFilter && event.programTags && !event.programTags.some(tag => tag.toLowerCase().includes(typeFilter.toLowerCase()))) {
      return false;
    }
    return true;
  });

  renderEvents();
  renderCalendar();
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    setupEventListeners();
  });
} else {
  loadEvents();
  setupEventListeners();
}

