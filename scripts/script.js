let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');
let popupNameInput = document.querySelector('.popup__text-input_type_name');
let popupAboutInput = document.querySelector('.popup__text-input_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function fillPopupForm() {
  popupNameInput.value = document.querySelector('.profile__name').innerText;
  popupAboutInput.value = document.querySelector('.profile__about').innerText;
}

function openPopup() {
  fillPopupForm();
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function stopScroll(evt) {
  evt.preventDefault();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

popup.addEventListener("scroll", stopScroll);
popup.addEventListener("mousewheel", stopScroll);
popup.addEventListener("wheel", stopScroll);
popup.addEventListener("touchmove", stopScroll);
