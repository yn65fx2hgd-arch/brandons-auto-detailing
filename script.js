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