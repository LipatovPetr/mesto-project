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

  export const profileNameTitle = document.querySelector('.profile__name');
  export const profileOcupationTitle = document.querySelector('.profile__title');
  
  export const popupsAll = document.querySelectorAll('.popup');
  
  export const profilePopup = document.querySelector('.popup__profile');
  export const profilePopupForm = document.getElementById('profile-form'); 
  export const profilePopupContainer = document.querySelector('.profile-popup__container');
  export const profilePopupFormNameInput = document.getElementById('profile-name-input'); 
  export const profilePopupFormjobInput = document.getElementById('profile-occupation-input');  
  export const profilePopupOpenButton = document.querySelector('.profile__edit-button'); 
  export const profilePopupCloseButton = document.querySelector('.popup__close-icon');
  export const profilePopupSubmitButton = document.querySelector('.profile-form__button');

  
  export const addCardPopup = document.querySelector('.popup__cards');
  export const addCardPopupOpenButton = document.querySelector('.profile__add-button'); 
  export const addCardPopupCloseButton = document.querySelector('.popup-cards__close-icon'); 
  export const addCardPopupForm = document.getElementById('cards-form'); 
  export const addCardPopupFormTitleInput = document.getElementById('card-title-input'); 
  export const addCardPopupFormLinkInput = document.getElementById('card-link-input'); 
  export const addCardPopupContainer = document.querySelector('.card-popup__container');
  export const addCardPopupSubmitButton = document.querySelector('.card-form__button');

  export const cardsCard = document.querySelector('.elements__element'); 
 
  export const cardTemplate = document.getElementById('card-template').content; 
  export const cardsContainer = document.getElementById('elements-container'); 
  
  export const cardsPhotoPopup = document.querySelector('.photo-popup');
  export const cardsPhotoPopupImage = cardsPhotoPopup.querySelector('.photo-popup__image'); 
  export const cardsPhotoPopupSubtitle = cardsPhotoPopup.querySelector('.photo-popup__subtitle'); 
  
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


  
