let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();

  let popupNameInput = document.querySelector('.popup__name');
  let popupAboutInput = document.querySelector('.popup__text');
  let profileName = document.querySelector('.profile__header');
  let profileAbout = document.querySelector('.profile__text');
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  closePopup();
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


function fillPopupForm() {
  let popupNameInput = document.querySelector('.popup__name');
  let popupAboutInput = document.querySelector('.popup__text');
  popupNameInput.value = document.querySelector('.profile__header').innerText;
  popupAboutInput.value = document.querySelector('.profile__text').innerText;
}

function openPopup() {
  let popup = document.querySelector('.popup');
  fillPopupForm();
  popup.classList.add('popup_opened');
}

function closePopup() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}




formElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

/* Предотвращаем прокрутку страницы при открытом попапе */
function stopScroll(evt) {
  evt.preventDefault();
}
popup.addEventListener("scroll", stopScroll);
popup.addEventListener("mousewheel", stopScroll);
popup.addEventListener("wheel", stopScroll);
popup.addEventListener("touchmove", stopScroll);
