import { cohortName } from "..";

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortName}`,
  headers: {
    authorization: "936197d7-9c28-4a02-b461-a2e30a81b6a7",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    console.log("Успешно", res);
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

const handleError = (err) => {
  console.log(`Ошибка в запросе GET: ${err}.`);
  return Promise.reject(`Что-то пошло не так: ${err}`);
}

export const GET = (url) => {
  return fetch(url, {
    headers: config.headers,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const PATCH = (obj, url) => {
  return fetch(url, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(obj),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const DELETE = (url) => {
  return fetch(url, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const POST = (obj, url) => {
  return fetch(url, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(obj),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const PUT = (obj, url) => {
  return fetch(url, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(obj),
  })
    .then(handleResponse)
    .catch(handleError);
};
