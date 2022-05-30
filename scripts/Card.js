export default class Card {
  constructor(card, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = card.handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._likeButton = cardElement.querySelector(".card__like-button");
    this._cardImage = cardElement.querySelector(".card__image");
    this._trashButton = cardElement.querySelector(".card__trash-button");

    return cardElement;
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle("card__like-button_type_active");
  }

  _handleTrashButtonClick() {
    this._trashButton.closest(".card").remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleTrashButtonClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  createCard() {
    this._element = this._getTemplateCard();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
