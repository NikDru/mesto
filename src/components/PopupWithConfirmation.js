import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._saveButton = this._form.querySelector(".popup__save-button");
    this._buttonText = this._saveButton.value;
  }

  setSubmitAction(deleteCard) {
    this._handleDeleteCard = deleteCard;
    this._form.addEventListener('submit', this._handleDeleteCard);
  }

  close() {
    this._form.removeEventListener('submit', this._handleDeleteCard);
    super.close();
  }
}
