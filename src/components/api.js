import { errorPage, errorTitle, errorMessage, initialCardsURL } from "..";
const authorizationToken = "936197d7-9c28-4a02-b461-a2e30a81b6a7";

export const GET = (url) => {
  return fetch(url, {
    headers: {
      authorization: authorizationToken,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.log(
        `Ошибка в запросе GET: ${err}.\nПопробуйте перезагрузить страницу.`
      );
      errorPage.classList.add("server-error-visible");
      errorPage.textContent = `Ошибка в запросе GET: ${err}.\nПопробуйте перезагрузить страницу.`;
    });
};

export const PATCH = (obj, url) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        console.log('PATCH, успешно', obj, url, res); 
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка в запросе PATCH:", err, obj, url);
      errorPage.classList.add("server-error-visible");
      errorTitle.textContent = err;
      errorMessage.textContent = "Ошибка. Попробуйте перезагрузить страницу";
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};

export const deleteCard = (cardId) => {
  const card = document.querySelector(`[data-card-id="${cardId}"]`);
  const cardURL = initialCardsURL + "/" + cardId;
  fetch(cardURL, {
    method: "DELETE",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("Удалено", cardId, card, res);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки: ", err, cardId, card);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
  card.remove();
};

export const POST = (obj, url) => {
  return fetch(url, {
    method: "POST",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        console.log("POST", obj, url, " — успешно");
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка в запросе POST", obj, url, err);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};

export const PUT = (obj, url) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        console.log("PUT", obj, url, " — успешно");
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка в запросе PUT", obj, url, err);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};

export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
