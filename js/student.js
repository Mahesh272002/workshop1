document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
        });
    }

    function nextStep(step) {
        if (validateStep(currentStep)) {
            if (step < steps.length) {
                currentStep = step;
                showStep(currentStep);
            }
        } else {
            alert('Please fill out all required fields.');
        }
    }

    function prevStep(step) {
        if (step >= 0) {
            currentStep = step;
            showStep(currentStep);
        }
    }

    function validateStep(step) {
        const currentStepFields = steps[step].querySelectorAll('input, select');
        for (let field of currentStepFields) {
            if (!field.value) {
                return false;
            }
        }
        return true;
    }

    function submitForm() {
        if (validateStep(currentStep)) {
            const name = document.getElementById('name').value;
            const namePattern = /^[A-Z]+$/;

            if (!namePattern.test(name)) {
                alert('Name should only contain capital letters and no numbers or symbols.');
                return;
            }

            const dob = document.getElementById('dob').value;
            const contact = document.getElementById('contact').value;
            const address = document.getElementById('address').value;
            const gender = document.getElementById('gender').value;

            const formData = `
                Name: ${name}
                Date of Birth: ${dob}
                Contact No.: ${contact}
                Address: ${address}
                Gender: ${gender}
            `;

            alert(`Form submitted successfully!\n\n${formData}`);
            // Reload the page after alert is closed
            window.location.reload();
        } else {
            alert('Please fill out all required fields.');
        }
    }

    window.nextStep = nextStep;
    window.prevStep = prevStep;
    window.submitForm = submitForm;

    showStep(currentStep);
});
