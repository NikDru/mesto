import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitCallback, formSelector, textInputSelector) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._handleSubmitCallback = handleSubmitCallback;
    this._textInputSelector = textInputSelector;
    this._bindedSubmitHandler = this._handleSubmitEvent.bind(this);
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(this._textInputSelector);
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener('submit', this._bindedSubmitHandler);
  }

  _deleteEventListeners() {
    super._deleteEventListeners();
    this._popup.removeEventListener('submit', this._bindedSubmitHandler);
  }

  _handleSubmitEvent(evt) {
    evt.preventDefault();
    this._handleSubmitCallback(this._getInputValues());
    this.close();
  }

  open(filled, fillInputs) {
    if (filled) {
      fillInputs(this._popup);
    }
    super.open();
  }

  close() {
    this._popup.querySelector(this._formSelector).reset();
    this._deleteEventListeners();
    super.close();
  }
}
