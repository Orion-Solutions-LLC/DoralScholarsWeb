// Shared Navigation Structure - Access Village Navigation
// This generates consistent navigation across all pages

function generateNavigation(currentPage = '') {
  const navStructure = {
    home: { href: 'index.html', label: 'Home' },
    programs: {
      href: 'programs.html',
      label: 'Programs',
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
    resources: {
      href: 'resources.html',
      label: 'Resources',
      dropdown: [
        { href: 'resources.html#healthcare', label: 'Healthcare Network' },
        { href: 'resources.html#professional-services', label: 'Professional Services' },
        { href: 'resources.html#support-programs', label: 'Support Programs' },
        { href: 'resources.html#community-resources', label: 'Community Resources' },
        { href: 'resources.html#provider-directory', label: 'Provider Directory' }
      ]
    },
    community: {
      href: 'community.html',
      label: 'Community',
      dropdown: [
        { href: 'community.html#success-stories', label: 'Success Stories' },
        { href: 'community.html#testimonials', label: 'Client Testimonials' },
        { href: 'community.html#program-impact', label: 'Program Impact' },
        { href: 'community.html#partner-highlights', label: 'Partner Highlights' },
        { href: 'community.html#annual-impact', label: 'Annual Impact' }
      ]
    },
    getInvolved: {
      href: 'get-involved.html',
      label: 'Get Involved',
      dropdown: [
        { href: 'get-involved.html#student-registration', label: 'Student Registration' },
        { href: 'get-involved.html#parent-registration', label: 'Parent Registration' },
        { href: 'get-involved.html#school-partnerships', label: 'School Partnerships' },
        { href: 'get-involved.html#volunteer', label: 'Volunteer Opportunities' },
        { href: 'get-involved.html#donate', label: 'Donation Programs' },
        { href: 'get-involved.html#partnerships', label: 'Partnership Options' }
      ]
    },
    events: { href: 'events.html', label: 'Events' },
    contact: { href: 'contact.html', label: 'Contact' }
  };

  let navHTML = `
    <nav>
      <ul>
        <li class="logo">
          <a href="index.html">
            <img src="assets/logo.png" alt="Doral Scholars Program Logo">
          </a>
        </li>
  `;

  // Add navigation items
  Object.keys(navStructure).forEach(key => {
    const item = navStructure[key];
    const isActive = currentPage === key ? 'active' : '';
    
    if (item.dropdown) {
      navHTML += `
        <li class="nav-item-dropdown">
          <a href="${item.href}" class="${isActive}">${item.label}</a>
          <ul class="dropdown-menu">
      `;
      item.dropdown.forEach(subItem => {
        navHTML += `<li><a href="${subItem.href}">${subItem.label}</a></li>`;
      });
      navHTML += `
          </ul>
        </li>
      `;
    } else {
      navHTML += `<li><a href="${item.href}" class="${isActive}">${item.label}</a></li>`;
    }
  });

  // Add Contact and Donate buttons
  navHTML += `
        <li><a href="contact.html" class="contact-btn">Contact</a></li>
        <li><a href="https://paypal.com" target="_blank" rel="noopener noreferrer" class="donate-btn">Donate</a></li>
      </ul>
    </nav>
  `;

  return navHTML;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateNavigation };
}

