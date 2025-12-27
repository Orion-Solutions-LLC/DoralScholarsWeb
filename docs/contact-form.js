// Contact Form Handler
// Currently mocks email sending - ready for future email integration to selbykallen@gmail.com

const CONTACT_EMAIL = 'selbykallen@gmail.com';

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('contact-form-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const reason = document.getElementById('contact-reason').value;
      const message = document.getElementById('contact-message').value.trim();
      
      // Validate required fields
      if (!name || !reason || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      // Validate that at least email or phone is provided
      if (!email && !phone) {
        showMessage('Please provide either an email address or phone number.', 'error');
        return;
      }
      
      // Email validation if provided
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showMessage('Please enter a valid email address.', 'error');
          return;
        }
      }
      
      // Phone validation if provided
      if (phone) {
        const phoneRegex = /^[\d\s\(\)\-\+\.]+$/;
        if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
          showMessage('Please enter a valid phone number.', 'error');
          return;
        }
      }
      
      // Prepare form data
      const formData = {
        name: name,
        email: email || 'Not provided',
        phone: phone || 'Not provided',
        reason: reason,
        message: message,
        timestamp: new Date().toISOString()
      };
      
      // For now, just show success message
      // In the future, this will send an email to selbykallen@gmail.com
      console.log('Form data to be sent:', formData);
      console.log('Would send email to:', CONTACT_EMAIL);
      
      // Mock email sending
      showMessage('Thank you for your message! We\'ll get back to you soon. (Note: Email functionality will be connected soon)', 'success');
      
      // Reset form
      contactForm.reset();
      
      // In the future, uncomment and implement this:
      /*
      sendContactEmail(formData)
        .then(() => {
          showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
          contactForm.reset();
        })
        .catch((error) => {
          showMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
          console.error('Error sending email:', error);
        });
      */
    });
  }
  
  function showMessage(text, type) {
    if (formMessage) {
      formMessage.textContent = text;
      formMessage.className = 'contact-form-message ' + type;
      formMessage.style.display = 'block';
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Hide after 5 seconds
      setTimeout(function() {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }
  
  // Future function for sending email
  /*
  async function sendContactEmail(formData) {
    // This will be implemented with a backend service or email API
    // Options: EmailJS, Formspree, SendGrid, AWS SES, etc.
    
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: CONTACT_EMAIL,
        subject: `Contact Form: ${formData.reason} - ${formData.name}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          Phone: ${formData.phone}
          Reason: ${formData.reason}
          Message: ${formData.message}
          Submitted: ${formData.timestamp}
        `
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return response.json();
  }
  */
});

