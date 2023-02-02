import {initialCards, cardTemplate, cardsContainer} from "../index.js";
import {renderCardPopup} from "./modal.js";

//  Функция создания карточки  

export function createCard(name, link){
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__title').textContent = name; 
  cardElement.querySelector('.elements__image').src = link;
  cardElement.querySelector('.elements__heart-button').addEventListener('click', toggleCardLikeStatus);
  cardElement.querySelector('.elements__remove-button').addEventListener('click', removeCard);
  cardElement.querySelector('.elements__image').addEventListener('click', renderCardPopup);
  return cardElement; 
};

// Функция добавления карточки на вебсайт

export function renderCard(card, container) {
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
