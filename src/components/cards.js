import {initialCards} from './initialCardsArr.js'
import {
  openModal, 
  closeModal, 
  allCloseModalEvents 
} from "./modal.js";

// @todo: Темплейт карточки
function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

export function likeFunction(event) {
  event.target.classList.toggle('card__like-button_is-active'); 
}

// @todo: DOM узлы
// глобальные элементы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
export function createCard(initialCard) {
  const cardElement = getCardTemplate();


  //кладём контент в шаблон
  const cardImage = cardElement.querySelector(".card__image"); 
  const cardTitle = cardElement.querySelector(".card__title"); 
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (event) => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', (event) => {
    
    const popupImage = document.querySelector(".popup_type_image");
    const popupImage_closeButton = popupImage.querySelector(".popup__close");
    const popupImage_img = popupImage.querySelector(".popup__image");
    const popupImage_caption = popupImage.querySelector(".popup__caption");

    popupImage_img.src = cardImage.src; 
    popupImage_img.alt = cardImage.alt; 
    popupImage_caption.textContent = cardImage.alt; 

    openModal(popupImage); 
    allCloseModalEvents(popupImage, popupImage_closeButton, "Escape"); 
  })

  const likeButton = cardElement.querySelector('.card__like-button'); 
  likeButton.addEventListener('click', likeFunction); 

  return cardElement; 
}

// @todo: Функция удаления карточки
export function deleteCard(cardToDelete) {
  cardToDelete.remove();
}

// @todo: Вывести карточки на страницу
export function createPlacesList(initialCards) {
  initialCards.forEach(function (item) {  

    const cardElement = createCard(item);
    placesList.append(cardElement);
  });
}