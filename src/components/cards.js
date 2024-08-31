import { myId } from "..";
import { deleteCard } from "./api";
import { renderDeleteButton } from "./renderPageFromServer";
// @todo: Темплейт карточки
function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

export function likeFunction(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

// @todo: DOM узлы
// глобальные элементы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
export function createCard(
  cardObject,
  likeFunction,
  imagePopupCallback
) {
  const cardElement = getCardTemplate();

  //кладём контент в шаблон
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
  cardTitle.textContent = cardObject.name;

  cardElement.dataset.cardId = cardObject._id; 
  cardElement.dataset.cardOwnerId = cardObject.owner._id; 
  
  if (cardElement.dataset.cardOwnerId === myId) {
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