import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileCloseButton = document.querySelector(
  ".popup__close-button_type_edit-profile"
);
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
const popupAddCardCloseButton = document.querySelector(
  ".popup__close-button_type_add-card"
);
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
const popupImageCloseButton = document.querySelector(
  ".popup__close-button_type_image"
);
const popupImageForm = document.querySelector(".popup__image");
const popupImageHeader = document.querySelector(".popup__image-header");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const elements = document.querySelector(".elements");

const template = document.querySelector(".template-block").content;

let openedPopup;

// function renderCard(card, container) {
//   container.prepend(card);
// }

function setClosePopupByEscape(event) {
  if (event.key === "Escape") {
    closePopup(openedPopup);
  }
}

function deleteEscapeHandler() {
  document.removeEventListener("keydown", setClosePopupByEscape);
}

function setEscapeHandler() {
  document.addEventListener("keydown", setClosePopupByEscape);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  openedPopup = popup;
  setEscapeHandler();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  deleteEscapeHandler();
  openedPopup = popup;
}

function createImagePopup(popup, e) {
  fillPopupImage(e);
  openPopup(popup);
}

function fillPopupImage(e) {
  const card = e.currentTarget.closest(".card");
  popupImageForm.src = card.querySelector(".card__image").src;
  popupImageForm.alt = card.querySelector(".card__name").textContent;
  popupImageHeader.textContent = card.querySelector(".card__name").textContent;
}

function setPopupState(popup) {
  clearPopupErrors(popup);
  toggleSaveButton(popup, params);
}

function hideInputError(formElement, inputElement, params) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = "";
}

function activateButton(formElement, params) {
  const button = formElement.querySelector(params.submitButtonSelector);
  button.removeAttribute("disabled");
}

function deactivateButton(formElement, params) {
  const button = formElement.querySelector(params.submitButtonSelector);
  button.setAttribute("disabled", "disabled");
}

function toggleSaveButton(formElement, params) {
  let inputsValidity = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  ).map((x) => x.validity.valid);
  if (Object.values(inputsValidity).every((x) => x)) {
    activateButton(formElement, params);
  } else {
    deactivateButton(formElement, params);
  }
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

  let item = {
    name: popupAddCardNameInput.value,
    link: popupAddCardLinkInput.value,
    popup: popupImage,
    createImagePopup: createImagePopup,
  };

  const card = new Card(item, ".template-block");

  const cardElement = card.createCard();
  addCardToBody(cardElement);
  closePopup(popupAddCard);
  clearAddCardPopup();
}

function closeAddCardPopup(popup) {
  closePopup(popup);
}

function clearAddCardPopup() {
  popupAddCardNameInput.value = "";
  popupAddCardLinkInput.value = "";
}

const params = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-button",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__text-input-error_type_active",
};

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      evt.stopPropagation();
      closePopup(popup);
    }
  });
});

editButton.addEventListener("click", (e) =>
  createEditProfilePopup(popupEditProfile)
);
popupEditProfileFormElement.addEventListener(
  "submit",
  editProfileFormSubmitHandler
);

addButton.addEventListener("click", (e) => createAddCardPopup(popupAddCard));
popupAddCardFormElement.addEventListener("submit", addCardSubmitHandler);

popupEditProfileCloseButton.addEventListener("click", (e) =>
  closePopup(popupEditProfile)
);

popupAddCardCloseButton.addEventListener("click", (e) =>
  closeAddCardPopup(popupAddCard)
);

popupImageCloseButton.addEventListener("click", (e) => closePopup(popupImage));

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  item.popup = popupImage;
  item.createImagePopup = createImagePopup;
  const card = new Card(item, ".template-block");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.createCard();

  addCardToBody(cardElement);
});

const formList = Array.from(document.querySelectorAll(params.formSelector));
formList.forEach((formElement) => {
  const popupValidationForm = new FormValidator(params, formElement);
  popupValidationForm.enableValidation();
});

function addCardToBody(card) {
  document.body.querySelector(".elements").append(card);
}
