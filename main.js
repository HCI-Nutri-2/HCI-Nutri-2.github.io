document.addEventListener("DOMContentLoaded", function() {
    tryRun(genMenuNav)
    tryRun(genMenuFill(menu[1].id))
    console.log(menu)
});

function addPopup (text, buttonText, fn = 'rem', color = 3, buttonColor = 0) {
    const uniqueId = 'pop-up-' + Date.now();
    const colors = ['bcol1', 'bcol2', 'bcol3', 'bcol4', 'bcol5', 'red']
    const fill = `  <div id="${uniqueId}" class="pop-up container gap15 pad10 rad15 center sbet f1 ${colors[color % colors.length]}">
                        <p class="mont">${text}</p>
                        <button class="res-button button pad10 rad5 ${colors[buttonColor % colors.length]}" onclick="${fn}"><p class="bold ts15 mont">${buttonText}</p></button>
                    </div>`
    document.getElementById('pop-up-wrapper').innerHTML += fill
    setTimeout(() => {
        const popUp = document.getElementById(uniqueId);
        if (popUp) {
            popUp.remove();
        }
    }, 5000)
}

function verif () {
    if (localStoreGet('isLoggedIn') === 'true') {
        document.getElementById('loginModal').classList.add('none')
    }
}

function toggleLogin(state = false) {
    if (state === true) {
        const user = document.getElementById('usern').value
        const pass = document.getElementById('passw').value
        localStoreSet("isLoggedIn", "true");

        if (user === 'admin' && pass === 'admin') {localStoreSet('isAdmin', 'true')}
        window.location.reload();
    }
    toggleModal('loginModal')
    toggleStates('login');
}

function toggleStates (show) {
    document.getElementById('login').classList.add('none');
    document.getElementById('reset').classList.add('none');
    document.getElementById('regis').classList.add('none');

    if (show === 'reset'){toggleResStates('reset-1');}
    document.getElementById(show).classList.remove('none');
}

function toggleResStates (show) {
    document.getElementById('reset-1').classList.add('none');
    document.getElementById('reset-2').classList.add('none');
    document.getElementById('reset-3').classList.add('none');

    document.getElementById(show).classList.remove('none');
}

function genMenuNav() {
    const nav = document.getElementById('menu-nav')
    menu.forEach(category => {nav.insertAdjacentHTML('beforeend', `<p class="hov-ul" onclick="genMenuFill('${category.id}')">${category.category}</p>`)})
}

function genMenuFill (categoryId) {
    const wrapper = document.getElementById('menu-item-container')
    const category = menu.find(cat => cat.id === categoryId)

    wrapper.innerHTML = ''

    category.items.forEach(item => {
        wrapper.insertAdjacentHTML('beforeend', `
            <div class="item container pos-rel rad5 ovx-h" onclick="menuClick('${item.id}')">
                <img src="../global/data/imgs/${item.id}.png" class="fit-img rad5">
                <div class="w100 h100 pos-abs"></div>
                <p class="item-desc mont pos-abs pad5 ts15 col1 bcol3 w100 elipsis">${item.description}</p>
                <p class="item-name mont pos-abs pad5 bolder col3 ts25 w100 elipsis">${item.name}</p>
            </div>
        `)
    })
}

function toggleAddonsMenu(str) {
    const desc = document.getElementById('addonsDesc')
    const cont = document.getElementById('addons-modal-content')
    if (str === 'desc') {
        desc.classList.remove('none');
        cont.classList.add('none');
      } else {
        desc.classList.add('none');
        cont.classList.remove('none');
      }
}

function menuClick (id) {
    if (localStoreGet('isLoggedIn') === 'false') {
        addPopup('Login / Register to order', 'Here', "toggleModal('loginModal')")
        return
    }
    const item = findMenuItem(id)
    const modal = document.getElementById('addonsModal')
    toggleModal('addonsModal')

    modal.querySelector('#addonsName').textContent = item.name
    modal.querySelector('#addonsDesc').textContent = item.description
    modal.querySelector('#addonsPrice').textContent = item.price
    modal.querySelector('#addonsImg').src = `../global/data/imgs/${item.id}.png`

    modal.querySelector('#addons-buttons').innerHTML = `
    <div onclick="toggleModal('addonsModal')" class="container button center jcenter bcol2 col3 pad10 rad5 mont bold ts15"><p>Cancel</p></div>
    <div onclick="submit('${id}')" class="container button center jcenter bcol1 col3 pad5 rad5 mont bold f1 elipsis"><p>Save to Cart</p></div>`
}

function submit (id) {
    const modal = document.getElementById('addonsModal')
    const amount = modal.querySelector('#addonsAmount').value
    const note = modal.querySelector('#addonsNote').value
    genCartItem(id, amount, note, "none")

}

function genCartItem (id, amount, note,...addons) {
    const item = findMenuItem(id)
    const addon = addons.map(addon => `<p>${addon}</p>`).join('')
    const fill = `
    <div class="cart-item container sbet button bcol2 rad5 pad5">
        <div class="vcontainer f1 mont col3 gap5">
            <div class="container col3 ts20 gap5 center">
                <p>${amount}x</p>
                <p class="bold">${item.name}</p>
            </div>
            <div class="addons ts15 pad5a">${addon}</div>
            <p class="ts10 pad5a">${note}</p>
        </div>
        <div class="vcontainer sbet mont col3 right">
            <p class="bold elipsis">$${Math.floor((item.price * amount)*100)/100}</p>
            <button onclick="remCart(this)" class="res-button button bcol3 col1 mont bold ts15 rad5 pad5"><p>Delete</p></button>
        </div>
    </div>
    `
    document.getElementById('cart-item-wrapper').innerHTML += fill;
}

function remCart (item) {
    let parent = item.parentElement;
    while (parent) {
        if (parent.classList.contains('cart-item')) {
            parent.remove()
        }
        parent = parent.parentElement
    }
}