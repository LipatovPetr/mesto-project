import {
    userId, 
    profileNameTitle,
    profileOcupationTitle,
    profileImage,
    cardsContainer, 
    apiConfig
} from "./constants"

import {
    createCard,
    renderCard, 
  } from "./card.js"

  
  // Функция отрисовки данных профиля

 function renderProfile(data){
    profileNameTitle.textContent = data.name;
    profileOcupationTitle.textContent = data.about;
    profileImage.src = data.avatar; 
    userId.id = data._id;
  };
  
  function renderError(err){
    console.log(err);
  }; 

// Апи запрос данных профиля отрисовки данных профиля

  export function loadProfileDataFromServer(){
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  })
    .then((res) => {
        if (res.ok) {
            return res.json(); 
            }
        return Promise.reject(res.status);
  })
    .then((result) => { 
      renderProfile(result);
  })
    .catch((err) => {
        renderError(`Ошибка: ${err}`); 
  })
}

loadProfileDataFromServer();

// Апи запрос получения данных карточек и их отрисовки

export function loadCardsData(){
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  })
    .then((res) => {
        if (res.ok) {
            return res.json(); 
            }
        return Promise.reject(res.status);
    })
    .then((result) => {
      result.forEach(function(element){
        const likeStatus = element.likes.some(like => like._id === userId.id);
        const newCard = createCard(element.name, element.link, element.likes.length, element.owner._id, element._id); 
        renderCard(newCard, cardsContainer, likeStatus);
      })
  })
    .catch((err) => {
        renderError(`Ошибка: ${err}`); 
  })
}

loadCardsData();

// Апи запрос получения имени и профессии пользователя (и их отрисовка)


export function updateProfileData(nameValue, aboutValue){
  fetch(`${apiConfig.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: apiConfig.headers,
  body: JSON.stringify({
    name: nameValue,
    about: aboutValue
  })
})
    .then((res) => {
        if (res.ok) {
            return res.json(); 
            }
        return Promise.reject(res.status);
    })
  .then((response) => {
    profileNameTitle.textContent = response.name,
    profileOcupationTitle.textContent = response.about
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`); 
  })
}

// Функция отправки новой карточки на сервер и ее отрисовка на сайте 

export function uploadNewCard(nameValue, linkValue){
  fetch(`${apiConfig.baseUrl}/cards`, {
      method: "POST",
      headers: apiConfig.headers,
      body: JSON.stringify({
          name: nameValue,
          link: linkValue,
    }),
  })
    .then((res) => {
        if (res.ok) {
            return res.json(); 
            }
        return Promise.reject(res.status);
  })
    .then((response) => {
      const newCard = createCard(response.name, response.link, response.likes.length, response.owner._id, response._id);
      renderCard(newCard, cardsContainer);
  })
    .catch((err) => {
        renderError(`Ошибка: ${err}`); 
  })
}

// Функция удаления карточки с сервера

export function removeCardFromServer(card){
return fetch(`${apiConfig.baseUrl}/cards/${card.dataset.cardId}`, {
  method: "DELETE",
  headers: apiConfig.headers,
})
}

// Апи запрос добавления лайка на карточке (и отрисовка на сайте)

function addLikeOnCard(evt, targetCardId){
  evt.target.classList.add('elements__heart-button_active');

  return fetch(`${apiConfig.baseUrl}/cards/likes/${targetCardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  })
    .then((res) => {
        if (res.ok) {
            return res.json(); 
            }
        return Promise.reject(res.status);
  })
  .then((response) => {
    evt.target.nextElementSibling.textContent = response.likes.length; 
   })
  .catch((err) => {
    renderError(`Ошибка: ${err}`); 
  })
}

// Апи запрос удаления лайка на карточке (и отрисовка на сайте)


function removeLikeOnCard(evt, targetCardId){
  evt.target.classList.remove('elements__heart-button_active');

  return fetch(`${apiConfig.baseUrl}/cards/likes/${targetCardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
  .then((res) => {
    if (res.ok) {
        return res.json(); 
        }
    return Promise.reject(res.status);
  })
  .then((response) => {
    evt.target.nextElementSibling.textContent = response.likes.length; 
  })
   .catch((err) => {
    renderError(`Ошибка: ${err}`); 
  })
}
// Апи запрос проверки наличия лайка пользователя на карточки (и колбек удаления/добавления в зависимости от результата)

export function toggleLike(evt){
  const targetCardId = evt.target.closest('.elements__element').getAttribute('data-card-id');
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  })
  .then((res) => {
    if (res.ok) {
        return res.json(); 
        }
    return Promise.reject(res.status);
  })
  .then((response) => {
    const targetCardLikes = response.find(card => card._id === targetCardId).likes;
    if(targetCardLikes.some(like => like._id === userId.id)){
      removeLikeOnCard(evt, targetCardId);
    } else {
      addLikeOnCard(evt, targetCardId);
    }
  })
   .catch((err) => {
    renderError(`Ошибка: ${err}`); 
  })
}

// Функция обновления ссылки аватара (и его отрисовка на сайте)

export function updateAvatar(url){
  fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar', {
  method: 'PATCH',
  headers: apiConfig.headers,
  body: JSON.stringify({
    avatar: url,
  })
})
  .then((res) => {
        if (res.ok) {
            return res.json(); 
            }
        return Promise.reject(res.status);
  })
  .then((response) => {
    profileImage.src = response.avatar;
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`); 
  })
}