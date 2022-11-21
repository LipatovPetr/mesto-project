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

const cardsPhotoPopup = document.querySelector('.photo-popup') // photoPopup
const photoPopupCloseButton = document.querySelector('.photo-popup__close-icon')

// **************** СЕКЦИЯ "ПРОФИЛЬ" **************** 

//  Кнопка "редактировать профиль": добваляем функционал открытия и закрытия попапа

profilePopupOpenButton.addEventListener('click', openProfilePopup);
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
profilePopupForm.addEventListener('submit', profileFormSubmitHandler); 

//  Кнопка "добавить новую карточку": добваляем функционал открытия и закрытия попапа

cardsAddCardPopupOpenButton.addEventListener('click', openAddCardPopup)
cardsAddCardPopupCloseButton.addEventListener('click', closeAddCardPopup)
cardsAddCardPopupForm.addEventListener('submit', cardsFormSubmitHandler); 

// **************** СЕКЦИЯ "КАРТОЧКИ" ****************

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

// **************** ФУНКЦИИ ****************

// Функция добавления данных новой карточки из попап-формы в массив 'initial cards'

function addCardToInitialArray() { 
    const idValue = initialCards.length + 1; 
    const newCard = {
      name: cardsAddCardPopupFormTitleInput.value,
      link: cardsAddCardPopupFormLinkInput.value,
      id: idValue
    }
    initialCards.push(newCard);
}

//  Колбэк для кнопки добавления новой карточки через попап-форму

function cardsFormSubmitHandler (evt) {
  evt.preventDefault(); 
  addCardToInitialArray(); 
  updateCardsOnWebsite();
  closeAddCardPopup();
}; 

//  Функция открытия попапа профиля

function openProfilePopup(){
  profilePopup.classList.add('popup_opened'); 
}

//  Функция закрытия попапа профиля

function closeProfilePopup(){
  profilePopup.classList.remove('popup_opened'); 
}

//  Функция открытия попапа добавления новой карточки

function openAddCardPopup(){
  cardsAddCardPopup.classList.add('popup_opened'); 
}

//  Функция закрытия попапа добавления новой карточки

function closeAddCardPopup(){
  cardsAddCardPopup.classList.remove('popup_opened'); 
}

//  Функция открытия попапа с изображение карточки

function openCardImagePopup(){
  cardsPhotoPopup.classList.add('photo-popup_opened');
}

//  Функция закрытия попапа с изображение карточки

function closeCardImagePopup(){
  cardsPhotoPopup.classList.remove('photo-popup_opened');
}

//  Функция включения/отключения лайка карточки 

function toggleCardLikeStatus(evt){
  evt.target.classList.toggle('elements__heart-button_active');
}

//  Функция удаления карточки  

function removeCard(evt){
  targetCard = evt.target.closest('.elements__element').getAttribute('data-id'); 
  initialCards.splice(initialCards.findIndex((card) => card.id == targetCard),1);
  evt.target.closest('.elements__element').remove();
  updateCardsOnWebsite();
}

//  Функция открытия попапа с изображением   

function createCardImagePopup(evt){
  targetCardId = evt.target.closest('.elements__element').getAttribute('data-id'); 
  cardsPhotoPopup.querySelector('.photo-popup__image').src = initialCards[targetCardId - 1].link;
  cardsPhotoPopup.querySelector('.photo-popup__subtitle').textContent = initialCards[targetCardId - 1].name;
  photoPopupCloseButton.addEventListener('click', closeCardImagePopup);
  openCardImagePopup();
}

//  Функция изменения данных профиля 

function profileFormSubmitHandler (evt) {
  evt.preventDefault(); 

  let name = profilePopupFormNameInput.value;
  let occupation = profilePopupFormjobInput.value;
  
  if (name == '' || occupation == '') {
    alert('Заполните все поля формы');
  }  else {
    document.querySelector('.profile__name').textContent = name;
    document.querySelector('.profile__title').textContent = occupation;
    closeProfilePopup();
  }
};

// добавляем значение id в изначальный массив

function updateIndexesInitalCards(){
  for (i = 0; i < initialCards.length; i++){
    initialCards[i].id = i + 1;
  }
}
updateIndexesInitalCards(); 

// добавляем значение id в изначальный массив

function updateCardsOnWebsite() {
  const addedCards = cardsContainer.querySelectorAll('.elements__element');
  const addedCardsIds = [];

  addedCards.forEach(element => {
    addedCardsIds.push(element.getAttribute('data-id'))
  })

  for (i = 0; i < initialCards.length; i++) {
      if(addedCardsIds.some(cardId => cardId == initialCards[i].id)){
        continue; 
      } else {
        let cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
        cardElement.querySelector('.elements__title').textContent = initialCards[i].name; 
        cardElement.querySelector('.elements__image').src = initialCards[i].link;
        cardElement.setAttribute("data-id", i + 1);
          
        cardElement.querySelector('.elements__heart-button').addEventListener('click', toggleCardLikeStatus);
        cardElement.querySelector('.elements__remove-button').addEventListener('click', removeCard);
        cardElement.querySelector('.elements__image').addEventListener('click', createCardImagePopup);

      cardsContainer.prepend(cardElement);
      console.log(`Карта ID№${i + 1} пришлось добавить`)
    } 

  }
}

updateCardsOnWebsite();

