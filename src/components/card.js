import { cohortName, imagePopupCallback, myProfile, newCardURL, initialCardsURL } from "..";
import { DELETE, GET, PUT, POST } from "./api";
import { notify, notifications } from "./notifications";
import { renderDeleteButton, renderLikes } from "./renderPageFromServer";
// @todo: Темплейт карточки
function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

const putLike = (cardId) => {
  const likeURL = `https://nomoreparties.co/v1/${cohortName}/cards/likes/${cardId}`;

  return PUT(myProfile, likeURL)
    .then((res) => {
      console.log("Отправил лайк на сервер успешно", res);
      notify(notifications.likeMessage);
      return res;
    })
    .catch((err) => {
      console.log("Отправил лайк на сервер, но что-то не так: ", err);
    });
};

const removeLike = (cardId) => {
  const likeURL = `https://nomoreparties.co/v1/${cohortName}/cards/likes/${cardId}`;

  return DELETE(likeURL)
    .then((res) => {
      console.log("Лайк удалён", res);
      notify(notifications.dislikeMessage);
      return res;
    })
    .catch((err) => {
      console.log("Ошибка при снятии лайка", err, cardId);
    });
};

export function likeFunction(event) {
  const likeButton = event.target;
  const cardId = likeButton.dataset.parentCardId;
  const card = document.querySelector(`[data-card-id="${cardId}"]`);
  const likeButtonHasMyLike = likeButton.classList.contains(
    "card__like-button_is-active"
  );

  const likeMethod = likeButtonHasMyLike ? removeLike : putLike;

  likeMethod(cardId)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      renderLikes(card, res);
    })
    .catch((err) => {
      console.log(
        `Ошибка при ${likeButtonHasMyLike ? "снятии" : "постановке"} лайка`,
        err
      );
    });
}

export const deleteCard = (event) => {
  const cardId = event.target.dataset.parentCardId;
  const card = document.querySelector(`[data-card-id="${cardId}"]`);
  const cardURL = initialCardsURL + "/" + cardId;
  DELETE(cardURL)
    .then(() => {
      card.remove();
      notify(notifications.deleteCardMessage);
    })
    .catch((err) => {
      console.log("Не удалось удалить карточку", err);
    });
};

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
      const cardElement = createCard(res, likeFunction, imagePopupCallback, deleteCard);
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
