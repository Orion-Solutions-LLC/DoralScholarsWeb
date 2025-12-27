// Login System

const ADMIN_USERNAME = 'Ajah';
const ADMIN_PASSWORD = '123';

// Initialize login form
function initLogin() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Check if already logged in
  if (sessionStorage.getItem('admin_authenticated') === 'true') {
    hideLoginForm();
  }
}

// Handle login
function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const errorMsg = document.getElementById('login-error');

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_authenticated', 'true');
    window.location.href = 'admin.html';
  } else {
    if (errorMsg) {
      errorMsg.textContent = 'Invalid username or password';
      errorMsg.style.display = 'block';
    }
    // Clear password
    document.getElementById('login-password').value = '';
  }
}

// Hide login form
function hideLoginForm() {
  const loginContainer = document.getElementById('login-container');
  if (loginContainer) {
    loginContainer.classList.add('hidden');
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogin);
} else {
  initLogin();
}

