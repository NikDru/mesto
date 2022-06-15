import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitCallback, formSelector, textInputSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._handleSubmitCallback = handleSubmitCallback;
    this._textInputSelector = textInputSelector;
    this._bindedSubmitHandler = this._handleSubmitEvent.bind(this);
    this._inputList = this._form.querySelectorAll(this._textInputSelector);
    this._saveButton = this._form.querySelector(".popup__save-button");
    this._buttonText = this._saveButton.value;
    this._errorField = this._form.querySelectorAll(".popup__text-input-error")[0];
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
    input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._bindedSubmitHandler);
  }

  _handleSubmitEvent(evt) {
    this._toggleButtonWhileSave(true);
    evt.preventDefault();
    this._handleSubmitCallback(this._getInputValues())
      .then(() => {
        this._toggleButtonWhileSave(false);
        this.close();
      })
      .catch((e) => {
        this._showError(e);
        this._resetButtonText();
      });
  }


  _toggleButtonWhileSave(saving) {
    if (saving) {
      this._saveButton.setAttribute("disabled", "disabled");
      this._saveButton.value = "Сохранение...";
    }
    else {
      this._resetButtonText();
    }
  }

  _resetButtonText() {
    this._saveButton.removeAttribute("disabled");
    this._saveButton.value = this._buttonText;
  }


  _showError(error) {
    this._inputErrorElement = this._form.querySelectorAll(".popup__text-input")[0];
    const errorElement = this._form.querySelector(
      `.${this._inputErrorElement.id}-error`
    );
    this._inputErrorElement.classList.add("popup__text-input_type_error");
    errorElement.textContent = error;
    errorElement.classList.add("popup__text-input-error_type_active");
  }

  _hideError() {
    if (this._inputErrorElement !== undefined) {
      const errorElement = this._form.querySelector(
        `.${this._inputErrorElement.id}-error`
      );
      this._inputErrorElement.classList.remove("popup__text-input_type_error");
      errorElement.textContent = "";
      errorElement.classList.remove("popup__text-input-error_type_active");
    }
  }

  close() {
    this._form.reset();
    this._hideError();
    this._resetButtonText();
    super.close();
  }
}
