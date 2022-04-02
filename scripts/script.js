let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');
let popupNameInput = document.querySelector('.popup__text-input_type_name');
let popupAboutInput = document.querySelector('.popup__text-input_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

/* Смотри комментарий внизу

function stopScroll(evt) {
  evt.preventDefault();
}

function addStopScrollEvent() {
  popup.addEventListener("scroll", stopScroll);
  popup.addEventListener("mousewheel", stopScroll);
  popup.addEventListener("wheel", stopScroll);
  popup.addEventListener("touchmove", stopScroll);
}

function deleteStopScrollEvent() {
  popup.removeEventListener("scroll", stopScroll);
  popup.removeEventListener("mousewheel", stopScroll);
  popup.removeEventListener("wheel", stopScroll);
  popup.removeEventListener("touchmove", stopScroll);
} */

function fillPopupForm() {
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
}

function openPopup() {
  fillPopupForm();
  popup.classList.add('popup_opened');
/*   addStopScrollEvent(); */
}

function closePopup() {
/*   deleteStopScrollEvent(); */
  popup.classList.remove('popup_opened');
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

/* Скролл удален, идея была не в полной блокировки скролла и прокрутки,
а включении блокировки при открытии поп-апа, потому что насколько я понимаю
UI - очень неприятно открыть окошко и случайно отмотать страницу вниз.
Просто реализация подкачала =) Правильно было добавлять обработчики при открытии popup
и удалять при его закрытии */
