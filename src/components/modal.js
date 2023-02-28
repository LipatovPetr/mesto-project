import {
  avatarPopup,
  avatarPopupFormUrlInput, 
  avatarPopupForm,
  avatarPopupSubmitButton, 

  addCardPopup,
  addCardPopupForm,
  addCardPopupFormTitleInput,
  addCardPopupFormLinkInput,
  addCardPopupSubmitButton,

  profileNameTitle,
  profileOcupationTitle,
  
  profileImage,
  profilePopup,
  profilePopupFormNameInput,
  profilePopupFormjobInput,
  profilePopupSubmitButton,

  cardsContainer,
  cardsPhotoPopup,
  cardsPhotoPopupImage,
  cardsPhotoPopupSubtitle,
  validationConfig,
  
} from "./constants.js";

import {uploadProfileData, uploadNewCard, updateAvatarOnServer} from "./api.js";

import {createCard,
  renderCard,
} from "./card.js";

import {renderError} from "./utils";

// // функция закрытия попапа при нажадии на Esc

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// // Функция открытия попапа и добавление листенера закрытия при нажатии на Esc

// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape); 
// }

// // Функция закрытия попапа и удаление листенера закрытия при нажатии на Esc

// export function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape); 
// }

//  Колбэк-функция отображения данных профиля в попапе профиля

export function showProfileData(){
  profilePopupFormNameInput.value = profileNameTitle.textContent; 
  profilePopupFormjobInput.value = profileOcupationTitle.textContent;
  profilePopupSubmitButton.disabled = true;
  profilePopupSubmitButton.classList.add(validationConfig.inactiveButtonClass);
}

//  Колбэк-функция изменения данных профиля 

export function submitProfileForm(evt){
  evt.preventDefault(); 
  profilePopupSubmitButton.value = 'Сохраняю...'; 
  uploadProfileData(profilePopupFormNameInput.value, profilePopupFormjobInput.value)
    .then((response) => {
      profileNameTitle.textContent = response.name,
      profileOcupationTitle.textContent = response.about,
      closePopup(profilePopup)
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
    .finally(
      profilePopupSubmitButton.value = 'Сохранить'
    )
};

// Колбэк-функция подтверждения формы добавления карточки 

export function submitCardForm(evt) {
  evt.preventDefault(); 
  addCardPopupSubmitButton.value = 'Сохраняю...'; 
  uploadNewCard(addCardPopupFormTitleInput.value, addCardPopupFormLinkInput.value)
    .then((response) => {
      const newCard = createCard(response.name, response.link, response.likes.length, response.owner._id, response._id);
      renderCard(newCard, cardsContainer);
      addCardPopupForm.reset();
      addCardPopupSubmitButton.disabled = true;
      addCardPopupSubmitButton.classList.add(validationConfig.inactiveButtonClass);
      closePopup(addCardPopup);
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`); 
    })
    .finally(
      addCardPopupSubmitButton.value = 'Сохранить'
    )
}; 

//  Функция открытия попапа с изображением   

export function renderCardPopup(evt){
  const targetCard = evt.target.closest('.elements__element')
  cardsPhotoPopupImage.src = targetCard.querySelector('.elements__image').src;
  cardsPhotoPopupImage.alt = targetCard.querySelector('.elements__title').textContent;
  cardsPhotoPopupSubtitle.textContent = targetCard.querySelector('.elements__title').textContent;
  openPopup(cardsPhotoPopup); 
};

//  Функция открытия попапа с изображением   

export function submitAvatarForm(evt){
  evt.preventDefault(); 
  avatarPopupSubmitButton.value = 'Сохраняю...'; 
  updateAvatarOnServer(avatarPopupFormUrlInput.value)
  .then((response) => {
    profileImage.src = response.avatar;
    closePopup(avatarPopup);
    avatarPopupForm.reset();
    avatarPopupSubmitButton.disabled = true;
    avatarPopupSubmitButton.classList.add(validationConfig.inactiveButtonClass);
   
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`); 
  })
  .finally(
    avatarPopupSubmitButton.value = 'Сохранить'
    )
};
