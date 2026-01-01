// Shared Navigation Component
// This creates consistent navigation across all pages

function createNavigation(currentPage = '') {
  const navItems = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'about.html', label: 'About', id: 'about' },
    { 
      href: 'programs.html', 
      label: 'Programs', 
      id: 'programs',
      dropdown: [
        { href: 'programs.html#academic', label: 'Academic Programs' },
        { href: 'programs.html#workforce', label: 'Workforce Development' },
        { href: 'programs.html#college', label: 'College & Career' },
        { href: 'programs.html#support', label: 'Youth Support Services' },
        { href: 'programs.html#enrichment', label: 'Enrichment Programs' },
        { href: 'programs.html#wellness', label: 'Health & Wellness' },
        { href: 'programs.html#leadership', label: 'Youth Leadership' },
        { href: 'programs.html#family', label: 'Family Support' }
      ]
    },
    { href: 'resources.html', label: 'Resources', id: 'resources' },
    { href: 'community.html', label: 'Community', id: 'community' },
    { href: 'get-involved.html', label: 'Get Involved', id: 'get-involved' },
    { href: 'events.html', label: 'Events', id: 'events' }
  ];

  const navHTML = `
    <nav>
      <ul>
        <li class="logo">
          <a href="index.html">
            <img src="assets/logo.png" alt="Doral Scholars Program Logo">
          </a>
        </li>
        ${navItems.map(item => {
          const isActive = currentPage === item.id ? 'active' : '';
          if (item.dropdown) {
            return `
              <li class="nav-item-dropdown">
                <a href="${item.href}" class="${isActive}">${item.label}</a>
                <ul class="dropdown-menu">
                  ${item.dropdown.map(subItem => `
                    <li><a href="${subItem.href}">${subItem.label}</a></li>
                  `).join('')}
                </ul>
              </li>
            `;
          }
          return `<li><a href="${item.href}" class="${isActive}">${item.label}</a></li>`;
        }).join('')}
        <li><a href="https://paypal.com" target="_blank" rel="noopener noreferrer" class="donate-btn">Donate</a></li>
      </ul>
    </nav>
  `;

  return navHTML;
}

function createFooter() {
  return `
    <footer class="social-footer">
      <a href="contact.html" class="connect-btn">Connect With Us</a>
      <div class="social-icons">
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="Facebook">📘</a>
        <a href="#" aria-label="Twitter">🐦</a>
        <a href="#" aria-label="LinkedIn">💼</a>
      </div>
      <div class="footer-actions">
        <a href="admin.html" class="login-btn-footer">Admin</a>
        <button id="login-btn-footer" class="login-btn-footer">Admin Login</button>
      </div>
    </footer>
  `;
}

function createLoginModal() {
  return `
    <div id="login-modal" class="login-modal">
      <div class="login-container">
        <button id="login-close" class="login-close" aria-label="Close">×</button>
        <h3>Admin Login</h3>
        <form id="login-form" class="login-form">
          <input type="text" id="login-username" placeholder="Username" required>
          <input type="password" id="login-password" placeholder="Password" required>
          <button type="submit">Login</button>
          <div id="login-error" class="login-error" style="display: none;"></div>
        </form>
      </div>
    </div>
  `;
}

// Initialize navigation on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    // Navigation is injected via server-side or build process
    // For now, we'll use this for dynamic updates
  });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createNavigation, createFooter, createLoginModal };
}

