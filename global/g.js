document.addEventListener("DOMContentLoaded", function() {
if (window.location.pathname.includes('menu.html')) {
    var searchBar = document.getElementById('search-bar');
    if (searchBar) {
    searchBar.style.display = 'flex';
    }
}
});