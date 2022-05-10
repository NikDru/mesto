/* function createCard(name, link) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', e => createImagePopup(popupImage, e))
  cardElement.querySelector('.card__name').textContent = name;
  const trashButton = cardElement.querySelector('.card__trash-button');
  trashButton.addEventListener("click", function () {
    trashButton.closest('.card').remove();
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle('card__like-button_type_active');
  });
  return cardElement;
} */



export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplateCard() {
    const cardElement = document
      .querySelector('.template-block')
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._likeButton = cardElement.querySelector('.card__like-button');
    this._cardImage = cardElement.querySelector('.card__image');
    this._trashButton = cardElement.querySelector('.card__trash-button');

    return cardElement;
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('card__like-button_type_active');
  }

  _handleCardImageClick(e) {
    createImagePopup(popupImage, e)
  }

  _handleTrashButtonClick() {
    this._trashButton.closest('.card').remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => _handleLikeButtonClick());
    this._cardImage.addEventListener('click', (e) => _handleCardImageClick(e));
    this._trashButton.addEventListener('click', () => _handleTrashButtonClick());
  }

  createCard() {
    this._element = this._getTemplateCard();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    this._setEventListeners();

    return cardElement;
  }
}
