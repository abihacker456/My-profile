/**
 * External JavaScript for:
 * 1. Dynamic copyright year and live date/time display
 * 2. Contact form validation (name, email, subject, message)
 * 3. Dark / Bright theme toggle with localStorage persistence
 *
 * All code runs after the DOM is fully loaded.
 */

window.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. DYNAMIC DATE & YEAR
  // Updates the footer with the current year and a live clock.
  // ============================================================
  function updateDateTime() {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    // Insert the formatted date/time and year into the footer
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
    document.getElementById('year').textContent = now.getFullYear();
  }
  updateDateTime();                         // Run immediately on load
  setInterval(updateDateTime, 1000);        // Then update every second for a live clock

  // ============================================================
  // 2. DARK / BRIGHT THEME TOGGLE
  // Saves the user's preference in localStorage so it persists
  // across page reloads.
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // On page load, check if a theme was previously saved
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme === 'bright') {
    body.classList.add('bright-mode');
    themeToggle.textContent = '☀️';   // Sun icon indicates bright mode is active
  } else {
    // Default: dark mode (no extra class needed)
    themeToggle.textContent = '🌙';   // Moon icon indicates dark mode is active
  }

  // Toggle the theme when the button is clicked
  themeToggle.addEventListener('click', function () {
    if (body.classList.contains('bright-mode')) {
      // Switch to dark mode
      body.classList.remove('bright-mode');
      themeToggle.textContent = '🌙';
      localStorage.setItem('portfolioTheme', 'dark');
    } else {
      // Switch to bright mode
      body.classList.add('bright-mode');
      themeToggle.textContent = '☀️';
      localStorage.setItem('portfolioTheme', 'bright');
    }
  });

  // ============================================================
  // 3. CONTACT FORM VALIDATION
  // Checks all required fields before allowing submission.
  // Displays inline error messages if validation fails.
  // ============================================================
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the form from actually submitting 

    // Retrieve and trim user input
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Error message elements
    const nameError    = document.getElementById('nameError');
    const emailError   = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Clear any previous error messages
    nameError.textContent    = '';
    emailError.textContent   = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    let isValid = true;

    // --- Name validation
    if (name === '') {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(name)) {
      nameError.textContent = 'name must only letters';
      isValid = false;
    }
    
    // --- Email validation ---
    if (email === '') {
      emailError.textContent = 'Please enter your email.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Simple regex for basic email format
      emailError.textContent = 'Please enter a valid email (e.g., user@example.com).';
      isValid = false;
    }

    // --- Subject validation ---
    if (subject === '') {
      subjectError.textContent = 'Please enter a subject.';
      isValid = false;
    }

    // --- Message validation ---
    if (message === '') {
      messageError.textContent = 'Please write your message.';
      isValid = false;
    } 

    // If everything is valid, show a success message and reset the form
    if (isValid) {
      alert('Thank you, ' + name + '! Your message has been sent.\n(Form submission demo – backend not connected.)');
      form.reset();
      // Clear all error messages after a successful "submission"
      nameError.textContent    = '';
      emailError.textContent   = '';
      subjectError.textContent = '';
      messageError.textContent = '';
    }
  });
});
