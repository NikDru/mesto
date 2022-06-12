export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._bindedEscHandler = this._handleEscClose.bind(this);
    this._bindedMouseHandler = this._handleMouseDown.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._bindedEscHandler);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._deleteEventListeners();
  }

  _handleMouseDown(evt) {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _deleteEventListeners() {
    document.removeEventListener("keydown", this._bindedEscHandler);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._bindedMouseHandler);
  }
}
