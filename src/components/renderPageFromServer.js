import { profileTitle, profileDescription, profileImage, imagePopupCallback } from "..";
import { GET } from "./api.js";
import { makeURL } from "./urlValidation.js";
import { createCard, likeFunction, deleteCard } from "./cards.js";
import { profileDataURL, initialCardsURL } from "..";

/* рисуем профиль по данным с сервера */
export const renderProfile = () => {
    GET(profileDataURL)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = makeURL(userData.avatar);
    })
    .catch((error) => {
      console.log(error);
    });
};

/* рисуем список начальных карточек по данным с сервера */
import { placesList } from "..";
export const renderInitialCards = () => {
    GET(initialCardsURL).then((initialCards) => {
    initialCards.forEach(function (item) {
      const cardElement = createCard(
        item,
        likeFunction,
        deleteCard,
        imagePopupCallback
      );
      placesList.append(cardElement);
    });
  });
};