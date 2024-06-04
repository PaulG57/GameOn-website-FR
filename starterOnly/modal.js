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
//let divAfficherErreur = document.querySelector(".formData");
let radioLocation = document.querySelectorAll("input[name=location]");
let divLocation = document.getElementById("locations");
let checkboxConditions = document.getElementById("checkbox1");
let divConditions = document.getElementById("conditions");
let classList = ["error", "elementMessageErreur"];

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
    champ.parentNode.classList.add("elementMessageErreur");
    throw new Error(`Le ${champ.name} n'est pas valide.(2 caractères minimum)`);
  }
  champ.classList.remove("error");
  champ.parentNode.classList.remove("elementMessageErreur");
  return true;
}

function validerEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email.value)) {
    email.classList.add("error");
    email.parentNode.classList.add("elementMessageErreur");
    throw new Error("L'email n'est pas valide.");
  }
  email.classList.remove("error");
  email.parentNode.classList.remove("elementMessageErreur");
  return true;
}

function validerNombre (quantity) {
  let regex = new RegExp("^[0-9]+$");
  if (!regex.test(quantity.value)) {
    quantity.classList.add("error");
    quantity.parentNode.classList.add("elementMessageErreur");
    throw new Error("La quantité n'est pas valide.");
  }
  quantity.classList.remove("error");
  quantity.parentNode.classList.remove("elementMessageErreur");
  return true;
}

function validerLocation(location) {
  let selected = false;

  for (let i = 0; i < location.length; i++) {
    if (location[i].checked) {
      selected = true;
      break;
    }
    selected = false;
  }

  if (!selected) {
    divLocation.classList.add(...classList);
    throw new Error("La location n'est pas valide.");
  }
  divLocation.classList.remove(...classList);
  return true;
}

function validerConditions(condition) {
  if (!condition.checked) {
    divConditions.classList.add(...classList);
    throw new Error("La condition n'est pas valide.");
  }
  divConditions.classList.remove(...classList);
  return true;
}

function afficherMessageErreur(message) {
  let spanErreurMessage = document.getElementById("erreurMessage");
  if (!spanErreurMessage) {
    let divMessageErreur = document.querySelector(".elementMessageErreur");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreurMessage";
    divMessageErreur.append(spanErreurMessage);
  }
    spanErreurMessage.innerText = message;
}

// submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    validerChamp(champPrenom);
    validerChamp(champNom);
    validerEmail(email);
    validerNombre(champQuantity);
    validerLocation(radioLocation);
    validerConditions(checkboxConditions);
    afficherMessageErreur("");
  } catch (erreur) {
    afficherMessageErreur(erreur.message);
    }

})