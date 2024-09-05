import { myProfile } from "../..";
import { notify, notifications } from "../notifications";
import { config } from "./baseApiMethods.js";
import { changeTextSmoothly } from "../transitions.js";
import { PUT, DELETE } from "./baseApiMethods.js";

const putLike = (cardId) => {

    const likeURL = config.baseUrl + `/cards/likes/${cardId}`;
  
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

    const likeURL = config.baseUrl + `/cards/likes/${cardId}`;
  
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