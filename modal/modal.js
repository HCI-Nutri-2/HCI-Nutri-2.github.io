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
    // Hide all sections first
    document.getElementById('login').classList.add('none');
    document.getElementById('reset').classList.add('none');
    document.getElementById('regis').classList.add('none');

    // Show the section that needs to be displayed
    if (show === 'reset'){toggleResStates('reset-form1')}
    document.getElementById(show).classList.remove('none');
}

function toggleResStates (show) {
    // Hide all sections first
    document.getElementById('reset-form1').classList.add('none');
    document.getElementById('reset-form2').classList.add('none');
    document.getElementById('reset-form3').classList.add('none');

    // Show the section that needs to be displayed
    document.getElementById(show).classList.remove('none');
}