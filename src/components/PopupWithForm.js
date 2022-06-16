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
    //this._toggleButtonWhileSave(true);
    evt.preventDefault();
    this._handleSubmitCallback(this._getInputValues())
      .then(() => {
        this.close();
      })
      .catch((e) => {
        console.error(`Ошибка выполнения запроса: ${e}`);
      });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
