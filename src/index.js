// Импорты функций и других модулей

import './pages/index.css';

import {
  createCard,
  renderCard
} from "./components/card.js";

import {
  openPopup,
  closePopup, 
  submitProfileForm, 
  submitCardForm
} from "./components/modal.js";

import {
  enableValidation
} from "./components/validate.js";

// Изначальный массив карточек

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

// **************** ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ **************** 

export const popupsAll = document.querySelectorAll('.popup');

export const profilePopup = document.querySelector('.popup__profile');
export const profilePopupForm = document.getElementById('profile-form'); 
export const profilePopupContainer = document.querySelector('.profile-popup__container');
export const profilePopupFormNameInput = document.getElementById('profile-name-input'); 
export const profilePopupFormjobInput = document.getElementById('profile-occupation-input');  
export const profilePopupOpenButton = document.querySelector('.profile__edit-button'); 
export const profilePopupCloseButton = document.querySelector('.popup__close-icon'); 

export const addCardPopup = document.querySelector('.popup__cards');
export const addCardPopupOpenButton = document.querySelector('.profile__add-button'); 
export const addCardPopupCloseButton = document.querySelector('.popup-cards__close-icon'); 
export const addCardPopupForm = document.getElementById('cards-form'); 
export const addCardPopupFormTitleInput = document.getElementById('card-title-input'); 
export const addCardPopupFormLinkInput = document.getElementById('card-link-input'); 
export const addCardPopupContainer = document.querySelector('.card-popup__container');


export const cardsCard = document.querySelector('.elements__element'); 
export const cardTemplate = document.getElementById('card-template').content; 
export const cardsContainer = document.getElementById('elements-container'); 

export const cardsPhotoPopup = document.querySelector('.photo-popup');
export const photoPopupCloseButton = document.querySelector('.photo-popup__close-icon');
export const photoPopupContainer = document.querySelector('.photo-popup__container');

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_error',
  errorClass: 'form__error-text_active'
}; 

// **************** КЛИЕНТСКИЙ КОД **************** 

// Вывод 6 первых карточек по умолчанию 

initialCards.forEach(function(element){
  const newCard = createCard(element.name, element.link); 
  renderCard(newCard, cardsContainer);
})

// Попап "редактировать профиль": вешаем колбэки -открытия, -закрытия попапа, -сабмита изменения данных профиля

profilePopupOpenButton.addEventListener('click', function (){openPopup(profilePopup)});
profilePopupCloseButton.addEventListener('click', function (){closePopup(profilePopup)});
profilePopupForm.addEventListener('submit', submitProfileForm); 
profilePopupContainer.addEventListener('click', function(event){event.stopPropagation()});

// Попап "добавления карточки": вешаем колбэки -открытия, -закрытия попапа, -сабмита добавления новой карточки

addCardPopupOpenButton.addEventListener('click', function (){openPopup(addCardPopup)})
addCardPopupCloseButton.addEventListener('click', function (){closePopup(addCardPopup)})
addCardPopupForm.addEventListener('submit', submitCardForm); 
addCardPopupContainer.addEventListener('click', function(event){event.stopPropagation()});

// Попап "изображения карточки": вешаем функционал закрытия попапа

photoPopupCloseButton.addEventListener('click', function (){closePopup(cardsPhotoPopup)});
photoPopupContainer.addEventListener('click', function(event){event.stopPropagation()});

// Общий функционал попаов: выключение при нажатии на Esc и клике на оверлей

document.addEventListener('keydown', function (evt) {
  if (evt.key === "Escape") {
    closePopup(addCardPopup);
    closePopup(profilePopup);
    closePopup(cardsPhotoPopup);
  }
});

popupsAll.forEach(popup => popup.addEventListener('click',function (){closePopup(popup)}));




// Включаем валидацию форм и полей 

enableValidation(validationConfig); 


