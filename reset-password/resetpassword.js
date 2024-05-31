document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById('slider');
    var buttons = document.querySelectorAll('.slider-nav button');
    var currentIndex = 0;
    var totalSlides = slider.children.length;
    var slideWidth = slider.offsetWidth;

    var wait = 3000

    function moveToSlide(change) {
        currentIndex += change;
        slideWidth = slider.offsetWidth
        var translation = currentIndex * slideWidth;
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${translation}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        buttons.forEach(function (button, index) {
            button.classList.toggle('active', index === currentIndex);
        });
    }

    buttons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            moveToSlide(index - currentIndex);
        });
    });

    var autoSlideInterval = setInterval(function() { 
        if (currentIndex === totalSlides - 1) {
            moveToSlide(-currentIndex);
        }else {
            moveToSlide(1);
        }
    }, wait);

    slider, buttons.addEventListener('mouseenter', function () {
        clearInterval(autoSlideInterval);
    });

    slider, buttons.addEventListener('mouseleave', function () {
        autoSlideInterval = setInterval(function() {
            if (currentIndex === totalSlides - 1) {
                moveToSlide(-currentIndex);
            }else {
                moveToSlide(1);
            }
        }, wait);
    });
});

document.getElementById('sendOtpBtn').addEventListener('click', function() {
    // Hide the "Go back? Login" button
    document.querySelector('.goback').style.display = 'none';

    if (!document.getElementById('otpInput')) {
        var otpContainer = document.createElement('div');
        otpContainer.className = 'otp-container';

        var otpInputDiv = document.createElement('div');
        otpInputDiv.className = 'inputbox';
        otpInputDiv.innerHTML = `
            <input type="text" id="otpInput" required>
            <label for="otpInput">OTP</label>
        `;
        otpContainer.appendChild(otpInputDiv);

        var resendOtpButton = document.createElement('button');
        resendOtpButton.id = 'resendOtpBtn';
        resendOtpButton.type = 'button';
        resendOtpButton.innerHTML = 'Resend OTP';
        otpContainer.appendChild(resendOtpButton);

        // Add event listeners to toggle label visibility for OTP input
        var otpInput = otpInputDiv.querySelector('input');
        otpInput.addEventListener('focus', function() {
            otpInputDiv.querySelector('label').style.visibility = 'hidden';
        });
        otpInput.addEventListener('blur', function() {
            if (otpInput.value === '') {
                otpInputDiv.querySelector('label').style.visibility = 'visible';
            }
        });

        // Add event listener to OTP input to show the "Change Password" button
        otpInput.addEventListener('input', function() {
            // Check if the "Change OTP" button already exists
            if (!document.getElementById('changePasswordBtn')) {
                var changePasswordButton = document.createElement('button');
                changePasswordButton.id = 'changePasswordBtn';
                changePasswordButton.type = 'button';
                changePasswordButton.innerHTML = 'Change OTP';
                document.getElementById('otpSection').appendChild(changePasswordButton);

                // Add event listener to the "Change OTP" button
                changePasswordButton.addEventListener('click', function() {
                    // Show the password labels
                    var newPasswordDiv = document.createElement('div');
                    newPasswordDiv.className = 'inputbox';
                    newPasswordDiv.innerHTML = `
                        <input type="password" id="newPasswordInput" required>
                        <label for="newPasswordInput">New Password</label>
                    `;
                    document.getElementById('otpSection').appendChild(newPasswordDiv);

                    var retypePasswordDiv = document.createElement('div');
                    retypePasswordDiv.className = 'inputbox';
                    retypePasswordDiv.innerHTML = `
                        <input type="password" id="retypePasswordInput" required>
                        <label for="retypePasswordInput">Re-type Password</label>
                    `;
                    document.getElementById('otpSection').appendChild(retypePasswordDiv);

                    // Add event listeners for new password input fields
                    var newPasswordInput = newPasswordDiv.querySelector('input');
                    newPasswordInput.addEventListener('focus', function() {
                        this.parentElement.querySelector('label').style.visibility = 'hidden';
                    });
                    newPasswordInput.addEventListener('blur', function() {
                        if (this.value === '') {
                            this.parentElement.querySelector('label').style.visibility = 'visible';
                        }
                    });

                    var retypePasswordInput = retypePasswordDiv.querySelector('input');
                    retypePasswordInput.addEventListener('focus', function() {
                        this.parentElement.querySelector('label').style.visibility = 'hidden';
                    });
                    retypePasswordInput.addEventListener('blur', function() {
                        if (this.value === '') {
                            this.parentElement.querySelector('label').style.visibility = 'visible';
                        }
                    });

                    // Add event listener to show the second "Change Password" button
                    document.getElementById('retypePasswordInput').addEventListener('input', function() {
                        if (!document.getElementById('changePasswordBtn2')) {
                            var changePasswordButton2 = document.createElement('button');
                            changePasswordButton2.id = 'changePasswordBtn2';
                            changePasswordButton2.type = 'button';
                            changePasswordButton2.innerHTML = 'Change Password';
                            document.getElementById('otpSection').appendChild(changePasswordButton2);
                        }
                    });
                });
            }
        });

        document.getElementById('otpSection').appendChild(otpContainer);
    }
});

// Add event listeners for other input fields
document.getElementById('email').addEventListener('focus', function() {
    this.parentElement.querySelector('label').style.visibility = 'hidden';
});
document.getElementById('email').addEventListener('blur', function() {
    if (this.value === '') {
        this.parentElement.querySelector('label').style.visibility = 'visible';
    }
});
