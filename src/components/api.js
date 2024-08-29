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
      console.log(`Ошибка в запросе GET: ${err}.\nПопробуйте перезагрузить страницу.`);
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
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(`Ошибка в запросе PATCH: ${err}.\nПопробуйте перезагрузить страницу.`);
      errorPage.classList.add("server-error-visible");
      errorTitle.textContent = err;
      errorMessage.textContent = "Ошибка. Попробуйте перезагрузить страницу";
    });
};

export const deleteCardFromServer = (cardId) => {
  const cardURL = initialCardsURL + '/' + cardId; 
  fetch(cardURL, {
    method: 'DELETE',
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
  })
    .then( () => {console.log('удолил'); })
    .catch((err) => {console.log(err); }); 
}

export const POST = (obj, url) => {
  fetch(url, {
    method: 'POST',
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  })
    .then( () => {console.log('успешно'); })
    .catch((err) => {console.log(err); }); 
}

export function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = "Сохранение..."
  } else {
    button.textContent = "Сохранить"
  }
}