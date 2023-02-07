import {cardTemplate, userId} from "./constants";
import {removeCardFromServer, toggleLike} from "./api.js";
import {renderCardPopup} from "./modal.js";

//  Функция создания карточки  

export function createCard(name, link, likes, ownerId, cardId){
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.elements__image'); 
  const cardElementTitle = cardElement.querySelector('.elements__title');  
  const cardElementLikes = cardElement.querySelector('.elements__likes-value'); 
  cardElementTitle.textContent = name; 
  cardElementLikes.textContent = likes; 
  cardElementImage.alt = name;
  cardElementImage.src = link;
  cardElement.dataset.ownerId = ownerId; 
  cardElement.dataset.cardId = cardId; 
  cardElement.querySelector('.elements__heart-button').addEventListener('click', toggleLike);
  cardElementImage.addEventListener('click', renderCardPopup);
  return cardElement; 
};

// Функция добавления карточки на вебсайт

export function renderCard(card, container, likeStatus) {
  const likeButton = card.querySelector('.elements__heart-button')
  container.prepend(card);
  toggleRemoveButtonStatus(card);
  toggleCardLikeStatus(likeButton, likeStatus);
} 

// Функция проверки создателя/владельца карточки 

function checkCardOwner(card){
  if (userId.id === card.dataset.ownerId){
    return true; 
  } else {
    return false; 
  }
}

// Подключение отключение кнопки удаления

export function toggleRemoveButtonStatus(card){
  const removeButton = card.querySelector('.elements__remove-button');
  if (checkCardOwner(card)){
    removeButton.classList.add('elements__remove-button_active')
    removeButton.addEventListener('click', function (){removeCardFromServer(card)});
    removeButton.addEventListener('click', removeCardFromDom); 
  } else { 
    removeButton.classList.remove('elements__remove-button_active');
  }

}

// Функция удаления карточки из верстки

function removeCardFromDom(evt){
  evt.target.closest('.elements__element').remove();
};

//  Функция включения/отключения лайка карточки 

function toggleCardLikeStatus(card, status){
  if (status){
    card.classList.add('elements__heart-button_active');
  } else {
    card.classList.remove('elements__heart-button_active');
  }
}





