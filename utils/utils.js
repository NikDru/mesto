export function handleCardClick(name, link) {
  popups["imagePopup"].open(name, link);
}

export function handleEditProfileFormSubmit(inputs) {
  userInfo.setUserInfo(inputs["input-name"], inputs["input-about"]);
}

export function handleAddCardSubmit(inputs) {
  const item = {
    name: inputs["input-card-name"],
    link: inputs["input-card-link"]
  };
  cardSection.renderNewItem(item);
}
