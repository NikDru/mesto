editButton.addEventListener("click", e => createEditProfilePopup(popupEditProfile, e));
popupEditProfileFormElement.addEventListener("submit", editProfileFormSubmitHandler);

addButton.addEventListener("click", e => openPopup(popupAddCard));
popupAddCardFormElement.addEventListener("submit", addCardSubmitHandler);

popupEditProfileCloseButton.addEventListener("click", e => closePopup(popupEditProfile));
popupAddCardCloseButton.addEventListener("click", e => closeAddCardPopup(popupAddCard));
popupImageCloseButton.addEventListener("click", e => closePopup(popupImage));

initialCards.forEach(item =>  {
  const card = createCard(item.name, item.link);
  renderCard(card, elements);
});

let popups = document.querySelectorAll('.popup');
  popups.forEach(x => {
    x.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup'))
        closePopup(openedPopup);
    })
});

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape')
    closePopup(openedPopup);
})

enableValidation(params);
