export default class Card {
  constructor(card, templateSelector, userId) {
    this.cardID = card._id;
    this._userId = userId;
    this._usersCard = card.owner._id === this._userId ? true : false;
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._handleCardClick = card.handleCardClick;
    this._handleCardDelete = card.deleteCard;
    this._handleCardLike = card.likeCard;
    this._handleCardUnlike = card.unlikeCard;
    this._templateSelector = templateSelector;
  }

  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = cardElement.querySelector(".card__like-button");
    this._cardImage = cardElement.querySelector(".card__image");
    this._likeCounter = cardElement.querySelector(".card__like-counter");
    this._trashButton = cardElement.querySelector(".card__trash-button");
    this._cardName = cardElement.querySelector(".card__name");

    return cardElement;
  }

  _handleLikeButtonClick() {
    if (this._likeButton.classList.contains("card__like-button_type_active")) {
      this._handleCardUnlike(this.cardID)
        .then(() => this._changeLikeCard(-1))
        .catch(e => console.log(`Лайк не снят, причина: ${e}`));
    }
    else {
      this._handleCardLike(this.cardID)
        .then(() => this._changeLikeCard(1))
        .catch(e => console.log(`Лайк поставлен, причина: ${e}`));
    }
  }

  _handleTrashButtonClick() {
    this._handleCardDelete(this);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    if (this._usersCard) {
      this._trashButton.addEventListener("click", () => {
        this._handleTrashButtonClick();
      });
    }
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _changeLikeCard(num) {
    this._likeCounter.textContent = Number.parseInt(this._likeCounter.textContent) + num;
    this._likeButton.classList.toggle("card__like-button_type_active");
  }

  _checkLikes() {
    this._likeCounter.textContent = this._likes.length;
    if (this._likes.some(like => like._id === this._userId /* "c6a52c342c13d921985dc42e" */)) {
      this._setMyLike();
    }
  }

  _setMyLike() {
    this._likeButton.classList.add("card__like-button_type_active");
  }

  _enableTrashButton() {
    if (this._usersCard) {
      this._trashButton.classList.remove("card__trash-button_hidden");
    }
  }

  createCard() {
    this._element = this._getTemplateCard();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._checkLikes();
    this._enableTrashButton();
    this._setEventListeners();

    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
