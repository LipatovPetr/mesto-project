// Массив карточек, которые должны выводиться по умолчанию 

const initialCards = [
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

// **************** ИНИЦИАЛИЗАЦИЯ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ **************** 

const profilePopup = document.querySelector('.popup__profile');
const profilePopupForm = document.getElementById('profile-form'); 

const profilePopupFormNameInput = document.getElementById('profile-name-input'); 
const profilePopupFormjobInput = document.getElementById('profile-occupation-input');  

const profilePopupOpenButton = document.querySelector('.profile__edit-button'); 
const profilePopupCloseButton = document.querySelector('.popup__close-icon'); 

const cardsAddCardPopup = document.querySelector('.popup__cards'); 
const cardsAddCardPopupOpenButton = document.querySelector('.profile__add-button'); 
const cardsAddCardPopupCloseButton = document.querySelector('.popup-cards__close-icon'); 

const cardsAddCardPopupForm = document.getElementById('cards-form'); 
const cardsAddCardPopupFormTitleInput = document.getElementById('card-title-input'); 
const cardsAddCardPopupFormLinkInput = document.getElementById('card-link-input'); 

const cardsCard = document.querySelector('.elements__element'); 
const cardTemplate = document.getElementById('card-template').content; 
const cardsContainer = document.getElementById('elements-container'); 

const cardsPhotoPopup = document.querySelector('.photo-popup');
const photoPopupCloseButton = document.querySelector('.photo-popup__close-icon');

// **************** КЛИЕНТСКИЙ КОД ****************

// Функцирнал попапа "редактировать профиль": вешаем функции открытие и закрытия попапа, изменение данных профиля

profilePopupOpenButton.addEventListener('click', function (){openPopup(profilePopup)});
profilePopupCloseButton.addEventListener('click', function (){closePopup(profilePopup)});
profilePopupForm.addEventListener('submit', submitProfileForm); 

// Функцирнал попапа "добавить новую карточку": вешаем функции добавляем функционал открытия и закрытия попапа

cardsAddCardPopupOpenButton.addEventListener('click', function (){openPopup(cardsAddCardPopup)})
cardsAddCardPopupCloseButton.addEventListener('click', function (){closePopup(cardsAddCardPopup)})
cardsAddCardPopupForm.addEventListener('submit', submitCardForm); 

// Функцирнал закрытия попапа изображения карточки

photoPopupCloseButton.addEventListener('click', function (){closePopup(cardsPhotoPopup)});


// Вывод карточек по умолчанию 

initialCards.forEach(function(element){
  const newCard = createCard(element.name, element.link); 
  renderCard(newCard, cardsContainer);
})

// **************** ФУНКЦИИ ****************

// Функция открытия попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//  Колбэк-функция изменения данных профиля 

function submitProfileForm (evt) {
  evt.preventDefault(); 
  const name = profilePopupFormNameInput.value;
  const occupation = profilePopupFormjobInput.value;
  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__title').textContent = occupation;
  closePopup(profilePopup);
};

// Колбэк-функция подтверждения формы добавления карточки 

function submitCardForm (evt) {
  evt.preventDefault(); 
  const newCard = createCard(cardsAddCardPopupFormTitleInput.value, cardsAddCardPopupFormLinkInput.value);
  renderCard(newCard, cardsContainer); 
  closePopup(cardsAddCardPopup);
  cardsAddCardPopupForm.reset();
}; 

//  Функция создания карточки  

function createCard(name, link){
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__title').textContent = name; 
  cardElement.querySelector('.elements__image').src = link;
  cardElement.querySelector('.elements__heart-button').addEventListener('click', toggleCardLikeStatus);
  cardElement.querySelector('.elements__remove-button').addEventListener('click', removeCard);
  cardElement.querySelector('.elements__image').addEventListener('click', renderCardPopup);
  return cardElement; 
};

// Функция добавления карточки на вебсайт

function renderCard(card, container) {
  container.prepend(card);
} 

// Функция удаления карточки

function removeCard(evt){
  evt.target.closest('.elements__element').remove();
};

//  Функция включения/отключения лайка карточки 

function toggleCardLikeStatus(evt){
  evt.target.classList.toggle('elements__heart-button_active');
}

//  Функция открытия попапа с изображением   

function renderCardPopup(evt){
  const targetCard = evt.target.closest('.elements__element')
  cardsPhotoPopup.querySelector('.photo-popup__image').src = targetCard.querySelector('.elements__image').src;
  cardsPhotoPopup.querySelector('.photo-popup__subtitle').textContent = targetCard.querySelector('.elements__title').textContent;
  openPopup(cardsPhotoPopup); 
}


