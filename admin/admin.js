document.addEventListener('DOMContentLoaded', function() {
    console.log(menu)
    tryRun(genAdminNav)
    tryRun(genAdminFill(menu[0].id))
});

const edit = document.getElementById('editModal')
const cate = document.getElementById('cateModal')

function genAdminNav() {
    const nav = document.getElementById('nav');
    menu.forEach(category => {
      nav.insertAdjacentHTML('beforeend', `
        <div class="button pad10 rad5 bcol2 col3" onclick="genAdminFill('${category.id}')">
          <p class="mont bold">${category.category}</p>
        </div>`)
    })
}

function genAdminFill (categoryId) {
    const title = document.getElementById('title')
    const wrapper = document.getElementById('items-wrapper')
    const category = menu.find(cat => cat.id === categoryId)
    title.textContent = category.category

    wrapper.innerHTML = ''

    category.items.forEach(item => {
        wrapper.insertAdjacentHTML('beforeend', `
            <div class="container gap5 sbet center ovx-a">
                <div class="container mont bold col3 ts15 f1 ovx-a">
                    <p class="id">${item.id}</p>
                    <p class="name">${item.name}</p>
                    <p class="price">${item.price}</p>
                    <p class="desc">${item.description}</p>
                </div>
                <div class="container gap10">
                    <button class="res-button button pad5 rad5 bcol3 col1" onclick="editItem('${item.id}')"><p class="ts15 bold mont">Edit</p></button>
                    <button class="res-button button pad5 rad5 bred cwhite" onclick="deleteItem('${item.id}')"><p class="ts15 bold mont">Delete</p></button>
                </div>
            </div>
        `)
    })
}

function editItem (id) {
    const item = findMenuItem(id)
    toggleModal('editModal')
    const wrapper = edit.querySelector('.modal-input-wrapper')

    wrapper.getElementById('editName').textContent
    wrapper.getElementById('editPrice')
    wrapper.getElementById('editDesc')

    console.log(item.id, item.name, item.price, item.description)
}