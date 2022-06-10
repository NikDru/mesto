import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitCallback, formSelector, textInputSelector) {
    super(popupSelector);
    this._form = document.querySelector(formSelector);
    this._handleSubmitCallback = handleSubmitCallback;
    this._textInputSelector = textInputSelector;
    this._bindedSubmitHandler = this._handleSubmitEvent.bind(this);
    this._inputList = this._popup.querySelectorAll(this._textInputSelector);
    this._setEventListeners();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _setInputValues(data) {
    this._inputList.forEach((input) => {
    input.value = data[input.name];
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._bindedSubmitHandler);
  }

  _handleSubmitEvent(evt) {
    evt.preventDefault();
    this._handleSubmitCallback(this._getInputValues());
    this.close();
  }


  open(filled, data) {
    if (filled) {
      this._setInputValues(data);
    }
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
