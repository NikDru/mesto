import './index.css';
import Api from "../components/Api.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  userInfoSelectors,
  params,
  editButton,
  addButton,
  avatarButton
} from "../utils/constants.js";

let cardToDelete = null;


/* https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '926320b0-abe9-4e26-a293-dc96c9984fe6',
    'Content-Type': 'application/json'
  }
});

function likeCard(cardID) {
  return api.likeCard(cardID);
}

function unlikeCard(cardID) {
  return api.unlikeCard(cardID);
}

function handleCardClick(name, link) {
  popups["imagePopup"].open(name, link);
}

function handleEditProfileFormSubmit(inputs) {
  api.editProfile({name: inputs["input-name"], about: inputs["input-about"]})
    .then((res) => userInfo.setUserInfo(res))
    .catch(e => console.log(`Ошибка обновления профиля, причина: ${e}`));
}

function handleAddCardSubmit(inputs) {
  const item = {
    name: inputs["input-card-name"],
    link: inputs["input-card-link"]
  };
  api.createNewCard(item)
    .then((res) => {
      cardSection.setItem(createCard(res, ".template-block", "c6a52c342c13d921985dc42e"));
    })
    .catch(e => console.log(`Ошибка создания карточки: ${e}`));
}

function handleTrashButtonClick(card) {
  popups["deleteCardPopup"].open();
  cardToDelete = card;
}

function handleDeleteCardFormSubmit() {
  api.deleteCard(cardToDelete.cardID)
    .then(res => {
      console.log(res);
      cardToDelete.deleteCard();
      cardToDelete = null;
    })
    .catch(e => {
      console.log(`Ошибка обновления аватара, причина: ${e}`);
      cardToDelete = null;
    }
  );
}

function handleChangeAvatarFormSubmit(inputs) {
  api.changeAvatar({avatar: inputs["avatar-link"]})
    .then((res) => {userInfo.setUserInfo(res);})
    .catch(e => console.log(`Ошибка обновления аватара, причина: ${e}`));
}

function createCard(item, template, userId) {
  item.handleCardClick = handleCardClick;
  item.likeCard = likeCard;
  item.unlikeCard = unlikeCard;
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
  deleteCardPopup: new PopupWithForm(".popup_type_delete-card", handleDeleteCardFormSubmit, ".popup__form_type_delete-card"),
  changeAvatarPopup: new PopupWithForm(".popup_type_change-avatar", handleChangeAvatarFormSubmit, ".popup__form_type_change-avatar", ".popup__text-input")
}
popups.imagePopup.setEventListeners();
popups.addCardPopup.setEventListeners();
popups.editProfilePopup.setEventListeners();
popups.deleteCardPopup.setEventListeners();
popups.changeAvatarPopup.setEventListeners();

const renderer = (item) => {
  const cardElement = createCard(item, ".template-block", "c6a52c342c13d921985dc42e");
  cardSection.setItem(cardElement);
};

const cardSection = new Section(renderer, ".elements");
api.getUserInfo().then((res) => { userInfo.setUserInfo(res); });
api.getCards().then((res) => { cardSection.renderItems(res); });

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

avatarButton.addEventListener("click", () => {
  popups["changeAvatarPopup"].open();
  formValidators["change-avatar-form"].resetValidation();
})
