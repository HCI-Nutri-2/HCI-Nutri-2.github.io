function displayItems(categoryName) {
  const title = document.getElementById('list-title');
  const container = document.getElementById('list-container');

  const category = menuData.find(cat => cat.category === categoryName);
  if (!category) return;

  title.textContent = category.category;
  container.innerHTML = '';

  category.items.forEach(item => {
      const template = document.getElementById('item-template').content.cloneNode(true);

      template.querySelector('.name').textContent = item.name;
      template.querySelector('.desc').textContent = item.description;
      template.querySelector('.price').textContent = `$${item.price.toFixed(2)}`;

      container.appendChild(template);
  });
}

function createNav(menu) {
  const navContainer = document.getElementById('nav-container');

  menu.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.category;
      button.classList = "res-button button bcol1 pad15 w100 mont ts20";
      button.addEventListener('click', () => displayItems(category.category));
      navContainer.appendChild(button);
  });
}

function loadContent () {
  const storedMenuData = localStorage.getItem('menuData');
  if (storedMenuData) {
      menuData = JSON.parse(storedMenuData);
      createNav(menuData);
      displayItems(menuData[0].category); // Display the first category by default
  } else {
      // If no data is found in local storage, fetch it from the server
      fetch('../global/data/menu.json')
      .then(response => response.json())
      .then(data => {
          menuData = data.menu;
          createNav(menuData);
          displayItems(menuData[0].category)
      })
      .catch(error => console.error('Error fetching data:', error));
  }
}

function loadModal () {
  const modal = document.getElementById('add-item-modal');
  const btn = document.getElementById('add-item-button');
  const span = document.getElementsByClassName('close')[0];

  // Open the modal
  btn.onclick = function() {
      modal.style.display = 'block';
  }

  // Close the modal
  span.onclick = function() {
      modal.style.display = 'none';
  }

  // Close the modal when clicking outside of it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }

  // Handle form submission
  document.getElementById('add-item-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const category = document.getElementById('category').value;
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const price = parseFloat(document.getElementById('price').value);

      // Find the category in menuData and add the new item
      const categoryData = menuData.find(cat => cat.category === category);
      if (categoryData) {
          categoryData.items.push({
              name: name,
              description: description,
              price: price
          });
      }

      // Close the modal
      modal.style.display = 'none';

      // Reset the form
      document.getElementById('add-item-form').reset();

      // Update the displayed items if the current category is the one updated
      const title = document.getElementById('list-title').textContent;
      if (title === category) {
          displayItems(category);
      }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  let menuData;

  loadContent();
  loadModal();
});