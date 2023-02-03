import {
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

    cardsPhotoPopup,
    cardsPhotoPopupImage,
    cardsPhotoPopupSubtitle,
    cardsContainer,

    validationConfig

} from "./constants.js";

import {createCard, renderCard} from "./card.js";

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

  if (popup == profilePopup){
    profilePopupFormNameInput.value = profileNameTitle.textContent; 
    profilePopupFormjobInput.value = profileOcupationTitle.textContent;
  } 
}

// Функция закрытия попапа и удаление листенера закрытия при нажатии на Esc

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

//  Колбэк-функция изменения данных профиля 

export function submitProfileForm(evt) {
  evt.preventDefault(); 
  const nameInput = profilePopupFormNameInput.value;
  const occupationInput = profilePopupFormjobInput.value;
  profileNameTitle.textContent = nameInput;
  profileOcupationTitle.textContent = occupationInput;
  closePopup(profilePopup);
  
};

// Колбэк-функция подтверждения формы добавления карточки 

export function submitCardForm (evt) {
  evt.preventDefault(); 
  const newCard = createCard(addCardPopupFormTitleInput.value, addCardPopupFormLinkInput.value);
  renderCard(newCard, cardsContainer); 
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

