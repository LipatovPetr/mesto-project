// Импорты функций и других модулей

import './pages/index.css';

import {
  userId,

  avatarPopup,
  // avatarPopupContainer,
  // avatarPopupCloseButton,
  avatarPopupForm, 

  // popupsAll,

  profileImage,
  profileNameTitle,
  profileOcupationTitle,

  cardsContainer, 
  
  profilePopup, 
  profilePopupForm,
  // profilePopupContainer,
  profilePopupOpenButton, 
  // profilePopupCloseButton,

  addCardPopup,
  addCardPopupOpenButton,
  // addCardPopupCloseButton,
  addCardPopupForm, 
  // addCardPopupContainer,

  // cardsPhotoPopup, 
  // photoPopupCloseButton, 
  // photoPopupContainer,

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

import {
  UserInfo, 
} from "./components/userInfo.js";

// **************** КЛИЕНТСКИЙ КОД **************** 

// здесь должны использоваться все классы
// и оздаваться из экземпляры

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
avatarPopupForm.addEventListener('submit', submitAvatarForm); 

// Попап "редактировать профиль": вешаем колбэки -открытия, -закрытия попапа, -сабмита изменения данных профиля

profilePopupOpenButton.addEventListener('click', function (){openPopup(profilePopup)});
profilePopupOpenButton.addEventListener('click', showProfileData);
profilePopupForm.addEventListener('submit', submitProfileForm); 

// Попап "добавления карточки": вешаем колбэки -открытия, -закрытия попапа, -сабмита добавления новой карточки

addCardPopupOpenButton.addEventListener('click', function (){openPopup(addCardPopup)})
addCardPopupForm.addEventListener('submit', submitCardForm); 

// Включаем валидацию форм и полей 

enableValidation(validationConfig); 





