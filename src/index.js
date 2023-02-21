// Импорты функций и других переменных

import './pages/index.css';

import {
  userId,

  avatarPopup,
  avatarPopupContainer,
  avatarPopupCloseButton,
  avatarPopupForm, 

  popupsAll,

  profileImage,
  profileNameTitle,
  profileOcupationTitle,

  cardsContainer, 
  
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

  cardsPhotoPopup, 
  photoPopupCloseButton, 
  photoPopupContainer,

  validationConfig

} from "./components/constants.js";

import {
  openPopup,
  closePopup, 
  submitProfileForm, 
  submitCardForm,
  showProfileData,
  submitAvatarForm
} from "./components/modal.js";

import {
  createCard,
  renderCard
} from "./components/card.js";

import {
  getProfileData,
  getCardsData, 
} from "./components/api.js";

import {
  renderError,
} from "./components/utils.js";

import {
  enableValidation
} from "./components/validate.js";

// **************** КЛИЕНТСКИЙ КОД **************** 

// Загружаем даные пользователя 

Promise.all([getProfileData(), getCardsData()])
  .then(([profileData, cardsData]) => {
    profileNameTitle.textContent = profileData.name;
    profileOcupationTitle.textContent = profileData.about;
    profileImage.src = profileData.avatar; 
    userId.id = profileData._id;

    cardsData.forEach(function(element){
      const userLikeStatus = element.likes.some(like => like._id === userId.id);
      const newCard = createCard(element.name, element.link, element.likes.length, element.owner._id, element._id); 
      renderCard(newCard, cardsContainer, userLikeStatus);
    })
  })
  .catch((err) => {
        renderError(`Ошибка: ${err}`); 
      })

// Попап "редактировать аватар": вешаем колбэки -открытия, -закрытия попапа, -сабмита изменения изображения 

profileImage.addEventListener('click', function (){openPopup(avatarPopup)})
avatarPopupCloseButton.addEventListener('click', function (){closePopup(avatarPopup)});
avatarPopupContainer.addEventListener('click', function(event){event.stopPropagation()});
avatarPopupForm.addEventListener('submit', submitAvatarForm); 

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





