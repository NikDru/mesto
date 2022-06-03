import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageForm = document.querySelector(".popup__image");
    this._popupImageHeader = document.querySelector(".popup__image-header");
  }

  open(name, link) {
    this._popupImageHeader.textContent = name;
    this._popupImageForm.src = link;
    this._popupImageForm.alt = name;
    super.open();
  }
}
