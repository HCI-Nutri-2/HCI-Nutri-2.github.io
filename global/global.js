// scroll to element
function scrollToE (element, offset) {
    var thing = document.getElementById(element);
    if (thing) {
        thing.scrollIntoView({  behavior: 'smooth', block: 'start', inline: 'nearest', offsetTop: offset })
    }
}

function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}

function currPageName() {
    return window.location.pathname.substring(path.lastIndexOf('/') + 1).replace('.html', '');
}

function loadHeader () {
    const login = document.getElementById('login').addEventListener('click', function() {navigateToPage('../login/login.html');});;
    const menu = document.getElementById('menu').addEventListener('click', function() {navigateToPage('../index.html');});;
    const history = document.getElementById('history').addEventListener('click', function() {navigateToPage('../order-history/history.html');});;
    const account = document.getElementById('account').addEventListener('click', function() {navigateToPage('../profile/profile.html');});;
}

// login form
var modal = document.getElementById("login-form");

function toggleLogin(state = false) {
    if (state === true) {localStorage.setItem("isLoggedIn", "true")}
    modal.style.display = (modal.style.display === 'none') ? 'flex' : 'none';
    toggleStates('login')
}

window.onclick = function(event) {
    if (event.target == modal) {
        toggleLogin();
    }
}   

function toggleStates (show) {
    document.getElementById('login').classList.add('none');
    document.getElementById('reset').classList.add('none');
    document.getElementById('regis').classList.add('none');

    document.getElementById(show).classList.remove('none');
    if (show === 'reset'){toggleResStates('reset-form1')}
}

function toggleResStates (show) {
    document.getElementById('reset-form1').classList.add('none');
    document.getElementById('reset-form2').classList.add('none');
    document.getElementById('reset-form3').classList.add('none');

    document.getElementById(show).classList.remove('none');
}

// Carousel
var CarouselModule = (function() {
    function updateButtons(nav, index) {
        nav.querySelectorAll('button').forEach((btn, i) => btn.classList.toggle('active', i === index));
    }

    function moveToSlide(slider, nav, total, index, change) {
        index = (index + change + total) % total;
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${index * slider.offsetWidth}px)`;
        updateButtons(nav, index);
        return index;
    }

    function reupdate(slider, index) {
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${index * slider.offsetWidth}px)`;
    }

    function initCarousel(carousel) {
        var slider = carousel.querySelector('.slider');
        var nav = carousel.querySelector('.slider-nav');
        var total = slider.children.length;
        var index = 0, wait = 5000;

        for (let i = 0; i < total; i++) {
            let btn = document.createElement('button');
            btn.addEventListener('click', () => index = moveToSlide(slider, nav, total, index, i - index));
            nav.appendChild(btn);
        }

        updateButtons(nav, index);
        setInterval(() => index = moveToSlide(slider, nav, total, index, 1), wait);
        window.addEventListener('resize', () => reupdate(slider, index));
    }

    return {
        init: function() {
            var carousels = document.querySelectorAll('.carousel');
            if (carousels.length > 0) {
                carousels.forEach(initCarousel);
            }
        }
    };
})();

if (typeof(Storage) !== "undefined") {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        isLoggedIn = false;
    }
} else {
    console.log("Sorry, your browser does not support web storage...");
}

// Global DOMConLoaded
document.addEventListener('DOMContentLoaded', function () {
    CarouselModule.init();
    loadHeader();
});