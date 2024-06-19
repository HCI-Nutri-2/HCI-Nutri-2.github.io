document.addEventListener("DOMContentLoaded", function() {
    tryRun(loadHeader)
    tryRun(loadCarousel.init)
});

const imgsPath = '../global/imgs/'
const iconsPath = '../global/icons/'
const fontsPath = '../global/fonts/'
const dataPath = '../global/data/'

var menu = fetchData('../global/data/menu.json', 'menu')
var cart = fetchData('../global/data/cart.json', 'cart')

const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

function loadHeader() {
    const fill = `  
        <img src="../global/imgs/nutri.png" class="imgh30 rem button" onclick="navTo('../index.html')">
        <img src="../global/imgs/n.png" class="imgh30 add button" onclick="navTo('../index.html')">
        <div class="search-bar container center rad5 bcol2 f1">
            <input type="text" class="res-input bcol-tsp f1 mont ts15" placeholder="Search">
            <img src="../global/icons/search.svg">
        </div>
        <div class="button-wrapper container gap15"></div>
    `;
    header.innerHTML = fill;

    const wrapper = header.querySelector('.button-wrapper');
    const searchBar = header.querySelector('.search-bar');
    const searchInput = searchBar.querySelector('input');

    let isLoggedIn = localStoreGet("isLoggedIn");
    let isAdmin = localStoreGet("isAdmin");
    const curr = currPageName();

    const menu = `<div class="res-button button bcol2 rad5 gap10" onclick="navTo('../index.html')"><img src="../global/icons/home.png"><p class="mont rem720">Menu</p></div>`;
    const history = `<div class="res-button button bcol2 rad5 gap10" onclick="navTo('../history/history.html')"><img src="../global/icons/history.png"><p class="mont rem720">History</p></div>`;
    const user = `<div class="res-button button bcol2 rad5 gap10" onclick="navTo('../profile/profile.html')"><img src="../global/icons/user.png"><p class="mont rem1280">You</p></div>`;
    const admin = `<div class="res-button button bcol2 rad5 gap10" onclick="navTo('../admin/admin.html')"><img src="../global/icons/admin.png"><p class="mont rem1280">Admin</p></div>`;
    
    wrapper.innerHTML = '<div class="button bcol1 col3 pad10 rad5 mont bold" onclick="(logout())" >Sign out</div>';
    
    if (isLoggedIn === 'true') {
        if (curr === "menu") {
            wrapper.innerHTML += history + user;
            searchInput.placeholder = 'Search a Dish';
        } else if (curr === "history") {
            wrapper.innerHTML += menu + user;
            searchInput.placeholder = 'Search a Transaction';
        } else if (curr === "user") {
            wrapper.innerHTML += menu + history;
            searchBar.classList.add('none');
        } else if (curr === "faq") {
            wrapper.innerHTML += menu + history + user;
            searchBar.classList.add('none');
        } else {
            wrapper.innerHTML += menu + history + user;
        }
        if (isAdmin === 'true' && curr != "admin") {
            wrapper.innerHTML += admin;
        }
    } else {
        document.getElementById('loginModal').classList.remove('none')
        wrapper.innerHTML = `<button class="res-button button bcol1 col3 pad10 rad5 mont bold" onclick="(toggleLogin())">Login / Sign Up</button>`;
    }
}

var loadCarousel = (function() {
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
})()

function findMenuItem(itemId) {
    return menu.find(cat => cat.id === itemId.split('-')[0])?.items.find(it => it.id === itemId) ?? null
}

// utility functions
function tryRun (fn) {try { fn() } catch (error) {console.error()}}

function lgnSts() {return localStoreGet('isLoggedIn') === 'true';}
function logout() {
    localStoreSet('isLoggedIn', 'false');
    localStoreSet('isAdmin', 'false');
    navTo('../index.html')
}

function localStoreGet (key, def = null) {
    if (typeof(Storage) !== "undefined") {
        let val = localStorage.getItem(key)
        if (val === null) {val = def}
        return val
    }return def
}
function localStoreSet (key, val) {if (typeof(Storage) !== "undefined") {localStorage.setItem(key, val)}}
function localStoreRem (key) {
    localStorage.removeItem(key)
}

function fetchData (path, key) {
    return fetch(path)
        .then(res => res.json())
        .then(json => {
            localStoreSet(key, JSON.stringify(json));
            return json;
        })
        .catch(error => {
            return error;
        });
}

function currPageName () {return document.body.id}

function navTo (path, mode = 0) {mode? window.location.replace(path) : window.location.href = path}

function rem (item) {item.remove()}   

// modal click handlers
function toggleModal (modal, type = 'flex') {
    const div = document.getElementById(modal)
    div.style.display = (div.style.display === 'none') ? type : 'none';
}

const scrollInto = (element) => document.getElementById(element)?.scrollIntoView?.({ behavior: 'smooth', block: 'start', inline: 'nearest' })