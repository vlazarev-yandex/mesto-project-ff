import { config } from "./baseApiMethods";
import { GET } from "./baseApiMethods";
import { makeURL } from "../urlValidation";

/* рисуем профиль по данным с сервера */
const getProfile = () => {
    const profileInfoURL = config.baseUrl + `/users/me`;
    return GET(profileInfoURL)
      .then((userData) => {
        return userData;
      })
      .catch((error) => {
        return Promise.reject(`Не удалось получить профиль${error}`);
      });
  };
  
  export const renderProfile = () => {
    const profileInfo = document.querySelector(".profile__info");
    const profileTitle = profileInfo.querySelector(".profile__title");
    const profileDescription = profileInfo.querySelector(".profile__description");
    const profileImage = document.querySelector(".profile__image");
  
    return getProfile()
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = makeURL(userData.avatar);
        return userData;
      })
      .catch((err) => {
        return Promise.reject(`Не удалось отрисовать профиль: ${err}`);
      });
  };