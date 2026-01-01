// Programs Page Filtering Logic

const roleCTAs = {
  student: {
    title: 'I\'m a Student',
    description: 'Get matched to programs that fit your goals. Check eligibility, apply, and talk to a mentor.',
    primary: { text: 'Check Eligibility', href: 'get-involved.html?role=student' },
    secondary: { text: 'Talk to a Mentor', href: 'contact.html?interest=student' }
  },
  parent: {
    title: 'I\'m a Parent/Guardian',
    description: 'Enroll your child or schedule an intake call to learn how we can support your family.',
    primary: { text: 'Enroll Now', href: 'get-involved.html?role=parent' },
    secondary: { text: 'Schedule Intake Call', href: 'contact.html?interest=parent' }
  },
  school: {
    title: 'I\'m an Educator',
    description: 'Refer a student or partner with us to bring Doral Scholars programs to your school.',
    primary: { text: 'Partner With Us', href: 'get-involved.html?role=educator' },
    secondary: { text: 'Refer a Student', href: 'contact.html?interest=school' }
  },
  community: {
    title: 'I\'m a Community Member',
    description: 'Volunteer, mentor students, or support our mission. Make a difference in your community.',
    primary: { text: 'Volunteer', href: 'get-involved.html?role=volunteer' },
    secondary: { text: 'Learn More', href: 'about.html' }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const pathButtons = document.querySelectorAll('.path-selector-btn');
  const programCards = document.querySelectorAll('.program-category-card');
  const roleCTABand = document.getElementById('role-cta-band');
  const roleCTAContent = document.getElementById('role-cta-content');

  pathButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      pathButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const selectedPath = this.dataset.path;

      // Filter programs
      programCards.forEach(card => {
        if (selectedPath === 'all') {
          card.style.display = 'block';
        } else {
          const cardCategories = card.dataset.categories.split(',');
          if (cardCategories.includes(selectedPath)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });

      // Show role-specific CTA
      if (selectedPath !== 'all' && roleCTAs[selectedPath]) {
        const cta = roleCTAs[selectedPath];
        roleCTAContent.innerHTML = `
          <h3 style="color: var(--doral-red); margin-bottom: 1rem;">${cta.title}</h3>
          <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">${cta.description}</p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${cta.primary.href}" class="btn btn-primary">${cta.primary.text}</a>
            <a href="${cta.secondary.href}" class="btn btn-secondary">${cta.secondary.text}</a>
          </div>
        `;
        roleCTABand.style.display = 'block';
      } else {
        roleCTABand.style.display = 'none';
      }

      // Smooth scroll to top of programs section
      document.getElementById('program-categories').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});

