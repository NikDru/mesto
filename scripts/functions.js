function renderCard(card, container) {
  container.prepend(card);
}

function setClosePopupByEscape(event) {
  if (event.key === 'Escape')  {
    closePopup(openedPopup);
  }
}

function deleteEscapeHandler() {
  document.removeEventListener('keydown', setClosePopupByEscape);
}

function setEscapeHandler() {
  document.addEventListener('keydown', setClosePopupByEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  openedPopup = popup;
  setEscapeHandler();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  deleteEscapeHandler();
  openedPopup = popup;
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

function setPopupState(popup) {
  clearPopupErrors(popup);
  toggleSaveButton(popup, params);
}

function clearPopupErrors(popup) {
  const inputList = Array.from(popup.querySelectorAll(params.inputSelector));
  inputList.forEach((inputElement) => {
      hideInputError(popup, inputElement, params);
  });
}

function createEditProfilePopup(popup) {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileAboutInput.value = profileAbout.textContent;
  setPopupState(popup, params);
  openPopup(popup);
}

function createAddCardPopup(popup) {
  clearAddCardPopup();
  setPopupState(popup, params);
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
}

function clearAddCardPopup() {
  popupAddCardNameInput.value = '';
  popupAddCardLinkInput.value = '';
}
