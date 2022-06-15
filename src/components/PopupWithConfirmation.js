import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
  }
  setSubmitAction(deleteCard) {
    this._form.addEventListener('submit', deleteCard);
  }
}
