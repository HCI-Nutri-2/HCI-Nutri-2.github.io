document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById('slider');
    var buttons = document.querySelectorAll('.slider-nav button');
    var currentIndex = 0;
    var totalSlides = slider.children.length;
    var slideWidth = slider.offsetWidth;
    var wait = 3000;

    function moveToSlide(change) {
        currentIndex += change;
        slideWidth = slider.offsetWidth;
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
        } else {
            moveToSlide(1);
        }
    }, wait);

    slider.addEventListener('mouseenter', function () {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', function () {
        autoSlideInterval = setInterval(function() {
            if (currentIndex === totalSlides - 1) {
                moveToSlide(-currentIndex);
            } else {
                moveToSlide(1);
            }
        }, wait);
    });
});

document.getElementById('sendOtpBtn').addEventListener('click', function() {
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

        var otpInput = otpInputDiv.querySelector('input');
        otpInput.addEventListener('focus', function() {
            otpInputDiv.querySelector('label').style.visibility = 'hidden';
        });
        otpInput.addEventListener('blur', function() {
            if (otpInput.value === '') {
                otpInputDiv.querySelector('label').style.visibility = 'visible';
            }
        });

        otpInput.addEventListener('input', function() {
            if (!document.getElementById('confirmotpBtn')) {
                var confirmotpButton = document.createElement('button');
                confirmotpButton.id = 'confirmotpBtn';
                confirmotpButton.type = 'button';
                confirmotpButton.innerHTML = 'Confirm OTP';
                document.getElementById('otpSection').appendChild(confirmotpButton);

                confirmotpButton.addEventListener('click', function() {
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

                    document.getElementById('retypePasswordInput').addEventListener('input', function() {
                        if (!document.getElementById('changePasswordBtn')) {
                            var changePasswordButton = document.createElement('button');
                            changePasswordButton.id = 'changePasswordBtn';
                            changePasswordButton.type = 'button';
                            changePasswordButton.innerHTML = 'Change Password';
                            document.getElementById('otpSection').appendChild(changePasswordButton);

                            changePasswordButton.addEventListener('click', function() {
                                window.location.href = '../login/login.html';
                            });
                        }
                    });
                });
            }
        });

        document.getElementById('otpSection').appendChild(otpContainer);
    }
});

document.getElementById('email').addEventListener('focus', function() {
    this.parentElement.querySelector('label').style.visibility = 'hidden';
});
document.getElementById('email').addEventListener('blur', function() {
    if (this.value === '') {
        this.parentElement.querySelector('label').style.visibility = 'visible';
    }
});
