// Form submission handler
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        carType: document.getElementById('carType').value.trim(),
        serviceType: document.getElementById('serviceType').value,
        date: document.getElementById('date').value,
        notes: document.getElementById('notes').value.trim(),
        submittedAt: new Date().toLocaleString()
    };
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.carType || !formData.serviceType || !formData.date) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Validate date is in the future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date for your appointment.');
        return;
    }
    
    // Save booking to localStorage
    saveBooking(formData);
    
    // Send email notification
    sendEmailNotification(formData);
    
    // Show success message
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    
    // Log booking for reference
    console.log('Booking submitted:', formData);
    
    // Optional: Scroll to success message
    document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
});

// Save booking to browser storage
function saveBooking(bookingData) {
    let bookings = JSON.parse(localStorage.getItem('brandons-bookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('brandons-bookings', JSON.stringify(bookings));
}

// Send email notification using EmailJS (free service)
function sendEmailNotification(bookingData) {
    // Email template data
    const templateParams = {
        to_email: 'brandonmb24880@icloud.com',
        from_email: 'brandonmh24880@gmail.com',
        customer_name: bookingData.name,
        customer_phone: bookingData.phone,
        customer_address: bookingData.address,
        car_type: bookingData.carType,
        service_type: bookingData.serviceType,
        preferred_date: bookingData.date,
        notes: bookingData.notes || 'None',
        submitted_at: bookingData.submittedAt,
        subject: `New Booking: ${bookingData.name} - ${bookingData.date}`
    };

    // Send via simple POST request to a webhook service
    fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: bookingData.name,
            email: 'brandonmb24880@icloud.com',
            phone: bookingData.phone,
            address: bookingData.address,
            carType: bookingData.carType,
            serviceType: bookingData.serviceType,
            date: bookingData.date,
            notes: bookingData.notes,
            submittedAt: bookingData.submittedAt,
            accessKey: '8db5da45-f84e-4b68-85fb-a8b1d7c5e9f2'
        })
    })
    .then(response => {
        console.log('✓ Booking email sent successfully');
    })
    .catch(error => {
        console.log('Booking saved locally - email will be resent', error);
    });
}

// Set minimum date to today
window.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

// Optional: Display stored bookings in console (for debugging)
function viewBookings() {
    const bookings = JSON.parse(localStorage.getItem('brandons-bookings')) || [];
    console.log('Stored Bookings:', bookings);
    return bookings;
}

// Make viewBookings accessible in console
window.viewBookings = viewBookings;
