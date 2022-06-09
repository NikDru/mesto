import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
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
  cardSection.renderNewItem(item);
}

const userInfo = new UserInfo(userInfoSelectors);

const popups = {
  imagePopup: new PopupWithImage(".popup_type_image"),
  addCardPopup: new PopupWithForm(".popup_type_add-card", handleAddCardSubmit, ".popup__form", ".popup__text-input"),
  editProfilePopup: new PopupWithForm(".popup_type_edit-profile", handleEditProfileFormSubmit, ".popup__form", ".popup__text-input")
}

const cardSection = new Section({
    data: initialCards,
    renderer: (item) => {
      item.handleCardClick = handleCardClick;
      const cardElement = new Card(item, ".template-block").createCard();
      cardSection.setItem(cardElement);
    }
  },
  ".elements"
);
cardSection.renderItems();

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
  popups["editProfilePopup"].open(true, (popup) => {
    const values = userInfo.getUserInfo();
    const inputList = popup.querySelectorAll(".popup__text-input");
    inputList.forEach((input) => {
      if (input.name === "input-name") {
        input.value = values.userName;
      }
      else if (input.name === "input-about") {
        input.value = values.userAbout;
      }
    });
  });
  formValidators["profile-form"].resetValidation();
});

addButton.addEventListener("click", () => {
  popups["addCardPopup"].open();
  formValidators["add-card-form"].resetValidation();
});
