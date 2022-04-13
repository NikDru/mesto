function createCard(name, link) {
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
}

function renderCard(card, container) {
  container.prepend(card);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createImagePopup(popup, e) {
  fillPopupImage(e);
  openPopup(popup);
}

function fillPopupImage(e) {
  const card = e.currentTarget.closest('.card');
  popupImageForm.src = card.querySelector('.card__image').src;
  popupImageForm.alt = card.querySelector('.card__name').textContent;
  popupImageHeader.textContent = card.querySelector('.card__name').textContent;
}

function createEditProfilePopup(popup, e) {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileAboutInput.value = profileAbout.textContent;
  openPopup(popup);
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfileNameInput.value;
  profileAbout.textContent = popupEditProfileAboutInput.value;
  closePopup(popupEditProfile);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = createCard(popupAddCardNameInput.value, popupAddCardLinkInput.value);
  renderCard(cardElement, elements);
  closePopup(popupAddCard);
  clearAddCardPopup();
}

function closeAddCardPopup(popup) {
  closePopup(popup);
  clearAddCardPopup();
}

function clearAddCardPopup() {
  popupAddCardNameInput.value = '';
  popupAddCardLinkInput.value = '';
}
