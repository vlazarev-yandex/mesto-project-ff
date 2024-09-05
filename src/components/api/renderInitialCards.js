import { imagePopupCallback } from "../../index.js";
import { GET, config } from "./baseApiMethods.js";
import { likeFunction } from "./likeMethods.js";
import { createCard } from "../card.js";
import { deleteCard } from "./deleteCard.js";

/* рисуем список начальных карточек по данным с сервера */

const sortCards = (cardsArray) => {
  return cardsArray.sort(function (cardA, cardB) {
    const likesA = cardA.likes.length;
    const likesB = cardB.likes.length;
    if (likesA > likesB) return -1;
    if (likesA < likesB) return 1;
    return 0;
  });
};

export const getInitialCards = () => {
  const initialCardsURL = config.baseUrl + `/cards`;
  return GET(initialCardsURL)
    .then((initialCards) => {
      return initialCards;
    })
    .catch((error) => {
      return Promise.reject(`Не удалось получить карточки${error}`);
    });
};

export const renderInitialCards = () => {
  const placesList = document.querySelector(".places__list");

  return getInitialCards()
    .then((initialCards) => {
      const sortedInitialCards = sortCards(initialCards);
      sortedInitialCards
      .forEach(function (card) {
        const cardElement = createCard(
          card,
          likeFunction,
          imagePopupCallback,
          deleteCard
        );
        placesList.append(cardElement);
        return initialCards;
      }); 
      })
      .catch((err) => {
        return Promise.reject(`Не удалось отрисовать профиль: ${err}`);
      });
}
