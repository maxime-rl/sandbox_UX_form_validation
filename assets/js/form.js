// DOM elements
const form = document.querySelector('#form');

// *********** listen to modification inputs ***********

// listen last name input
form.lastName.addEventListener('change', function() {
  validLastName(this);
})

// listen first name input
form.firstName.addEventListener('change', function() {
  validFirstName(this);
})

// listen email input
form.email.addEventListener('change', function() {
  validEmail(this);
})

// listen email2 input
form.email2.addEventListener('change', function() {
  validEmail2(this);
})

// listen number input
form.number.addEventListener('change', function() {
  validNumber(this);
})

// listen registration terms input
form.regTerms.addEventListener('change', function() {
  validRegTerms(this);
})

// *********** listen to submit form ***********

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (
    validLastName(lastName) && 
    validFirstName(firstName) && 
    validEmail(email) && 
    validEmail2(email2) && 
    validNumber(number) && 
    validOption() && 
    validRegTerms(regTerms)) {
    console.log('Inscription réalisé avec succès');

  } else {
    console.log('Certains champs sont invalides');
  }
})

// *********** Last name validation ***********
const validLastName = function(lastName) {

  if (lastName.value.length <= 2) {
    setErrorFor(lastName, '❌ Veuillez entrer 2 caractères ou plus pour le champ du Nom');
    return false;

  } else {
    setSuccessFor(lastName, '');
    return true;
  }
}

// *********** First name validation ***********
const validFirstName = function(firstName) {

  if (firstName.value.length <= 2) {
    setErrorFor(firstName, '❌ Veuillez entrer 2 caractères ou plus pour le champ du Prénom');
    return false;

  } else {
    setSuccessFor(firstName, '');
    return true;
  }
}

// *********** Email validation ***********
const validEmail = function(email) {
  // Email regex
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailPattern.test(email.value)){
    setErrorFor(email, '❌ Veuillez entrer une adresse email valide');
    return false;

  } else {
    setSuccessFor(email, '✔️ L\'adresse email est valide');
    return true;
  }
}

// *********** Email verification ***********
const validEmail2 = function(email2) {

  if (email.value != email2.value){
    setErrorFor(email2, '❌ L\'adresse email n\'est pas identique');
    return false;

  } else {
    setSuccessFor(email2, '✔️ L\'adresse email est identique');
    return true;
  }
}

// *********** Number verification ***********
const validNumber = function(number) {

  if ((number.value == 0) || (isNaN(number.value))) {
    setErrorFor(number, '❌ Veuillez indiquer une valeur numérique');
    return false;

  } else {
    setSuccessFor(number, '');
    return true;
  }
}

// *********** Option validation ***********
const validOption = function() {
  const options = document.querySelectorAll('input[type=radio][name="option"]');
  let commentOption = document.querySelector('.comment-option');
  let checkOption;
  // options iteration 
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      checkOption = options[i].value;
    } 
  }
  // listen radio input with id
  document.body.addEventListener('change', function (e) {
    let target = e.target;
    switch (target.id) {
      case 'option1':
        commentOption.innerText = '';
        break;
      case 'option2':
        commentOption.innerText = '';
        break;
      case 'option3':
        commentOption.innerText = '';
        break;
    }
  })

  if (checkOption != null) {
    return true;

  } else {
    commentOption.innerText = '❌ Veuillez choisir une option';
    return false;
  }
}

// *********** Registration terms validation ***********
const validRegTerms = function(regTerms) {

  if (!regTerms.checked) {
    setErrorFor(regTerms, '❌ Veuillez accepter les terms de l\'inscription');
    return false;

  } else {
    setSuccessFor(regTerms, '');
    return true;
  }
}

// *********** Comments management ***********
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const comment = formControl.querySelector('small');

  comment.innerText = message;
  formControl.classeName = 'form-control';
  formControl.classList.add('error');
  formControl.classList.remove('success');
}

function setSuccessFor(input, message) {
  const formControl = input.parentElement;
  const comment = formControl.querySelector('small');
  const fieldset = input.parentElement;

  comment.innerText = message;
  formControl.classList.add('success');
  formControl.classList.remove('error');
}