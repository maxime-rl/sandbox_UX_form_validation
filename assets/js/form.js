// DOM elements
const form = document.querySelector('#form');
const elementsForm = document.querySelectorAll('.form-control, .checkbox, fieldset, hr, button[type=submit]');
const btnInscription = document.querySelector('.btn-inscription');
const btnClose = document.querySelector('.btn-close');
let commentOption = document.querySelector('.comment-option');
const appreciationMsg1 = document.querySelector('.msg1');
const appreciationMsg2 = document.querySelector('.msg2');
const appreciationMsg3 = document.querySelector('.msg3');

// *********** listening to DOM elements ***********

// listen btn inscription
btnInscription.addEventListener('click', function() {
  openForm(this);
})

// listen btn close form
btnClose.addEventListener('click', function() {
  closeForm(this);
})

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

// listen newsletter input
form.newsletter.addEventListener('change', function() {
  newsletter(this);
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

    appearAppreciationMsg();
  } 
})

// *********** Open form ***********
const openForm = function() {
  form.reset();
  setSuccessFor(lastName, '');
  setSuccessFor(firstName, '');
  setSuccessFor(email, '');
  setSuccessFor(email2, '');
  setSuccessFor(number, '');
  commentOption.innerText = '';
  setSuccessFor(regTerms, '');
  elementsForm.forEach(element => {
    element.style.opacity = '1';
  });
  appreciationMsg1.style.display ='none';
  appreciationMsg2.style.display ='none';
  appreciationMsg3.style.display ='none';
  appreciationMsg1.classList.remove('appreciation-appear-msg');
  appreciationMsg2.classList.remove('appreciation-appear-msg');
  appreciationMsg3.classList.remove('appreciation-appear-smiley');
  form.style.display = 'flex';
  btnInscription.style.display = 'none';
}

// *********** Close form ***********
function closeForm() {
  elementsForm.forEach(element => {
    element.classList.add('appear');
  });
  form.style.display = 'none';
  btnInscription.style.display = 'block';
}

// *********** Last name validation ***********
const validLastName = function(lastName) {
  if (lastName.value.length <= 2) {
    setErrorFor(lastName, '⚠️ Veuillez entrer 2 caractères ou plus pour le champ du Nom');
    return false;

  } else {
    setSuccessFor(lastName, '');
    return true;
  }
}

// *********** First name validation ***********
const validFirstName = function(firstName) {
  if (firstName.value.length <= 2) {
    setErrorFor(firstName, '⚠️ Veuillez entrer 2 caractères ou plus pour le champ du Prénom');
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
    setErrorFor(email, '⚠️ Veuillez entrer une adresse email valide');
    return false;

  } else {
    setSuccessFor(email, '');
    return true;
  }
}

// *********** Email verification ***********
const validEmail2 = function(email2) {
  if (email.value != email2.value){
    setErrorFor(email2, '⚠️ L\'adresse email n\'est pas identique');
    return false;

  } else {
    setSuccessFor(email2, '');
    return true;
  }
}

// *********** Number verification ***********
const validNumber = function(number) {
  if ((number.value == 0) || (isNaN(number.value))) {
    setErrorFor(number, '⚠️ Veuillez indiquer une valeur numérique');
    return false;

  } else {
    setSuccessFor(number, '');
    return true;
  }
}

// *********** Option validation ***********
const validOption = function() {
  const options = document.querySelectorAll('input[type=radio][name="option"]');
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
    commentOption.innerText = '⚠️ Veuillez choisir une option';
    return false;
  }
}

// *********** Newsletter animation ***********
const newsletter = function() {
  const iconNews = document.querySelector('.icon');
  iconNews.classList.toggle('appear');
}

// *********** Registration terms validation ***********
const validRegTerms = function(regTerms) {
  if (!regTerms.checked) {
    setErrorFor(regTerms, '⚠️ Veuillez accepter les terms de l\'inscription');
    return false;

  } else {
    setSuccessFor(regTerms, '');
    return true;
  }
}

// *********** Error/success comments management ***********
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

// *********** Appreciation message ***********
function appearAppreciationMsg() {
  elementsForm.forEach(element => {
    element.style.opacity = '0';
  });

  appreciationMsg1.style.display ='block';
  appreciationMsg2.style.display ='block';
  appreciationMsg3.style.display ='block';

  setTimeout( function() {
    appreciationMsg1.classList.add('appreciation-appear-msg');
  }, 200);

  setTimeout( function() {
    appreciationMsg2.classList.add('appreciation-appear-msg');
  }, 300);

  setTimeout( function() {
    appreciationMsg3.classList.add('appreciation-appear-smiley');
  }, 400);
}

// *********** Test disable enter key ***********
// temporary solution for keyCode, is deprecated
window.addEventListener('keydown', function(e) {
  if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
      if (e.target.nodeName == 'INPUT' && e.target.type == 'text' || e.target.type == 'email' || e.target.type == 'number') {
          e.preventDefault();
          return false;
      }
  }
}, true);