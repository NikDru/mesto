export const userInfoSelectors = { userNameSelector: ".profile__name", userAboutSelector: ".profile__about", avatarImageSelector: ".profile__avatar"};

export const params = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-button",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__text-input-error_type_active",
};

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar-button");
export const editProfilePopup = document.querySelector(".popup_type_edit-profile");
export const addCardPopup = document.querySelector(".popup_type_add-card");
export const changeAvatarPopup = document.querySelector(".popup_type_change-avatar");
