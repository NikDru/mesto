import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

const popups = {
    imagePopup: new PopupWithImage(".popup_type_image"),
    addCardPopup: new PopupWithForm(".popup_type_add-card", handleAddCardSubmit, ".popup__form_type_add-card"),
    editProfilePopup: new PopupWithForm(".popup_type_edit-profile", handleEditProfileFormSubmit, ".popup__form_type_edit-profile")
  }

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

const userInfoSelectors = { userNameSelector: ".profile__name", userAboutSelector: ".profile__about"};
const userInfo = new UserInfo(userInfoSelectors);


const elements = document.querySelector(".elements");

function handleCardClick(name, link) {
  popups["imagePopup"].open(name, link);
}

function createEditProfilePopup(popup) {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileAboutInput.value = profileAbout.textContent;
  formValidators["profile-form"].resetValidation();
  openPopup(popup);
}

function handleEditProfileFormSubmit(inputName, inputExtra) {
  userInfo.setUserInfo(inputName, inputExtra);
}

function handleAddCardSubmit(inputName, inputExtra) {
  const item = {
    name: inputName,
    link: inputExtra,
    handleCardClick: handleCardClick,
  };
  const cardElement = createCard(item, ".template-block");
  addCardToBody(cardElement);
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

// const popup = new Popup(".popup_type_add-card");
addButton.addEventListener("click", () => {popups["addCardPopup"].open()});
//popupAddCardFormElement.addEventListener("submit", handleAddCardSubmit);
