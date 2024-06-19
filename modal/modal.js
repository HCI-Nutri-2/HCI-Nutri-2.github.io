document.addEventListener("DOMContentLoaded", function() {
    
});

const login = document.getElementById("login-modal");

function toggleLogin(state = false) {
    if (state === true) {localStoreSet("isLoggedIn", "true");}
    toggleModal(login);
    loginStates('login');
}

handleClick(login, toggleLogin, false);

function loginStates(show) {
    login.querySelector('#login').classList.add('none');
    login.querySelector('#reset').classList.add('none');
    login.querySelector('#regis').classList.add('none');

    if (show === 'reset') {resetStates('reset-1');}
    login.querySelector('#' + show).classList.remove('none');
}

function resetStates(show) {
    login.querySelector('#reset-1').classList.add('none');
    login.querySelector('#reset-2').classList.add('none');
    login.querySelector('#reset-3').classList.add('none');

    login.querySelector('#' + show).classList.remove('none');
}

const addons = document.getElementById("addons-modal");
handleClick(addons, toggleAddons)
function toggleAddons (element = addons) {
    toggleModal(addons)
    addons.querySelector('img').src = element.querySelector('img').src
    const name = addons
    const desc = addons
    

}
function toggleAddonsStates (show) {
    addons
}