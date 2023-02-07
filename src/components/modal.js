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
  
    profilePopup,
    profilePopupFormNameInput,
    profilePopupFormjobInput,
    profilePopupSubmitButton,

    cardsPhotoPopup,
    cardsPhotoPopupImage,
    cardsPhotoPopupSubtitle,
    validationConfig,
  
} from "./constants.js";

import {updateProfileData, uploadNewCard, updateAvatar} from "./api.js";

// функция закрытия попапа при нажадии на Esc

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция открытия попапа и добавление листенера закрытия при нажатии на Esc

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

// Функция закрытия попапа и удаление листенера закрытия при нажатии на Esc

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}


//  Колбэк-функция отображения данных профиля в попапе профиля

export function showProfileData(){
  profilePopupFormNameInput.value = profileNameTitle.textContent; 
  profilePopupFormjobInput.value = profileOcupationTitle.textContent;
  profilePopupSubmitButton.disabled = true;
  profilePopupSubmitButton.classList.add(validationConfig.inactiveButtonClass);
}

//  Колбэк-функция изменения данных профиля 

export function submitProfileForm(evt) {
  evt.preventDefault(); 
  updateProfileData(profilePopupFormNameInput.value, profilePopupFormjobInput.value);
  closePopup(profilePopup);
};

// Колбэк-функция подтверждения формы добавления карточки 

export function submitCardForm(evt) {
  evt.preventDefault(); 
  uploadNewCard(addCardPopupFormTitleInput.value, addCardPopupFormLinkInput.value); 
  closePopup(addCardPopup);
  addCardPopupForm.reset();
  addCardPopupSubmitButton.disabled = true;
  addCardPopupSubmitButton.classList.add(validationConfig.inactiveButtonClass);
}; 

//  Функция открытия попапа с изображением   

export function renderCardPopup(evt){
  const targetCard = evt.target.closest('.elements__element')
  cardsPhotoPopupImage.src = targetCard.querySelector('.elements__image').src;
  cardsPhotoPopupSubtitle.textContent = targetCard.querySelector('.elements__title').textContent;
  openPopup(cardsPhotoPopup); 
};

export function submitAvatarForm(evt) {
  evt.preventDefault(); 
  updateAvatar(avatarPopupFormUrlInput.value); 
  closePopup(avatarPopup);
  avatarPopupForm.reset();
  avatarPopupSubmitButton.disabled = true;
  avatarPopupSubmitButton.classList.add(validationConfig.inactiveButtonClass);
};
