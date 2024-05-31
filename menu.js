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

var loginButton = document.getElementById('login-header-button');
var orderHistoryButton = document.getElementById('history-header-button');
var accountButton = document.getElementById('account-order-button');

var iframe = document.getElementById('content');

var isLoggedIn = localStorage.getItem('isLoggedIn');

function loginVal () {
    if (isLoggedIn !== null) {
        if (isLoggedIn === 'true') {
            loginButton.style.display = "none";
            orderHistoryButton.style.display = "flex";
            accountButton.style.display = "flex";
        }
    } else {
        isLoggedIn = 'false';
    }
}

window.onload = function() {
    loginVal()
};
