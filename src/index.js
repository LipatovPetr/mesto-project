// Импорты функций и других модулей

import './pages/index.css';

import {
  initialCards,

  popupsAll,

  profilePopup, 
  profilePopupForm,
  profilePopupContainer,
  profilePopupOpenButton, 
  profilePopupCloseButton,

  addCardPopup,
  addCardPopupOpenButton,
  addCardPopupCloseButton,
  addCardPopupForm, 
  addCardPopupContainer,
  
  cardsContainer, 

  cardsPhotoPopup, 
  photoPopupCloseButton, 
  photoPopupContainer,

  validationConfig

} from "./components/constants.js";

import {
  createCard,
  renderCard
} from "./components/card.js";

import {
  openPopup,
  closePopup, 
  submitProfileForm, 
  submitCardForm,
  showProfileData,
} from "./components/modal.js";

import {
  enableValidation
} from "./components/validate.js";

// **************** КЛИЕНТСКИЙ КОД **************** 

// Вывод 6 первых карточек по умолчанию 

initialCards.forEach(function(element){
  const newCard = createCard(element.name, element.link); 
  renderCard(newCard, cardsContainer);
})

// Попап "редактировать профиль": вешаем колбэки -открытия, -закрытия попапа, -сабмита изменения данных профиля


profilePopupOpenButton.addEventListener('click', function (){openPopup(profilePopup)});
profilePopupOpenButton.addEventListener('click', showProfileData);
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

popupsAll.forEach(popup => popup.addEventListener('click',function (){closePopup(popup)}));

// Включаем валидацию форм и полей 

enableValidation(validationConfig); 


fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
  headers: {
    authorization: 'c061e49c-1434-49b8-869d-f52e38c6e093'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result.name);
  }); 





