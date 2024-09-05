import { config, DELETE } from "./baseApiMethods";
import { notify, notifications } from "../notifications";

const deleteCardFromServer = (cardId) => {
  const cardURL = config.baseUrl + `/cards/` + cardId;
  return DELETE(cardURL)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка при удалении карточки с сервера: ${err}`);
    });
};

export const deleteCard = (event) => {
  const cardId = event.target.dataset.parentCardId;
  const card = document.querySelector(`[data-card-id="${cardId}"]`);
  return deleteCardFromServer(cardId)
    .then((res) => {
      card.remove();
      notify(notifications.deleteCardMessage);
      return res;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка при удалении карточки с сервера: ${err}`);
    });
};
