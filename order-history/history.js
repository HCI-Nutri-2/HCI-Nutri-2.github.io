function genRInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRID(date) {
    const year = date.getFullYear();
    const randomPart = () => Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${year}-${randomPart()}-${randomPart()}`;
}

function genRPrice() {
    return 'Rp. ' + (Math.random() * 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
}

function genRDate(refDate) {
    const newDate = new Date(refDate);
    newDate.setDate(refDate.getDate() - Math.floor(Math.random() * 30) + 1);
    return newDate;
}

function formatDate(date) {
    const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function genItems(numContainers, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return console.error("Container element not found!");

    let currentDate = new Date();
    let items = [];

    for (let i = 0; i < numContainers; i++) {
        const randomDate = currentDate = genRDate(currentDate);
        const htmlContent = `
            <div class="vcontainer gap15">
                <div class="item container w100 sbet">
                    <div class="container col3 bold">
                        <p class="a">${genRID(randomDate)}</p>
                        <p class="b">${formatDate(randomDate)}</p>
                        <p class="c">Delivered</p>
                        <p class="d">${genRPrice()}</p>
                    </div>
                    <div class="container gap15">
                        <button class="res-button button bcol-tsp col3 pad5 mont bold ts15 hov-ul">Details</button>
                        <button class="res-button button bcol3 col2 rad5 pad5 mont bold ts15">Order Again</button>
                    </div>
                </div>
                <hr>
            </div>
        `;
        items.push(htmlContent);
    }

    let index = 0;
    const itemsPerBatch = 20;

    function loadMoreItems() {
        for (let i = 0; i < itemsPerBatch && index < items.length; i++, index++) {
            container.innerHTML += items[index];
        }
        if (index >= items.length) {
            observer.unobserve(loadingIndicator);
            loadingIndicator.style.display = 'none';
        }
    }

    const loadingIndicator = document.getElementById('loading');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreItems();
        }
    });

    observer.observe(loadingIndicator);
    loadMoreItems();
}

document.addEventListener('DOMContentLoaded', () => {
    genItems(genRInt(1, 5000), "container");
});
