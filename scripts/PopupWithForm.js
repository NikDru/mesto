import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, form) {
    super(popupSelector);
    this._bindedSubmitHandler = this._handleSubmitEvent.bind(this);
    this._form = form;
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
    this.close();
  }

  close() {
    this._deleteEventListeners();
    this._form.cleanForm();
    super.close();
  }
}
