// Global DOMConLoaded
document.addEventListener('DOMContentLoaded', function () {
    tryRun(loadHeader);
    tryRun(CarouselModule.init);
    tryRun(loadAddons);
});

const imgsPath = '../global/imgs/'
const iconsPath = '../global/icons/'
const fontsPath = '../global/fonts/'
const dataPath = '../global/data/'

const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

// scroll to element
function scrollToE (element, offset) {
    var thing = document.getElementById(element);
    if (thing) {
        thing.scrollIntoView({  behavior: 'smooth', block: 'start', inline: 'nearest', offsetTop: offset })
    }
}

// header logic
function loadHeader () {
    const fill = `  <img src="../global/icons/rubik.png" class="img35">
                    <div class="search-bar container center rad5 bcol2 f1">
                        <input type="text" placeholder="Search" class="res-input bcol-tsp f1 mont ts15">
                        <img src="../global/icons/search.svg">
                    </div>
                    <div class="button-wrapper container gap15"></div>`
    header.innerHTML = fill
    const wrapper = header.querySelector('.button-wrapper')
    let isLoggedIn = localStoreGet("isLoggedIn")
    let isAdmin = localStoreGet("isAdmin")
    const curr = currPageName()

    const menu = `<div class="res-button button bcol2 rad5" onclick="navTo('../index.html')"><img src="../global/icons/home.png"></div>`
    const history = `<div class="res-button button bcol2 rad5" onclick="navTo('../history/history.html')"><img src="../global/icons/history.png"></div>`
    const user = `<div class="res-button button bcol2 rad5" onclick="navTo('../profile/profile.html')"><img src="../global/icons/user.png"></div>`
    const admin = `<div class="res-button button bcol2 rad5" onclick="navTo('../admin/admin.html')"><img src="../global/icons/settings.png"></div>`
    wrapper.innerHTML = ''

    if (isLoggedIn) {
        if (isAdmin) {
            wrapper.innerHTML += admin
        }
        if (curr === "menu") {
            wrapper.innerHTML += history + user + admin
        } else if (curr === "history") {
            wrapper.innerHTML += menu + user + admin
        } else if (curr === "user") {
            wrapper.innerHTML += menu + history + admin
        } else if (curr === "settings") {
            wrapper.innerHTML += menu + history + user
        } else {
            wrapper.innerHTML += menu + history + user + admin
        }
    }else {
        wrapper.innerHTML = `<button class="res-button button bcol1 col3 pad10 rad5 mont bold" onclick="toggleLogin(true)">Login / Sign Up</button>`
    }
}

// login modal
    var modal = document.getElementById("login-form");

    function toggleLogin(state = false) {
        if (state === true) {localStoreSet("isLoggedIn", "true");}
        modal.style.display = (modal.style.display === 'none') ? 'flex' : 'none';
        toggleStates('login');
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

        if (show === 'reset'){toggleResStates('reset-form1');}
        document.getElementById(show).classList.remove('none');
    }

    function toggleResStates (show) {
        document.getElementById('reset-form1').classList.add('none');
        document.getElementById('reset-form2').classList.add('none');
        document.getElementById('reset-form3').classList.add('none');

        document.getElementById(show).classList.remove('none');
    }

// add-ons modal
const addons = document.getElementById("addons-form");
function toggleAddons(element) {
    addons.style.display = (addons.style.display === 'none') ? 'flex' : 'none';
    const img = addons.querySelector('img');
    img.src = element.querySelector('img').src
}
function loadAddons () {
    const fill = `
    <div class="form-wrapper container rad10 bcol3">

            <div class="vcontainer left-wrapper">
                <div class="container elipsis">
                    <p class="container moorley ts50 col1">Add-ons & Modifications</p>
                </div>
                <div class="container img-container w100 f1 bcol1 rad10 pos-rel">
                    <img src="../global/icons/image-placeholder.png" class="fit-img">
                    <div class="pos-abs container w100 h100" style="box-shadow: inset 0 -80px 50px -40px var(--3)"></div>
                    <div class="item-name-overlay w100 container sbet pos-abs">
                        <div class="vcontainer pad5 lineh15 elipsis">
                            <p class="fonseca ts25 col2">Item Name</p>
                            <p class="mont bold ts10 col1">Item Description</p>
                        </div>
                        <div class="container pad10 down">
                            <input type="number" class="res-input bcol1 col3 pad5 rad10 right mont bold ts15" value="0" max="99" min="0">
                        </div>
                    </div>
                </div>
            </div>

            <div class="vcontainer right-wrapper">
                <div class="container sbet down">
                    <div class="container">
                        <p class="button col2 hov-ul moorley ts50" onclick="">Details</p>
                        <p class="button col2 hov-ul moorley ts50" onclick="">Info</p>
                    </div>
                    <div class="container gap5 col4">
                        <p class="moorley ts25">$</p>
                        <p class="noir ts25">20</p>
                    </div>
                </div>

                <div class="vcontainer f1 gap25">
                    <div class="ovy-a vcontainer f1 bcol4 rad10 pad10">
                        <div id="addons-modal-content" class="vcontainer noir ts15 col3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, officia magnam qui perspiciatis dolor blanditiis quos voluptatem vel perferendis deleniti modi quisquam asperiores assumenda eos quo aperiam distinctio tempora adipisci. Libero, labore minus laudantium porro repellat velit corporis maiores dignissimos voluptates officiis magni, accusantium vel, nostrum aut perspiciatis sunt voluptatem! Fugiat eius aliquid asperiores, repellat cum officia velit iusto omnis pariatur, nobis, mollitia doloremque eum. Nulla atque accusantium sequi eligendi repellendus, saepe optio quo animi distinctio explicabo doloribus odit numquam corporis beatae. Inventore cum, libero sapiente, porro voluptates necessitatibus, aut nulla neque temporibus quod veniam? Saepe totam facere autem velit!?
                        </div>
                    </div>

                    <div class="container sbet gap25 noir ts20">
                        <div onclick="toggleAddons()" class="container button center jcenter bcol2 col3 rad5 noir"><p>Cancel</p></div>
                        <div onclick="toggleAddons()" class="container button center jcenter bcol1 col3 rad5 noir f1 elipsis"><p>Save to Cart</p></div>
                    </div>
                </div>

            </div>

        </div>
    `

    addons.innerHTML += fill;

    window.onclick = function(event) {
        if (event.target == addons) {
            toggleAddons();
        }
    }

}

// Menu click
function menuClick (element) {
    if (localStoreGet("isLoggedIn") === "true") {
        toggleAddons(element);
    }else {
        toggleLogin();
    }
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

// utility functions
function tryRun (fn) {
    try {
        fn();
    } catch (error) {
        console.error(`Error executing function ${fn.name}:`, error);
    }
}

function localStoreGet (key, def = false) {
    if (typeof(Storage) !== "undefined") {
        let val = localStorage.getItem(key);
        if (val === null) {val = def;}
        return val;
    }
    return def;
}

function localStoreSet (key, val) {
    if (typeof(Storage) !== "undefined") {localStorage.setItem(key, val);}
}

function currPageName () {
    return document.body.id;
}

function navTo (location) {
    window.location.href = location;
}