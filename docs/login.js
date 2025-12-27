// Login System

const ADMIN_USERNAME = 'Ajah';
const ADMIN_PASSWORD = '123';

// Initialize login system
function initLogin() {
  const loginForm = document.getElementById('login-form');
  const loginModal = document.getElementById('login-modal');
  const loginBtn = document.getElementById('login-btn-footer');
  const closeBtn = document.getElementById('login-close');
  
  // Setup login button
  if (loginBtn) {
    loginBtn.addEventListener('click', openLoginModal);
  }
  
  // Setup close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLoginModal);
  }
  
  // Setup form submission
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Close modal when clicking outside
  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      if (e.target === loginModal) {
        closeLoginModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
      closeLoginModal();
    }
  });
}

// Open login modal
function openLoginModal() {
  const loginModal = document.getElementById('login-modal');
  if (loginModal) {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

// Close login modal
function closeLoginModal() {
  const loginModal = document.getElementById('login-modal');
  if (loginModal) {
    loginModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear form
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const errorMsg = document.getElementById('login-error');
    
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (errorMsg) {
      errorMsg.style.display = 'none';
      errorMsg.textContent = '';
    }
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
    closeLoginModal();
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

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogin);
} else {
  initLogin();
}

