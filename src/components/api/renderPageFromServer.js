import {
  imagePopupCallback,
  initialCardsURL
} from "../..";
import { GET, config } from "./baseApiMethods.js";
import { makeURL } from "../urlValidation.js";
import { likeFunction } from "./likeMethods.js";
import { createCard, deleteCard } from "../card.js";

/* рисуем список начальных карточек по данным с сервера */
import { placesList } from "../..";

const sortCards = (cardsArray) => {
  return cardsArray.sort(function (cardA, cardB) {
    const likesA = cardA.likes.length;
    const likesB = cardB.likes.length;
    if (likesA > likesB) return -1;
    if (likesA < likesB) return 1;
    return 0;
  });
};

export const renderInitialCards = () => {
  GET(initialCardsURL).then((initialCards) => {
    const sortedInitialCards = sortCards(initialCards);
    sortedInitialCards.forEach(function (item) {
      const cardElement = createCard(
        item,
        likeFunction,
        imagePopupCallback,
        deleteCard
      );
      placesList.append(cardElement);
    });
  });
};
