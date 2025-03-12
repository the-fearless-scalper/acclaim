// Initialize EmailJS
(function () {
    emailjs.init("lCa-PutPhYs6u4_wF"); // Replace with your EmailJS Public Key
})();

// Form validation and submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const targetExam = document.getElementById("targetExam");
    const submitButton = document.getElementById("submitBtn");  // The submit button for the form

    let isValid = true;

    // Clear previous error messages
    clearError(name, "nameError");
    clearError(phone, "phoneError");
    clearError(email, "emailError");
    clearError(targetExam, "targetExamError");

    // Name validation
    if (!name.value.trim()) {
        showError(name, "nameError", "Name is required.");
        isValid = false;
    }

    // Phone validation
    if (!phone.value.trim() || !/^\d{10}$/.test(phone.value)) {
        showError(phone, "phoneError", "Enter a valid 10-digit phone number.");
        isValid = false;
    }

    // Email validation
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, "emailError", "Enter a valid email address.");
        isValid = false;
    }

    // Target Exam validation
    if (!targetExam.value.trim()) {
        showError(targetExam, "targetExamError", "Target Exam is required.");
        isValid = false;
    }

    if (!isValid) return;

    // Show loading state on submit button
    submitButton.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden" > Loading...</span ></div>';
    submitButton.disabled = true; // Disable the button during submission

    // Send email using EmailJS
    try {
        const response = await emailjs.send("service_6jt2osc", "template_saw652p", {
            name: name.value.trim(),
            phone: phone.value.trim(),
            email: email.value.trim(),
            targetExam: targetExam.value.trim(),
        });

        if (response.status === 200) {
            showNotification();
            document.getElementById("contactForm").reset(); // Clear the form on success
        } else {
            alert("Failed to send email. Please try again later.");
        }
    } catch (err) {
        console.error("EmailJS Error:", err);
        alert("An error occurred while sending the email.");
    } finally {
        // Reset button after email is sent or failed
        submitButton.innerHTML = 'Submit'; // Reset the button text
        submitButton.disabled = false; // Re-enable the button
    }
});
function showError(inputElement, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    inputElement.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function clearError(inputElement, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    inputElement.classList.remove("error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
}

// Show the notification
function showNotification() {
    const notification = document.querySelector('.notification');
    const notificationContainer = document.querySelector('.notification-container');

    // Show notification
    notificationContainer.style.display = 'block';

    // Hide notification after 5 seconds
    setTimeout(() => {
        notificationContainer.style.display = 'none';
    }, 5000);
}

// Close notification manually
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
    const notificationContainer = document.querySelector('.notification-container');
    notificationContainer.style.display = 'none';
});