import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Form from "./Form.js";

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

const userInfoSelectors = { userNameSelector: ".profile__name", userAboutSelector: ".profile__about"};
const userInfo = new UserInfo(userInfoSelectors);

const popups = {
    imagePopup: new PopupWithImage(".popup_type_image"),
    addCardPopup: new PopupWithForm(".popup_type_add-card", new Form(".popup__form_type_add-card", handleAddCardSubmit, false, null)),
    editProfilePopup: new PopupWithForm(".popup_type_edit-profile", new Form(".popup__form_type_edit-profile", handleEditProfileFormSubmit, true, userInfo.getUserInfo()))
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

const elements = document.querySelector(".elements");

function handleCardClick(name, link) {
  popups["imagePopup"].open(name, link);
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

initialCards.forEach((item) => {
  item.handleCardClick = handleCardClick;
  const cardElement = createCard(item, ".template-block");
  addCardToBody(cardElement);
});

enableValidation(params);

editButton.addEventListener("click", () => {popups["editProfilePopup"].open()});
addButton.addEventListener("click", () => {popups["addCardPopup"].open()});
