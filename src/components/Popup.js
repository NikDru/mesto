export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // Так как происходит потеря контекста (функция _handleEscClose)
    // вызывается на элементе #document, необходимо привязать контекст
    // и передать его функции, при этом сохранить функцию для
    // последующего удаления в обработчике.
    this._bindedEscHandler = this._handleEscClose.bind(this);
    this._bindedMouseHandler = this._handleMouseDown.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._deleteEventListeners();
  }

  _handleMouseDown(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
    if (evt.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _deleteEventListeners() {
    this._popup.removeEventListener("mousedown", this._bindedMouseHandler);
    document.removeEventListener("keydown", this._bindedEscHandler);
  }

  _setEventListeners() {
    this._popup.addEventListener("mousedown", this._bindedMouseHandler);
    document.addEventListener("keydown", this._bindedEscHandler);
  }
}
