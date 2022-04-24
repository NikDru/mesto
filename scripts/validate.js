function enableValidation(params) {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, params);
  });
}

function setEventListeners(formElement, params) {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       isValid(formElement, inputElement, params)
    });
  });
}

function isValid(formElement, inputElement, params) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
    checkForm(formElement, params);
  } else {
    hideInputError(formElement, inputElement, params);
    checkForm(formElement, params);
  }
}

function showInputError(formElement, inputElement, errorMessage, params) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
}

function hideInputError(formElement, inputElement, params) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
}

function activateButton(formElement, params) {
  const button = formElement.querySelector(params.submitButtonSelector);
  button.removeAttribute('disabled');
}

function deactivateButton(formElement, params) {
  const button = formElement.querySelector(params.submitButtonSelector);
  button.setAttribute('disabled', 'disabled');
}

const checkForm = (formElement, params) => {
  if (!checkForm.inputListValidity) {
    checkForm.inputListValidity = {};
  }
  Array.from(formElement.querySelectorAll(params.inputSelector)).map(x => checkForm.inputListValidity[x.id] = x.validity.valid);
  if (Object.values(checkForm.inputListValidity).every(x => x)) {
    activateButton(formElement, params);
  }
  else {
    deactivateButton(formElement, params);
  }
}
