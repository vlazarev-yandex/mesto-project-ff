import {
  profileTitle,
  profileDescription,
  profileImage,
  imagePopupCallback,
} from "..";
import { GET } from "./baseApiMethods.js";
import { makeURL } from "./urlValidation.js";
import { createCard, likeFunction, deleteCard } from "./card.js";
import {
  profileDataURL,
  initialCardsURL,
  linkProfileImageInput,
  titleInput,
  descriptionInput,
  myProfile,
} from "..";
import { changeTextSmoothly, toggleVisibility } from "./transitions.js";

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

      console.log('Профиль, отрисован', userData); 
    })
    .catch((error) => {
      console.log('Не удалось отрисовать профиль', error);
    });
};

/* рисуем список начальных карточек по данным с сервера */
import { placesList } from "..";

const sortCards = (cardsArray) => {
  return cardsArray.sort ( function (cardA, cardB) {
    const likesA = cardA.likes.length; 
    const likesB = cardB.likes.length; 
    if (likesA > likesB) return -1; 
    if (likesA < likesB) return 1; 
    return 0; 
  })
}

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

export const renderLikes = (cardElement, cardObject) => {
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikes = cardElement.querySelector(".card__likes");
  likeButton.dataset.parentCardId = cardElement.dataset.cardId;

  const likesAmount = cardObject.likes.length;

  if (likesAmount > 0) {
    changeTextSmoothly(cardLikes, cardObject.likes.length);
    setTimeout(() => {
      cardLikes.classList.remove("card__likes-hidden");
    }, 300); 
  } else {
    changeTextSmoothly(cardLikes, cardObject.likes.length);
    cardLikes.classList.add("card__likes-hidden");
  }

  const hasMyLike = cardObject.likes.some((like) => {
    return like._id == myProfile._id;
  });

  likeButton.classList.toggle("card__like-button_is-active", hasMyLike);
};