// **************** ИНИЦИАЛИЗАЦИЯ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ **************** 

const popupProfile = document.querySelector('.popup__profile'); 
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = document.querySelector('.popup__close-icon');

const formElement = document.getElementById('profile-form'); 
const nameInput = document.getElementById('profile-name-input'); 
const jobInput = document.getElementById('profile-occupation-input'); 

const popupCards = document.querySelector('.popup__cards'); 
const popupCardsAddButton = document.querySelector('.profile__add-button');
const popupCardsCloseButton = document.querySelector('.popup-cards__close-icon');
const cardForm = document.getElementById('cards-form'); 
const cardTitleInput = document.getElementById('card-title-input'); 
const cardLinkInput = document.getElementById('card-link-input');

const cardCard = document.querySelector('.elements__element');
const cardTemplate = document.getElementById('card-template').content;
const cardsContainer = document.getElementById('elements-container');

// **************** СЕКЦИЯ "ПРОФИЛЬ" **************** 

// ++++> Редактирование профиля <++++

//  Кнопка "редактировать профиль": вызыв и закрытие попапа

popupFunctionality(popupProfile, popupProfileOpenButton, popupProfileCloseButton);

//  Функционал изменения профиля 

formElement.addEventListener('submit', formSubmitHandler); 

// ++++> Фича добавления новой карточки <++++

//  Кнопка "добавить новую карточку": вызыв и закрытие попапа

popupFunctionality(popupCards, popupCardsAddButton, popupCardsCloseButton);

//  Функционал добавления новой карточки

function CardsFormSubmitHandler (evt) {
  evt.preventDefault(); 
  addCardToArray(); 
  addCardToWebsite();
  addEventOnLikeButton();
  addEventOnRemoveButton();
  addEventOnImageClick();
  addEventOnCloseImageButton();
  popupCards.classList.remove('popup_opened'); 
}; 

cardForm.addEventListener('submit', CardsFormSubmitHandler); 

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

// ---> Cards section: initial cards function

for (let i = 0; i < initialCards.length; i++) {
const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
cardElement.querySelector('.elements__title').textContent = initialCards[i].name; 
cardElement.querySelector('.elements__image').src = initialCards[i].link;

cardElement.querySelector('.elements__heart-button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('elements__heart-button_active');
});   

cardElement.querySelector('.elements__remove-button').addEventListener('click', function (evt) {
  evt.target.closest('.elements__element').remove();
});   

cardElement.querySelector('.elements__image').addEventListener('click', function (evt) {
  const photoPopup = document.querySelector('.photo-popup')
  photoPopup.querySelector('.photo-popup__image').src = initialCards[i].link;
  photoPopup.querySelector('.photo-popup__subtitle').textContent = initialCards[i].name;
  photoPopup.classList.add('photo-popup_opened');
})

addEventOnCloseImageButton();
cardsContainer.append(cardElement);
}




// Функция добавления карточки в массив (БД)

function addCardToArray() {
    let newCard = {
      name: cardTitleInput.value,
      link: cardLinkInput.value
    }
    initialCards.push(newCard);
    console.log(initialCards); 
}

// Функция вывода последней карточки из массива на сайт

function addCardToWebsite() {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);

  inputTitleValue = initialCards[initialCards.length - 1].name; 
  inputLinkValue = initialCards[initialCards.length - 1].link;

  cardElement.querySelector('.elements__title').textContent = inputTitleValue;  
  cardElement.querySelector('.elements__image').src = inputLinkValue; 

  cardsContainer.prepend(cardElement);
}

// Функция добавления эвента на кнопку лайка карточки

function addEventOnLikeButton() {
  cardsContainer.querySelector('.elements__heart-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart-button_active');
  }); 
}

// Функция добавления эвента на кнопку удаления карточки  

function addEventOnRemoveButton() {
  cardsContainer.querySelector('.elements__remove-button').addEventListener('click', function (evt) {
      evt.target.closest('.elements__element').remove();
  });   
}

// Функция добавления эвента изображение карточки

function addEventOnImageClick() {
  cardsContainer.querySelector('.elements__image').addEventListener('click', function (evt) {
    const photoPopup = document.querySelector('.photo-popup')
    photoPopup.querySelector('.photo-popup__image').src = initialCards[initialCards.length - 1].link;
    photoPopup.querySelector('.photo-popup__subtitle').textContent = initialCards[initialCards.length - 1].name; 
    photoPopup.classList.add('photo-popup_opened');
  })
}


const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);


// Функция добавления эвента на кнопку выключения попапа карточки

function addEventOnCloseImageButton() {
  document.querySelector('.photo-popup__close-icon').addEventListener('click', function (evt) {
    const photoPopup = document.querySelector('.photo-popup');
    photoPopup.classList.remove('photo-popup_opened');
  });  
}


// **************** Functions ****************

// Open and close popup functionality: 
function popupFunctionality(popupName, popupOpenButton, popupCloseButton ) {

  popupOpenButton.addEventListener('click', function(){ 
    popupName.classList.add('popup_opened'); 
    }
  )    

  popupCloseButton.addEventListener('click', function(){ 
    popupName.classList.remove('popup_opened'); 
    }
  )
}

// Profile edit functionality: change name and occupation 

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let name = nameInput.value;
  let occupation = jobInput.value;
  
  if (name == '' || occupation == '') {
    alert('Заполните все поля формы');
  }  else {
    document.querySelector('.profile__name').textContent = name;
    document.querySelector('.profile__title').textContent = occupation;
    popupProfile.classList.remove('popup_opened'); 
  }
};