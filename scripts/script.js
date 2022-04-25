editButton.addEventListener("click", e => createEditProfilePopup(popupEditProfile));
popupEditProfileFormElement.addEventListener("submit", editProfileFormSubmitHandler);

addButton.addEventListener("click",  e => createAddCardPopup(popupAddCard));
popupAddCardFormElement.addEventListener("submit", addCardSubmitHandler);

popupEditProfileCloseButton.addEventListener("click", e => closePopup(popupEditProfile));
popupAddCardCloseButton.addEventListener("click", e => closeAddCardPopup(popupAddCard));
popupImageCloseButton.addEventListener("click", e => closePopup(popupImage));

initialCards.forEach(item =>  {
  const card = createCard(item.name, item.link);
  renderCard(card, elements);
});

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      evt.stopPropagation();
      closePopup(popup);
    }
  })
});

enableValidation(params);
