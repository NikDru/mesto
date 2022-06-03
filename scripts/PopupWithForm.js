import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, formSelector) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._bindedSubmitHandler = this._handleSubmitEvent.bind(this);
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll('input'));

    inputs.forEach((input) => {
      if (input.name.indexOf('name') > -1) {
        this._inputName = input.value;
      }
      if (input.name.indexOf('input') > -1 && input.name.indexOf('name') === -1) {
        this._inputExtra = input.value;
      }
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._bindedSubmitHandler);
  }

  _deleteEventListeners() {
    super._deleteEventListeners();
    this._form.removeEventListener('submit', this._bindedSubmitHandler);
  }

  _handleSubmitEvent(evt) {
    evt.preventDefault();
    this._getInputValues();
    this._handleSubmit(this._inputName, this._inputExtra);
    this.close();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
