// Токен: 936197d7-9c28-4a02-b461-a2e30a81b6a7
// Идентификатор группы: wff-cohort-21

import { makeURL } from "./urlValidation";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "936197d7-9c28-4a02-b461-a2e30a81b6a7",
    "Content-Type": "application/json",
  },
};

const getInitialCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-21/cards", {
    headers: {
      authorization: "936197d7-9c28-4a02-b461-a2e30a81b6a7",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
};

export const getProfileInfo = () => {
  const profileInfo = document.querySelector(".profile__info");
  const profileTitle = profileInfo.querySelector(".profile__title");
  const profileDescription = profileInfo.querySelector(".profile__description");
  const profileImage = document.querySelector(".profile__image");

  return fetch("https://nomoreparties.co/v1/wff-cohort-21/users/me ", {
    headers: {
      authorization: "936197d7-9c28-4a02-b461-a2e30a81b6a7",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileImage.style.backgroundImage = makeURL(result.avatar);
    });
};

export const apiJS = () => {

};

// form.addEventListener('submit', function submit(e) {
//     e.preventDefault();
//     renderLoading(true); 
//     search(form.elements.entity.value, form.elements.entityId.value)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//       return Promise.reject(res.status);
//       }
//     })
//     .then((res) => {
//       renderResult(res.name); 
//     })
//     .catch((err) => {renderError(`Ошибка: ${err}`);})
//     .finally(() => {
//       renderLoading(false); 
//     });
//   }); 
  
//   function search(entity, entityId) {
//     return fetch(`https://swapi.nomoreparties.co/${entity}/${entityId}`); 
//   }
  
//   function renderResult(text) {
//     result.textContent = text; 
//     error.textContent = ''; 
//   }
