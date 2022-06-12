import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  userInfoSelectors,
  params,
  editButton,
  addButton
} from "../utils/constants.js";

function handleCardClick(name, link) {
  popups["imagePopup"].open(name, link);
}

function handleEditProfileFormSubmit(inputs) {
  userInfo.setUserInfo(inputs["input-name"], inputs["input-about"]);
}

function handleAddCardSubmit(inputs) {
  const item = {
    name: inputs["input-card-name"],
    link: inputs["input-card-link"]
  };
  cardSection.setItem(createCard(item, ".template-block"));
}

function createCard(item, template) {
  item.handleCardClick = handleCardClick;
  const cardElement = new Card(item, template)
    .createCard();
  return cardElement;
}
const userInfo = new UserInfo(userInfoSelectors);

const popups = {
  imagePopup: new PopupWithImage(".popup_type_image", ".popup__image", ".popup__image-header"),
  addCardPopup: new PopupWithForm(".popup_type_add-card", handleAddCardSubmit, ".popup__form_type_add-card", ".popup__text-input"),
  editProfilePopup: new PopupWithForm(".popup_type_edit-profile", handleEditProfileFormSubmit, ".popup__form_type_edit-profile", ".popup__text-input")
}
popups.imagePopup.setEventListeners();
popups.addCardPopup.setEventListeners();
popups.editProfilePopup.setEventListeners();

const renderer = (item) => {
  const cardElement = createCard(item, ".template-block");
  cardSection.setItem(cardElement);
};

const cardSection = new Section(renderer, ".elements");
cardSection.renderItems(initialCards);

const formValidators = {};
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(params, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(params);

editButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  const inputValues = {};
  inputValues["input-name"] = values.userName;
  inputValues["input-about"] = values.userAbout;
  popups["editProfilePopup"].setInputValues(inputValues);
  popups["editProfilePopup"].open();
  formValidators["profile-form"].resetValidation();
});

addButton.addEventListener("click", () => {
  popups["addCardPopup"].open();
  formValidators["add-card-form"].resetValidation();
});
