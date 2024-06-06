function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const modalbg = document.querySelector(".bground");
const modalSuccess = document.querySelector(".hero-section");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
let champPrenom = document.getElementById("first");
let champNom = document.getElementById("last");
let champEmail = document.getElementById("email");
let champDate = document.getElementById("birthdate");
let champQuantity = document.getElementById("quantity");
let radioLocation = document.querySelectorAll("input[name=location]");
let divLocation = document.getElementById("locations");
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

function validerChamp(champ) {
  if (champ.value.length < 2) {
      champ.classList.add("error");
      throw { champ, message: `Le ${champ.name} n'est pas valide. (2 caractères minimum)` };
  }
  champ.classList.remove("error");
  return true;
}

function validerEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email.value)) {
      email.classList.add("error");
      throw { champ: email, message: "L'email n'est pas valide." };
  }
  email.classList.remove("error");
  return true;
}

function validerDate(date) {
  if (!date.value) {
      date.classList.add("error");
      throw { champ: date, message: "La date n'est pas valide." };
  }
  date.classList.remove("error");
  return true;
}

function validerNombre(quantity) {
  let regex = new RegExp("^[0-9]+$");
  if (!regex.test(quantity.value)) {
      quantity.classList.add("error");
      throw { champ: quantity, message: "La quantité n'est pas valide." };
  }
  quantity.classList.remove("error");
  return true;
}

function validerLocation(location) {
  let selected = false;

  for (let i = 0; i < location.length; i++) {
      if (location[i].checked) {
          selected = true;
          break;
      }
  }

  if (!selected) {
      divLocation.classList.add("error");
      throw { champ: divLocation, message: "La location n'est pas valide." };
  }
  divLocation.classList.remove("error");
  return true;
}

function validerConditions(condition) {
  if (!condition.checked) {
      divConditions.classList.add("error");
      throw { champ: divConditions, message: "La condition n'est pas valide." };
  }
  divConditions.classList.remove("error");
  return true;
}

function afficherMessageErreur(champ, message) {
  const errorElement = document.createElement('span');
  errorElement.className = 'error-message';
  errorElement.textContent = message;

  if (champ === divLocation || champ === divConditions) {
      champ.appendChild(errorElement);
  } else {
      champ.parentNode.appendChild(errorElement);
  }
}

function successMessage() {
  const successElement = document.createElement('div');
  successElement.className = 'success-message';
  const succesMessageP = document.createElement('p');
  succesMessageP.textContent = 'Votre formulaire a bien été envoyé ! Merci :)';
  successElement.appendChild(succesMessageP);
  modalSuccess.appendChild(successElement);

  setTimeout(() => {
    successElement.remove();
  }, 50000);

}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Supprimer les anciens messages d'erreur
  document.querySelectorAll('.error-message').forEach(span => span.remove());

  try {
      validerChamp(champPrenom);
      validerChamp(champNom);
      validerEmail(champEmail);
      validerDate(champDate);
      validerNombre(champQuantity);
      validerLocation(radioLocation);
      validerConditions(checkboxConditions);
      // Si tout est valide, soumettre le formulaire
      closeModal();
      successMessage();
  } catch (error) {
      // Afficher le message d'erreur
      afficherMessageErreur(error.champ, error.message);
  }
});
