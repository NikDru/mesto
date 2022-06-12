import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImageForm, popupImageHeader) {
    super(popupSelector);
    this._popupImageForm = this._popup.querySelector(popupImageForm);
    this._popupImageHeader = this._popup.querySelector(popupImageHeader);
  }

  open(name, link) {
    this._popupImageHeader.textContent = name;
    this._popupImageForm.src = link;
    this._popupImageForm.alt = name;
    super.open();
  }
}
