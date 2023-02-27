// import {cardTemplate, userId} from "./constants";
// import {addLikeOnServer, removeLikeOnServer, getCardsData, removeCardFromServer} from "./api.js";
// import {renderCardPopup} from "./modal.js";

//import openPopup

import { api } from "./api.js";

const userId = "c6b69b7acd7fe01fee50d11b"; // убрать когда создадим класс пользователя

class Card {
  constructor({ _id, name, link, likes, owner }, selector/*, handleCardClick*/) {
    this.name = name;
    this.link = link;
    this.likesValue = likes.length;
    this.likesData = likes;
    this._id = _id;
    this._idOwner = owner._id;
    this._selector = selector;
    //this.handleCardClick = handleCardClick;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.cloneNode(true);
    this._element = cardElement;
  }

  _isOwner() {
    if (this._idOwner === userId) {
      return true;
    } else {
      return false;
    }
  }

  _isLiked() {
    if (this.likesData.some((like) => like._id === userId)) {
      return true;
    } else {
      return false;
    }
  }

  _setRemoveButtonStatus() {
    if (this._isOwner()) {
      this._element
        .querySelector(".elements__remove-button")
        .classList.add("elements__remove-button_active");
    } else {
      this._element
        .querySelector(".elements__remove-button")
        .classList.remove("elements__remove-button_active");
    }
  }

  _setInitialLikeStatus() {
    if (this._isLiked()) {
      this._element
        .querySelector(".elements__heart-button")
        .classList.add("elements__heart-button_active");
    } else {
      this._element
        .querySelector(".elements__heart-button")
        .classList.remove("elements__heart-button_active");
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__heart-button")
      .addEventListener("click", this.toggleLike);
    this._element
      .querySelector(".elements__remove-button")
      .addEventListener("click", this.removeCard);
  }

  removeCard(evt) { // уточнить почему без эвента не получается
    evt.target.closest(".elements__element").remove();
    api.removeCardFromServer(
      evt.target.closest(".elements__element").dataset.cardId
    );
  }

  generate() {
    this._getElement();
    this._element.querySelector(".elements__image").src = this.link;
    this._element.querySelector(".elements__image").alt = this.name;
    this._element.querySelector(".elements__title").textContent = this.name;
    this._element.querySelector(".elements__likes-value").textContent = this.likesValue;
    this._element.querySelector(".elements__element").dataset.cardId = this._id;
    this._element.querySelector(".elements__element").dataset.ownerId = this._idOwner;
    this._setRemoveButtonStatus();
    this._setInitialLikeStatus();
    this._setEventListeners();
    return this._element;
  }

  toggleLike(evt) {
    const targetCardId = evt.target
      .closest(".elements__element")
      .getAttribute("data-card-id");

    api.getInitialCards().then((cardsData) => {
      const targetCardLikesData = cardsData.find(
        (card) => card._id === targetCardId
      ).likes;

      if (targetCardLikesData.some((like) => like._id === userId)) {
        api.removeLikeOnServer(targetCardId).then((updatedCardData) => {
          evt.target
            .closest(".elements__element")
            .querySelector(".elements__likes-value").textContent =
            updatedCardData.likes.length;
          evt.target.classList.remove("elements__heart-button_active");
        });
      } else {
        api.addLikeOnServer(targetCardId).then((updatedCardData) => {
          evt.target
            .closest(".elements__element")
            .querySelector(".elements__likes-value").textContent =
            updatedCardData.likes.length;
          evt.target.classList.add("elements__heart-button_active");
        });
      }
    });
  }

  render(card) {
    const container = document.getElementById("elements-container");
    container.prepend(card);
  }

  // handleCardClick(evt) {
  //   evt.target.addEventListener('click', openPopup);
  // }
}

api.getInitialCards().then((data) => {
  data.forEach((el) => {
    const card = new Card(el, ".card-template");
    card.render(card.generate());
  });
});

// Для каждой карточки создайте экземпляр класса Card.

//  Когда дойдёте до реализации классов Popup,
//   свяжите класс Card c попапом. Сделайте так,
//    чтобы Card принимал в конструктор функцию handleCardClick.
//     При клике на карточку эта функция должна открывать попап с картинкой.
