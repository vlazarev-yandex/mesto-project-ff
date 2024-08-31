import { cohortName, myProfile } from "..";
import { DELETE, deleteCard, GET, PUT } from "./api";
import { renderDeleteButton, renderLikes } from "./renderPageFromServer";
// @todo: Темплейт карточки
function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

const putLike = (button, profile, url) => {
  const card = document.querySelector(
    `[data-card-id="${button.dataset.parentCardId}"]`
  );
  PUT(profile, url)
    .then((res) => {
      console.log("Отправил лайк на сервер успешно", res);
      button.classList.add("card__like-button_is-active");
      renderLikes(card, res);
    })
    .catch((err) => {
      console.log("Отправил лайк на сервер, но что-то не так: ", err);
    });
};

const removeLike = (button, url) => {
  const card = document.querySelector(
    `[data-card-id="${button.dataset.parentCardId}"]`
  );

  DELETE(url)
    .then((res) => {
      console.log("Лайк удалён", res);
      button.classList.remove("card__like-button_is-active");
      renderLikes(card, res);
    })
    .catch((err) => {
      console.log("Ошибка при снятии лайка", err, url);
    });
};

export function likeFunction(event) {
  const likeButton = event.target;
  const likeURL = `https://nomoreparties.co/v1/${cohortName}/cards/likes/${likeButton.dataset.parentCardId}`;

  const likeButtonHasMyLike = likeButton.classList.contains(
    "card__like-button_is-active"
  );

  if (!likeButtonHasMyLike) {
    putLike(likeButton, myProfile, likeURL);
  } else {
    removeLike(likeButton, likeURL);
  }
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
