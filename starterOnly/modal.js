function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
let champPrenom = document.getElementById("first");
let champNom = document.getElementById("last");
let champEmail = document.getElementById("email");
let champQuantity = document.getElementById("quantity");
let divLocation = document.getElementById("locations");
let radioLocation = document.querySelectorAll("input[name=location]");
let checkboxConditions = document.getElementById("checkbox1");
let divConditions = document.getElementById("conditions");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// validate form
function validerChamp(champ) {
  if (champ.value.length < 2) {
    champ.classList.add("error");
    return false;
  }
  champ.classList.remove("error");
  return true;
}

function validerEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (emailRegExp.test(email.value)) {
    email.classList.remove("error");
    return true;
  }
  email.classList.add("error");
  return false;
}

function validerNombre (quantity) {
  let regex = new RegExp("^[0-9]+$");
  if (regex.test(quantity.value)) {
    quantity.classList.remove("error");
    return true;
  }
  quantity.classList.add("error");
  return false;
}

function validerLocation(location) {
  for (let i = 0; i < location.length; i++) {
    if (location[i].checked) {
      divLocation.classList.remove("error");
      return true;
    }
  }
  divLocation.classList.add("error");
  return false;
}

function validerConditions(condition) {
  if (!condition.checked) {
    divConditions.classList.add("error");
    return false;
  }
  divConditions.classList.remove("error");
  return true;
}

// submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  validerChamp(champPrenom);
  validerChamp(champNom);
  validerEmail(email);
  validerNombre(champQuantity);
  validerLocation(radioLocation);
  validerConditions(checkboxConditions);

})