// Admin Event Management System

const ADMIN_USERNAME = 'Ajah';
const ADMIN_PASSWORD = '123';
const EVENTS_STORAGE_KEY = 'doral_events';

// Check authentication
function checkAuth() {
  const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
  if (!isAuthenticated) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Initialize admin page
function initAdmin() {
  if (!checkAuth()) return;

  loadEvents();
  setupEventListeners();
}

// Load events from storage
function loadEvents() {
  const events = getEvents();
  displayEvents(events);
}

// Get events from localStorage
function getEvents() {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save events to localStorage
function saveEvents(events) {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  // Also update the events.json file reference (for GitHub sync)
  updateEventsFile(events);
}

// Display events list
function displayEvents(events) {
  const eventsList = document.getElementById('events-list');
  if (!eventsList) return;

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  if (sortedEvents.length === 0) {
    eventsList.innerHTML = '<p>No events yet. Click "Add New Event" to create one.</p>';
    return;
  }

  eventsList.innerHTML = sortedEvents.map((event, index) => {
    const date = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return `
      <div class="event-item" onclick="editEvent(${index})">
        <h3>${event.title || 'Untitled Event'}</h3>
        <div class="event-date">${date}</div>
        <div class="event-preview">${event.text ? event.text.substring(0, 100) + '...' : 'No description'}</div>
      </div>
    `;
  }).join('');
}

// Setup event listeners
function setupEventListeners() {
  const addBtn = document.getElementById('add-event-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const eventForm = document.getElementById('event-form');
  const saveBtn = document.getElementById('save-event-btn');
  const cancelBtn = document.getElementById('cancel-event-btn');
  const deleteBtn = document.getElementById('delete-event-btn');

  if (addBtn) {
    addBtn.addEventListener('click', () => showEventForm());
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', saveEvent);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', cancelEdit);
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteEvent);
  }
}

// Show event form
function showEventForm(eventIndex = null) {
  const form = document.getElementById('event-form');
  const formTitle = document.getElementById('form-title');
  const deleteBtn = document.getElementById('delete-event-btn');
  
  if (!form) return;

  form.classList.remove('hidden');
  form.scrollIntoView({ behavior: 'smooth' });

  if (eventIndex !== null) {
    form.dataset.eventIndex = eventIndex;
    const events = getEvents();
    const event = events[eventIndex];
    
    document.getElementById('event-title').value = event.title || '';
    document.getElementById('event-date').value = event.date || '';
    document.getElementById('event-names').value = event.names || '';
    document.getElementById('event-text').value = event.text || '';
    
    if (formTitle) formTitle.textContent = 'Edit Event';
    if (deleteBtn) deleteBtn.style.display = 'inline-block';
  } else {
    form.dataset.eventIndex = '';
    document.getElementById('event-title').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-names').value = '';
    document.getElementById('event-text').value = '';
    
    if (formTitle) formTitle.textContent = 'Create New Event';
    if (deleteBtn) deleteBtn.style.display = 'none';
  }
}

// Edit event
function editEvent(index) {
  showEventForm(index);
}

// Save event
function saveEvent() {
  const form = document.getElementById('event-form');
  if (!form) return;

  const eventIndex = form.dataset.eventIndex;
  const title = document.getElementById('event-title').value.trim();
  const date = document.getElementById('event-date').value;
  const names = document.getElementById('event-names').value.trim();
  const text = document.getElementById('event-text').value.trim();

  if (!title || !date) {
    alert('Please fill in at least the title and date.');
    return;
  }

  const events = getEvents();
  const eventData = { title, date, names, text };

  if (eventIndex !== '' && eventIndex !== null) {
    // Update existing event
    events[parseInt(eventIndex)] = eventData;
  } else {
    // Add new event
    events.push(eventData);
  }

  saveEvents(events);
  loadEvents();
  cancelEdit();
  
  alert('Event saved successfully!');
}

// Cancel edit
function cancelEdit() {
  const form = document.getElementById('event-form');
  if (form) {
    form.classList.add('hidden');
    form.dataset.eventIndex = '';
  }
}

// Delete event
function deleteEvent() {
  const form = document.getElementById('event-form');
  if (!form) return;

  const eventIndex = form.dataset.eventIndex;
  if (eventIndex === '' || eventIndex === null) return;

  if (!confirm('Are you sure you want to delete this event?')) return;

  const events = getEvents();
  events.splice(parseInt(eventIndex), 1);
  saveEvents(events);
  loadEvents();
  cancelEdit();
  
  alert('Event deleted successfully!');
}

// Update events file (for GitHub sync)
function updateEventsFile(events) {
  // This will be used by GitHub Actions to sync
  // For now, we store in localStorage and can export
  const dataStr = JSON.stringify(events, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  // Store reference for GitHub Actions
  localStorage.setItem('events_json_export', dataStr);
}

// Logout
function logout() {
  sessionStorage.removeItem('admin_authenticated');
  window.location.href = 'index.html';
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}

// Make editEvent available globally
window.editEvent = editEvent;

