import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitCallback, formSelector, textInputSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._handleSubmitCallback = handleSubmitCallback;
    this._textInputSelector = textInputSelector;
    this._bindedSubmitHandler = this._handleSubmitEvent.bind(this);
    this._inputList = this._form.querySelectorAll(this._textInputSelector);
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
    evt.preventDefault();
    this._handleSubmitCallback(this._getInputValues());
    this.close();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
