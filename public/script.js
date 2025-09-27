// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const successMessage = document.getElementById('successMessage');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

// Real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);

function validateName() {
    const name = nameInput.value.trim();
    if (name.length === 0) {
        showError(nameInput, nameError, 'Please enter your full name');
        return false;
    } else if (name.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters long');
        return false;
    } else {
        hideError(nameInput, nameError);
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    if (email.length === 0) {
        showError(emailInput, emailError, 'Please enter your email address');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    } else {
        hideError(emailInput, emailError);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.style.display = 'none';
}

// Form submission 
// Replace the form submission part of your JavaScript with this:
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (!isNameValid || !isEmailValid) {
            return;
        }

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            registerNo: document.getElementById('registerNo')?.value?.trim() || '',
            phone: document.getElementById('phone')?.value?.trim() || '',
            organization: document.getElementById('organization')?.value?.trim() || '',
            role: document.getElementById('role')?.value || '',
            experience: document.getElementById('experience')?.value || '',
            interests: document.getElementById('interests')?.value?.trim() || ''
        };

        // Show loading state
        submitBtn.disabled = true;
        btnText.innerHTML = '<span class="loading"></span> Registering...';

        try {
            // Send data to backend API
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // Show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';

                console.log('Registration successful:', result.data);
            } else {
                alert('Registration failed: ' + result.error);
            }

        } catch (error) {
            alert('Registration failed. Please check your connection and try again.');
            console.error('Registration error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Register Now - It\'s Free!';
        }
    });
}
// Load registrations from backend
async function loadRegistrations() {
    try {
        const response = await fetch('/registrations');
        const result = await response.json();
        
        if (result.success) {
            displayRegistrations(result.data);
        } else {
            console.error('Failed to load registrations:', result.error);
        }
    } catch (error) {
        console.error('Error loading registrations:', error);
    }
}

async function toggleRegistrations() {
    const registrationsList = document.getElementById('registrationsList');
    const isVisible = registrationsList.style.display === 'block';
    
    if (isVisible) {
        registrationsList.style.display = 'none';
        document.getElementById('viewRegistrationsBtn').textContent = 'View All Registrations';
    } else {
        await loadRegistrations();
        registrationsList.style.display = 'block';
        document.getElementById('viewRegistrationsBtn').textContent = 'Hide Registrations';
    }
}

function displayRegistrations(registrations) {
    const container = document.getElementById('registrationsContainer');
    
    if (!registrations || registrations.length === 0) {
        container.innerHTML = '<div class="empty-state">No registrations yet. Be the first to register! 🚀</div>';
        return;
    }

    const registrationsHTML = registrations
        .map((reg) => `
            <div class="registration-item">
                <strong>#${reg.registrationNumber}</strong><br>
                <strong>Name:</strong> ${reg.name}<br>
                <strong>Email:</strong> ${reg.email}<br>
                ${reg.phone ? `<strong>Phone:</strong> ${reg.phone}<br>` : ''}
                ${reg.organization ? `<strong>Organization:</strong> ${reg.organization}<br>` : ''}
                ${reg.role ? `<strong>Role:</strong> ${reg.role}<br>` : ''}
                ${reg.experience ? `<strong>Experience:</strong> ${reg.experience}<br>` : ''}
                ${reg.interests ? `<strong>Interests:</strong> ${reg.interests}<br>` : ''}
                <strong>Registered:</strong> ${new Date(reg.timestamp).toLocaleString()}
            </div>
        `).join('');

    container.innerHTML = registrationsHTML;
}

// Initialize registrations display on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load registration count or initial data if needed
    loadRegistrations().then(() => {
        // Only display if registrations list is meant to be visible initially
        if (document.getElementById('registrationsList') && 
            document.getElementById('registrationsList').style.display === 'block') {
            // Registrations will already be loaded and displayed
        }
    });
});