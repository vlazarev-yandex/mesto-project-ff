import { imagePopupCallback, myProfile } from "..";
import { DELETE, GET, PUT, POST, config } from "./api/baseApiMethods";
import { renderLikes, likeFunction } from "./api/likeMethods";
import { deleteCard } from "./api/deleteCard";

// @todo: Темплейт карточки
function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

// @todo: DOM узлы
// глобальные элементы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
export function createCard(
  cardObject,
  likeFunction,
  imagePopupCallback,
  deleteCard
) {
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
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.classList.add("card__delete-button-active");
    deleteButton.dataset.parentCardId = cardElement.dataset.cardId;
    deleteButton.addEventListener("click", deleteCard);
  }

  cardImage.addEventListener("click", (event) => {
    imagePopupCallback(cardImage);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeFunction);

  return cardElement;
}

export const postNewCard = (title, link) => {
  const newCardURL = config.baseUrl + `/cards`;

  let newCard = {
    likes: [],
    createdAt: "",
    name: title,
    link: link,
    _id: "",
    owner: myProfile,
  };

  return POST(newCard, newCardURL)
    .then((res) => {
      const cardElement = createCard(
        res,
        likeFunction,
        imagePopupCallback,
        deleteCard
      );
      cardElement.dataset.cardId = res._id;
      cardElement.querySelector(".card__like-button").dataset.parentCardId =
        cardElement.dataset.cardId;
      cardElement.querySelector(".card__delete-button").dataset.parentCardId =
        cardElement.dataset.cardId;
      return cardElement;
    })
    .catch((err) => {
      console.log("Не удалось выложить карточку:", err);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};
