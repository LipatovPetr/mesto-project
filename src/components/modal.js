import {
    addCardPopup,
    addCardPopupForm,
    addCardPopupFormTitleInput,
    addCardPopupFormLinkInput,
    

    profilePopup,
    profilePopupForm,
    profilePopupFormNameInput,
    profilePopupFormjobInput,

    cardsPhotoPopup, 
    cardsContainer,

} from "../index.js";

import {createCard, renderCard} from "./card.js";

// Функция открытия попапа

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//  Колбэк-функция изменения данных профиля 

export function submitProfileForm(evt) {
  evt.preventDefault(); 
  const name = profilePopupFormNameInput.value;
  const occupation = profilePopupFormjobInput.value;
  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__title').textContent = occupation;
  closePopup(profilePopup);
  profilePopupForm.reset();
};

// Колбэк-функция подтверждения формы добавления карточки 

export function submitCardForm (evt) {
  evt.preventDefault(); 
  const newCard = createCard(addCardPopupFormTitleInput.value, addCardPopupFormLinkInput.value);
  renderCard(newCard, cardsContainer); 
  closePopup(addCardPopup);
  addCardPopupForm.reset();
  
}; 

//  Функция открытия попапа с изображением   

export function renderCardPopup(evt){
  const targetCard = evt.target.closest('.elements__element')
  cardsPhotoPopup.querySelector('.photo-popup__image').src = targetCard.querySelector('.elements__image').src;
  cardsPhotoPopup.querySelector('.photo-popup__subtitle').textContent = targetCard.querySelector('.elements__title').textContent;
  openPopup(cardsPhotoPopup); 
}

