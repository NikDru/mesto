const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileCloseButton = document.querySelector('.popup__close-button_type_edit-profile');
const popupEditProfileFormElement = document.querySelector('.popup__form_type_edit-profile');
const popupEditProfileNameInput = document.querySelector('.popup__text-input_type_name');
const popupEditProfileAboutInput = document.querySelector('.popup__text-input_type_about');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
const popupAddCardFormElement = document.querySelector('.popup__form_type_add-card');
const popupAddCardNameInput = document.querySelector('.popup__text-input_type_card-name');
const popupAddCardLinkInput = document.querySelector('.popup__text-input_type_card-link');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const elements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(name, link) {
  const template = document.querySelector('.template-block').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__name').textContent = name;
  const trashButton = cardElement.querySelector('.card__trash-button');
  trashButton.addEventListener("click", function () {
    trashButton.closest('.card').remove();
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle('card__like-button_type_active');
  });


  elements.prepend(cardElement);

}

function openPopup(popup) {
  if (popup.classList.contains('popup_type_edit-profile') > -1) {
    fillPopupEditProfileForm();
  }
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfileNameInput.value;
  profileAbout.textContent = popupEditProfileAboutInput.value;
  closePopup(popupEditProfile);
}

function fillPopupEditProfileForm() {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileAboutInput.value = profileAbout.textContent;
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  createCard(popupAddCardNameInput.value, popupAddCardLinkInput.value);
  closePopup(popupAddCard);
}

editButton.addEventListener("click", e => openPopup(popupEditProfile));
addButton.addEventListener("click", e => openPopup(popupAddCard));

popupEditProfileFormElement.addEventListener("submit", editProfileFormSubmitHandler)
popupAddCardFormElement.addEventListener("submit", addCardSubmitHandler);

popupEditProfileCloseButton.addEventListener("click", e => closePopup(popupEditProfile));
popupAddCardCloseButton.addEventListener("click", e => closePopup(popupAddCard));

initialCards.forEach(item => createCard(item.name, item.link));
