import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const params = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-button",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__text-input-error_type_active",
};

const formValidators = {};

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileFormElement = document.querySelector(
  ".popup__form_type_edit-profile"
);
const popupEditProfileNameInput = document.querySelector(
  ".popup__text-input_type_name"
);
const popupEditProfileAboutInput = document.querySelector(
  ".popup__text-input_type_about"
);

const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddCardFormElement = document.querySelector(
  ".popup__form_type_add-card"
);
const popupAddCardNameInput = document.querySelector(
  ".popup__text-input_type_card-name"
);
const popupAddCardLinkInput = document.querySelector(
  ".popup__text-input_type_card-link"
);

const popupImage = document.querySelector(".popup_type_image");
const popupImageForm = document.querySelector(".popup__image");
const popupImageHeader = document.querySelector(".popup__image-header");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const elements = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");

// function setClosePopupByEscape(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// function deleteEscapeHandler() {
//   document.removeEventListener("keydown", setClosePopupByEscape);
// }

// function setEscapeHandler() {
//   document.addEventListener("keydown", setClosePopupByEscape);
// }

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   setEscapeHandler();
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   deleteEscapeHandler();
// }

function handleCardClick(name, link) {
  fillPopupImage(name, link);
  openPopup(popupImage);
}

function fillPopupImage(name, link) {
  popupImageHeader.textContent = name;
  popupImageForm.src = link;
  popupImageForm.alt = name;
}

function createEditProfilePopup(popup) {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileAboutInput.value = profileAbout.textContent;
  formValidators["profile-form"].resetValidation();
  openPopup(popup);
}

function createAddCardPopup(popup) {
  clearForm(popupAddCardFormElement);
  formValidators["add-card-form"].resetValidation();
  openPopup(popup);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfileNameInput.value;
  profileAbout.textContent = popupEditProfileAboutInput.value;
  closePopup(popupEditProfile);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: popupAddCardNameInput.value,
    link: popupAddCardLinkInput.value,
    handleCardClick: handleCardClick,
  };
  const cardElement = createCard(item, ".template-block");
  addCardToBody(cardElement);
  closePopup(popupAddCard);
  clearForm(evt.target);
}

function clearForm(form) {
  form.reset();
}

function createCard(item, template) {
  const cardElement = new Card(item, template).createCard();
  return cardElement;
}

function addCardToBody(card) {
  elements.prepend(card);
}

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(params, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });

initialCards.forEach((item) => {
  item.handleCardClick = handleCardClick;
  const cardElement = createCard(item, ".template-block");
  addCardToBody(cardElement);
});

enableValidation(params);

editButton.addEventListener("click", (e) =>
  createEditProfilePopup(popupEditProfile)
);
popupEditProfileFormElement.addEventListener(
  "submit",
  handleEditProfileFormSubmit
);

const popup = new Popup(".popup_type_add-card");
addButton.addEventListener("click", (e) => popup.open());
popupAddCardFormElement.addEventListener("submit", handleAddCardSubmit);
