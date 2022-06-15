import './index.css';
import Api from "../components/Api.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  userInfoSelectors,
  params,
  editButton,
  addButton,
  avatarButton
} from "../utils/constants.js";

let userID = "";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '926320b0-abe9-4e26-a293-dc96c9984fe6',
    'Content-Type': 'application/json'
  }
});

function handleLikeCard(cardID) {
  return api.likeCard(cardID);
}

function handleUnlikeCard(cardID) {
  return api.unlikeCard(cardID);
}

function handleCardClick(name, link) {
  popups["imagePopup"].open(name, link);
}

function handleEditProfileFormSubmit(inputs) {
  return api.editProfile({name: inputs["input-name"], about: inputs["input-about"]})
    .then((res) => userInfo.setUserInfo(res));
}

function handleAddCardSubmit(inputs) {
  const item = {
    name: inputs["input-card-name"],
    link: inputs["input-card-link"]
  };
  return api.createNewCard(item)
    .then((res) => {
      cardSection.setItem(createCard(res, ".template-block", "c6a52c342c13d921985dc42e"));
    });
}

function handleTrashButtonClick(card) {
  popups["deleteCardPopup"].setSubmitAction(handleDeleteCardFormSubmit.bind(card));
  popups["deleteCardPopup"].open();
  //cardToDelete = card;
}

function handleDeleteCardFormSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(this.cardID)
    .then(res => {
      console.log(res);
      this.deleteCard();
      popups["deleteCardPopup"].close();
    })
    .catch(e => {
      console.log(`Ошибка удаления карточки, причина: ${e}`);
    }
  );
}

function handleChangeAvatarFormSubmit(inputs) {
  return api.changeAvatar({avatar: inputs["avatar-link"]})
    .then((res) => {userInfo.setUserInfo(res);});
}

function createCard(item, template, userId) {
  item.handleCardClick = handleCardClick;
  item.likeCard = handleLikeCard;
  item.unlikeCard = handleUnlikeCard;
  item.deleteCard = handleTrashButtonClick;
  const cardElement = new Card(item, template, userId)
    .createCard();
  return cardElement;
}
const userInfo = new UserInfo(userInfoSelectors);

const popups = {
  imagePopup: new PopupWithImage(".popup_type_image", ".popup__image", ".popup__image-header"),
  addCardPopup: new PopupWithForm(".popup_type_add-card", handleAddCardSubmit, ".popup__form_type_add-card", ".popup__text-input"),
  editProfilePopup: new PopupWithForm(".popup_type_edit-profile", handleEditProfileFormSubmit, ".popup__form_type_edit-profile", ".popup__text-input"),
  //deleteCardPopup: new PopupWithForm(".popup_type_delete-card", handleDeleteCardFormSubmit, ".popup__form_type_delete-card"),
  deleteCardPopup: new PopupWithConfirmation(".popup_type_delete-card", ".popup__form_type_delete-card"),
  changeAvatarPopup: new PopupWithForm(".popup_type_change-avatar", handleChangeAvatarFormSubmit, ".popup__form_type_change-avatar", ".popup__text-input")
}

Object.keys(popups).forEach(popup => popups[popup].setEventListeners());

const renderer = (item) => {
  const cardElement = createCard(item, ".template-block", userID);
  cardSection.setItem(cardElement);
};

const cardSection = new Section(renderer, ".elements");

const promises = [api.getUserInfo(), api.getCards()];

Promise.all(promises)
  .then((res) =>{
    userInfo.setUserInfo(res[0]);
    userID = userInfo.getUserInfo().userId;
    cardSection.renderItems(res[1]);
  })

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
  formValidators["profile-form"].resetValidation();
  popups["editProfilePopup"].open();
});

addButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  popups["addCardPopup"].open();
});

avatarButton.addEventListener("click", () => {
  formValidators["change-avatar-form"].resetValidation();
  popups["changeAvatarPopup"].open();
})
