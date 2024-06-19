function toogleContainer1() {
  document.getElementById('container1').style.display = "block";
  document.getElementById('container2').style.display = "none";
  document.getElementById('container3').style.display = "none";
  document.getElementById('container4').style.display = "none";
}

function toogleContainer2() {
  document.getElementById('container1').style.display = "none";
  document.getElementById('container2').style.display = "block";
  document.getElementById('container3').style.display = "none";
  document.getElementById('container4').style.display = "none";
}

function toogleContainer3() {
  document.getElementById('container1').style.display = "none";
  document.getElementById('container2').style.display = "none";
  document.getElementById('container3').style.display = "block";
  document.getElementById('container4').style.display = "none";
}

function toogleContainer4() {
  document.getElementById('container1').style.display = "none";
  document.getElementById('container2').style.display = "none";
  document.getElementById('container3').style.display = "none";
  document.getElementById('container4').style.display = "block";
}

let cards = ["card1.jpg", "card2.png", "card3.png"];

let equipped_card = 0;
let card = document.getElementById("card1");

function toogleCardLeft() {
  equipped_card -= 1;
  if (equipped_card < 0) equipped_card = 2;

  console.log(cards[equipped_card]);
  card.src = cards[equipped_card];
}

function toogleCardRight() {
  equipped_card += 1;
  if (equipped_card > 2) equipped_card = 0;

  console.log(cards[equipped_card]);
  card.src = cards[equipped_card];
}

var loginButton = document.getElementById('login-header-button');
var orderHistoryButton = document.getElementById('history-header-button');
var accountButton = document.getElementById('account-order-button');

var iframe = document.getElementById('content');

var isLoggedIn = localStorage.getItem('isLoggedIn');

function loginVal() {
  if (isLoggedIn !== null) {
    if (isLoggedIn === 'true') {
      loginButton.style.display = "none";
      orderHistoryButton.style.display = "flex";
      accountButton.style.display = "flex";
    }
  } else {
    isLoggedIn = 'false';
  }
}

window.onload = function() {
  loginVal()
};

// Edit bio
let editNameButton = document.getElementById("edit-name");
let editEmailButton = document.getElementById("edit-email");
let editPhoneButton = document.getElementById("edit-phone");

let editNameContent = document.getElementById("name");
let editEmailContent = document.getElementById("email");
let editPhoneContent = document.getElementById("phone");

let editNameInput = document.getElementById("name-input");
let editEmailInput = document.getElementById("email-input");
let editPhoneInput = document.getElementById("phone-input");

let confirmNameButton = document.getElementById("confirm-name");
let confirmEmailButton = document.getElementById("confirm-email");
let confirmPhoneButton = document.getElementById("confirm-phone");

let cancelNameButton = document.getElementById("cancel-name");
let cancelEmailButton = document.getElementById("cancel-email");
let cancelPhoneButton = document.getElementById("cancel-phone");

function editName() {
  editNameInput.style.display = "inline";
  editNameContent.style.display = "none";
  editNameButton.style.display = "none";
  cancelNameButton.style.display = "inline";
  confirmNameButton.style.display = "inline";
  editNameInput.value = editNameContent.innerHTML;
  editNameInput.focus();
}

function confirmName() {
  cancelNameButton.style.display = "none";
  confirmNameButton.style.display = "none";
  editNameButton.style.display = "inline";
  editNameContent.innerHTML = editNameInput.value;
  editNameInput.style.display = "none";
  editNameContent.style.display = "inline";
}

function cancelName() {
  confirmNameButton.style.display = "none";
  cancelNameButton.style.display = "none";
  editNameButton.style.display = "inline";
  editNameInput.style.display = "none";
  editNameContent.style.display = "inline";
}

function editEmail() {
  editEmailInput.style.display = "inline";
  editEmailContent.style.display = "none";
  editEmailButton.style.display = "none";
  cancelEmailButton.style.display = "inline";
  confirmEmailButton.style.display = "inline";
  editEmailInput.value = editNameContent.innerHTML;
  editEmailInput.focus();
}

function confirmEmail() {
  cancelEmailButton.style.display = "none";
  confirmEmailButton.style.display = "none";
  editEmailButton.style.display = "inline";
  editEmailContent.innerHTML = editEmailInput.value;
  editEmailInput.style.display = "none";
  editEmailContent.style.display = "inline";
}

function cancelEmail() {
  confirmEmailButton.style.display = "none";
  cancelEmailButton.style.display = "none";
  editEmailButton.style.display = "inline";
  editEmailInput.style.display = "none";
  editEmailContent.style.display = "inline";
}

function editPhone() {
  editPhoneInput.style.display = "inline";
  editPhoneContent.style.display = "none";
  editPhoneButton.style.display = "none";
  cancelPhoneButton.style.display = "inline";
  confirmPhoneButton.style.display = "inline"; 
  editPhoneInput.value = editPhoneContent.innerHTML;
  editPhoneInput.focus();
}

function confirmPhone() {
  cancelPhoneButton.style.display = "none";
  confirmPhoneButton.style.display = "none"; 
  editPhoneButton.style.display = "inline";
  editPhoneContent.innerHTML = editPhoneInput.value;
  editPhoneInput.style.display = "none";
  editPhoneContent.style.display = "inline";
}

function cancelPhone() {
  confirmPhoneButton.style.display = "none";
  cancelPhoneButton.style.display = "none";
  editPhoneButton.style.display = "inline";
  editPhoneInput.style.display = "none";
  editPhoneContent.style.display = "inline";
}

// Address
let editAlamat1Button = document.getElementById("alamat1-button-edit");
let editAlamat2Button = document.getElementById("alamat2-button-edit");
let editAlamat3Button = document.getElementById("alamat3-button-edit");
let editAlamat4Button = document.getElementById("alamat4-button-edit");

let alamat1Content = document.getElementById("alamat1");
let alamat2Content = document.getElementById("alamat2");
let alamat3Content = document.getElementById("alamat3");
let alamat4Content = document.getElementById("alamat4");

let cancelAlamat1Button = document.getElementById("alamat1-button-cancel");
let cancelAlamat2Button = document.getElementById("alamat2-button-cancel");
let cancelAlamat3Button = document.getElementById("alamat3-button-cancel");
let cancelAlamat4Button = document.getElementById("alamat4-button-cancel");

let confirmAlamat1Button = document.getElementById("alamat1-button-confirm");
let confirmAlamat2Button = document.getElementById("alamat2-button-confirm");
let confirmAlamat3Button = document.getElementById("alamat3-button-confirm");
let confirmAlamat4Button = document.getElementById("alamat4-button-confirm");

let inputAlamat1 = document.getElementById("alamat1-input");
let inputAlamat2 = document.getElementById("alamat2-input");
let inputAlamat3 = document.getElementById("alamat3-input");
let inputAlamat4 = document.getElementById("alamat4-input");

function editAlamat1() {
  editAlamat1Button.style.display = "none";
  cancelAlamat1Button.style.display = "inline";
  confirmAlamat1Button.style.display = "inline";
  alamat1Content.style.display = "none";
  inputAlamat1.style.display = "inline";
  inputAlamat1.value = alamat1Content.innerHTML;
  inputAlamat1.focus();
}

function confirmAlamat1() {
  cancelAlamat1Button.style.display = "none";
  confirmAlamat1Button.style.display = "none";
  editAlamat1Button.style.display = "inline";
  alamat1Content.innerHTML = inputAlamat1.value;
  inputAlamat1.style.display = "none";
  alamat1Content.style.display = "inline";
}

function cancelAlamat1() {
  confirmAlamat1Button.style.display = "none";
  cancelAlamat1Button.style.display = "none";
  editAlamat1Button.style.display = "inline";
  inputAlamat1.style.display = "none";
  alamat1Content.style.display = "inline";
}

function editAlamat2() {
  editAlamat2Button.style.display = "none";
  cancelAlamat2Button.style.display = "inline";
  confirmAlamat2Button.style.display = "inline";
  alamat2Content.style.display = "none";
  inputAlamat2.style.display = "inline";
  inputAlamat2.value = alamat2Content.innerHTML;
  inputAlamat2.focus();
}

function confirmAlamat2() {
  cancelAlamat2Button.style.display = "none";
  confirmAlamat2Button.style.display = "none";
  editAlamat2Button.style.display = "inline";
  alamat2Content.innerHTML = inputAlamat2.value;
  inputAlamat2.style.display = "none";
  alamat2Content.style.display = "inline";
}

function cancelAlamat2() {
  confirmAlamat2Button.style.display = "none";
  cancelAlamat2Button.style.display = "none";
  editAlamat2Button.style.display = "inline";
  inputAlamat2.style.display = "none";
  alamat2Content.style.display = "inline";
}

function editAlamat3() {
  editAlamat3Button.style.display = "none";
  cancelAlamat3Button.style.display = "inline";
  confirmAlamat3Button.style.display = "inline";
  alamat3Content.style.display = "none";
  inputAlamat3.style.display = "inline";
  inputAlamat3.value = alamat3Content.innerHTML;
  inputAlamat3.focus();
}

function confirmAlamat3() {
  cancelAlamat3Button.style.display = "none";
  confirmAlamat3Button.style.display = "none";
  editAlamat3Button.style.display = "inline";
  alamat3Content.innerHTML = inputAlamat3.value;
  inputAlamat3.style.display = "none";
  alamat3Content.style.display = "inline";
}

function cancelAlamat3() {
  confirmAlamat3Button.style.display = "none";
  cancelAlamat3Button.style.display = "none";
  editAlamat3Button.style.display = "inline";
  inputAlamat3.style.display = "none";
  alamat3Content.style.display = "inline";
}

function editAlamat4() {
  editAlamat4Button.style.display = "none";
  cancelAlamat4Button.style.display = "inline";
  confirmAlamat4Button.style.display = "inline";
  alamat4Content.style.display = "none";
  inputAlamat4.style.display = "inline";
  inputAlamat4.value = alamat4Content.innerHTML;
  inputAlamat4.focus();
}

function confirmAlamat4() {
  cancelAlamat4Button.style.display = "none";
  confirmAlamat4Button.style.display = "none";
  editAlamat4Button.style.display = "inline";
  alamat4Content.innerHTML = inputAlamat4.value;
  inputAlamat4.style.display = "none";
  alamat4Content.style.display = "inline";
}

function cancelAlamat4() {
  confirmAlamat4Button.style.display = "none";
  cancelAlamat4Button.style.display = "none";
  editAlamat4Button.style.display = "inline";
  inputAlamat4.style.display = "none";
  alamat4Content.style.display = "inline";
}