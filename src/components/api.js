// import { userId, profileImage, apiConfig } from "./constants";

// import { checkServerResponse } from "./utils.js";

// export function getProfileData() {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     headers: apiConfig.headers,
//   }).then(checkServerResponse);
// }

// // Апи запрос получения данных карточек и их отрисовки

// export function getCardsData() {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     headers: apiConfig.headers,
//   }).then(checkServerResponse);
// }

// // Апи запрос получения имени и профессии пользователя (и их отрисовка)

// export function uploadProfileData(nameValue, aboutValue) {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: nameValue,
//       about: aboutValue,
//     }),
//   }).then(checkServerResponse);
// }

// // Функция отправки новой карточки на сервер и ее отрисовка на сайте

// export function uploadNewCard(nameValue, linkValue) {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     method: "POST",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: nameValue,
//       link: linkValue,
//     }),
//   }).then(checkServerResponse);
// }

// // Функция удаления карточки с сервера

// export function removeCardFromServer(card) {
//   return fetch(`${apiConfig.baseUrl}/cards/${card.dataset.cardId}`, {
//     method: "DELETE",
//     headers: apiConfig.headers,
//   });
// }

// // Апи запрос добавления лайка на карточке (и отрисовка на сайте)

// export function addLikeOnServer(cardId) {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: apiConfig.headers,
//   }).then(checkServerResponse);
// }

// // Апи запрос удаления лайка на карточке (и отрисовка на сайте)

// export function removeLikeOnServer(cardId) {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: apiConfig.headers,
//   }).then(checkServerResponse);
// }

// // Функция обновления ссылки аватара (и его отрисовка на сайте)

// export function updateAvatarOnServer(url) {
//   return fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar", {
//     method: "PATCH",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       avatar: url,
//     }),
//   }).then(checkServerResponse);
// }

class Api {
  constructor(data) {
    this.url = data.baseUrl;
    this.headers = data.headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(this.checkResponse)
    .then((data) => {console.log(data)})
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'c061e49c-1434-49b8-869d-f52e38c6e093',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()


  // export function getCardsData(){
  //   return fetch(`${apiConfig.baseUrl}/cards`, {
  //     headers: apiConfig.headers,
  //   })
  //   .then(checkServerResponse)
  // }

  // другие методы работы с API


// const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// });
