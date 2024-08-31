import { cohortName, myProfile } from "..";
import { deleteCard, GET, PUT } from "./api";
import { renderDeleteButton, renderLikes } from "./renderPageFromServer";
// @todo: Темплейт карточки
function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

export function likeFunction(event) {
  const likeButton = event.target; 
  const likeURL = `https://nomoreparties.co/v1/${cohortName}/cards/likes/${likeButton.dataset.parentCardId}`;  
  likeButton.classList.toggle("card__like-button_is-active");
  
  PUT(myProfile, likeURL); 
    // .then(console.log)
    // .catch(console.log); 
}

// @todo: DOM узлы
// глобальные элементы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
export function createCard(cardObject, likeFunction, imagePopupCallback) {
  const cardElement = getCardTemplate();

  //кладём контент в шаблон
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikes = cardElement.querySelector(".card__likes");

  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
  cardTitle.textContent = cardObject.name;
  cardElement.dataset.cardId = cardObject._id;
  cardElement.dataset.cardOwnerId = cardObject.owner._id;

  renderLikes(cardElement, cardObject); 

  if (cardElement.dataset.cardOwnerId === myProfile._id) {
    renderDeleteButton(cardElement);
    /* слушатель теперь вешаю внутри функции отрисовки кнопки удаления, только для активных кнопок */
  }

  cardImage.addEventListener("click", (event) => {
    imagePopupCallback(cardImage);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeFunction);

  return cardElement;
}
