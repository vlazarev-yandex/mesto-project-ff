import { errorPage } from "..";
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
      console.log(`Ошибка: ${err}.\nПопробуйте перезагрузить страницу.`);
      errorPage.classList.add("server-error-visible");
      errorPage.textContent = `Ошибка: ${err}.\nПопробуйте перезагрузить страницу.`;
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
      console.log(`Ошибка: ${err}.\nПопробуйте перезагрузить страницу.`);
      errorPage.classList.add('server-error-visible');
      errorPage.textContent = `Ошибка: ${err}.\nПопробуйте перезагрузить страницу.`;
    });
};
