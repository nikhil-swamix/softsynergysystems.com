// WhatsApp Form Integration
function validateForm(event) {
    event.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value || 'Not specified';
    const message = document.getElementById('message').value.trim();
    const date = new Date().toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const time = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit'
    });
    
    // Validate required fields
    if (!firstName || !lastName || !phone || !email || !message) {
        alert('Please fill in all the required fields before sending your message.');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Validate phone number format (Indian numbers: 10 digits, optional +91 or 91 prefix)
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phoneRegex.test(phoneDigits)) {
        alert('Please enter a valid Indian phone number (10 digits).');
        return false;
    }
    
    // Build formatted WhatsApp message
    const waMessage = `New Contact Form Submission
────────────────────────────

Name: ${firstName} ${lastName}
Phone: ${phone || '[Not Provided]'}
Email: ${email}

Service Interest: ${service}

Message:
${message}

────────────────────────────
Date: ${date} at ${time}
Submitted From: Soft Synergy Systems Pvt. Ltd. Website`;

    // Open WhatsApp with formatted message
    window.open(`https://wa.me/9790823800?text=${encodeURIComponent(waMessage)}`, '_blank');
    
    // Reset form after submission
    document.getElementById('contact-form').reset();
    
    return false;
}
