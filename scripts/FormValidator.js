export default class FormValidator {
  constructor(params, validatedForm) {
    this._validatedForm = validatedForm;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;

    this._inputElements = Array.from(
      this._validatedForm.querySelectorAll(this._inputSelector)
    );
    this._button = this._validatedForm.querySelector(this._submitButtonSelector);
  }


  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
      });
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    this._toggleSaveButton();
  }

  _showInputError(inputElement) {
    const errorElement = this._validatedForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._validatedForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _activateButton() {
    this._button.removeAttribute("disabled");
  }

  _deactivateButton() {
    this._button.setAttribute("disabled", "disabled");
  }

  _toggleSaveButton() {
    if (this._validatedForm.checkValidity()) {
      this._activateButton();
    } else {
      this._deactivateButton();
    }
  }

  _clearErrors() {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._validatedForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._clearErrors();
    this._toggleSaveButton();
  }
}
