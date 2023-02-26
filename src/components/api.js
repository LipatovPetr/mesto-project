// import { userId, profileImage } from "./constants";

class Api {
  constructor(data) {
    this.url = data.baseUrl;
    this.headers = data.headers;
  }

  checkResponse(res) {
    if (res.ok) {
      console.log(`Запрос к ${res.url} статус:${res.status} `);
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // получаем изначальныq массив карточек
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(this.checkResponse)
  }

  //получаем данные пользователя
  getProfileData() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then(this.checkResponse);
  }

  // получение инфы пользователя
  uploadProfileData(nameValue, aboutValue) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue,
      }),
    })
      .then(this.checkResponse);
  }

  // отправка новой карточки на сервер
  uploadNewCard(nameValue, linkValue) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue,
      }),
    })
      .then(this.checkResponse);
  }

  // удаление карточки с сервера
  removeCardFromServer(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.checkResponse);
  }

  // добавление лайка на карточке
  addLikeOnServer(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this.checkResponse);
  }

  // удаление лайка на карточке
  removeLikeOnServer(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // обновления аватара
  updateAvatarOnServer(url) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then(this.checkResponse);
  }

};

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'c061e49c-1434-49b8-869d-f52e38c6e093',
    'Content-Type': 'application/json'
  }
});





