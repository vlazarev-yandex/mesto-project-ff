import {
  profileTitle,
  profileDescription,
  profileImage,
  imagePopupCallback,
} from "..";
import { GET, deleteCard } from "./api.js";
import { makeURL } from "./urlValidation.js";
import { createCard, likeFunction } from "./cards.js";
import {
  profileDataURL,
  initialCardsURL,
  linkProfileImageInput,
  titleInput,
  descriptionInput,
  myId
} from "..";

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
export const renderDeleteButton = (cardElement) => {
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.classList.add('card__delete-button-active'); 
  deleteButton.dataset.parentCardId = cardElement.dataset.cardId; 

  deleteButton.addEventListener("click", (event) => {
    deleteCard(deleteButton.dataset.parentCardId); 
  });

  return deleteButton; 
}

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

export const renderLikes = (cardElement, cardObject) => {
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikes = cardElement.querySelector(".card__likes");
  likeButton.dataset.parentCardId = cardElement.dataset.cardId; 

  const likesAmount = cardObject.likes.length;
  
  if (likesAmount > 0) {
    cardLikes.textContent = cardObject.likes.length;
  } else {
    cardLikes.classList.add('no-likes'); 
  }

  // const likesArray = cardObject.likes; 
  // console.log(likesArray.some((likeInfo) => {
  //     return !likeInfo._id == myProfile._id; 
  //   })); 
}