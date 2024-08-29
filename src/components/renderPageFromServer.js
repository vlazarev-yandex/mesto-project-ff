import { profileTitle, profileDescription, profileImage, imagePopupCallback } from "..";
import { GET } from "./api.js";
import { makeURL } from "./urlValidation.js";
import { createCard, likeFunction, deleteCard } from "./cards.js";
import { profileDataURL, initialCardsURL, linkProfileImageInput, titleInput, descriptionInput } from "..";

/* рисуем профиль по данным с сервера */
export const renderProfile = () => {
    return GET(profileDataURL)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = makeURL(userData.avatar);
      
      /* добавил первичный стейт, чтобы при открытии поп-апа кнопка сразу была активной */
      linkProfileImageInput.value = userData.avatar; 
      titleInput.value = userData.name; 
      descriptionInput.value = userData.about; 
    })
    .catch((error) => {
      console.log(error);
    });
};

/* рисуем список начальных карточек по данным с сервера */
import { placesList } from "..";
export const renderInitialCards = () => {
    GET(initialCardsURL).then((initialCards) => {
      console.log(initialCards); 
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