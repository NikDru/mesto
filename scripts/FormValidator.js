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
      this._toggleSaveButton();
    } else {
      this._hideInputError(inputElement);
      this._toggleSaveButton();
    }
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
    let inputsValidity = this._inputElements
    .map((x) => x.validity.valid);
    if (Object.values(inputsValidity).every((x) => x)) {
      this._activateButton();
    } else {
      this._deactivateButton();
    }
  }

  enableValidation() {
    this._validatedForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
