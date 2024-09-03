import "./styles/index.css";

import { openModal, closeModal } from "./components/modal.js";
import { postNewCard, deleteCard } from "./components/card.js";
import { makeURL, removeURL } from "./components/urlValidation.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  renderProfile,
  renderInitialCards,
} from "./components/renderPageFromServer.js";
import {
  updateProfileInfo,
  updateProfilePhoto,
} from "./components/updateServerData.js";
import { renderLoading, POST, GET } from "./components/api.js";
import { notifications, notify } from "./components/notifications.js";
import { changeTextSmoothly } from "./components/transitions.js";

/* глобальные переменные */
export const cohortName = "wff-cohort-21";
export const profileDataURL = `https://nomoreparties.co/v1/${cohortName}/users/me`;
export const myProfile = await GET(profileDataURL);

export const profileAvatarURL = `https://nomoreparties.co/v1/${cohortName}/users/me/avatar`;
export const initialCardsURL = `https://nomoreparties.co/v1/${cohortName}/cards`;
export const newCardURL = `https://nomoreparties.co/v1/${cohortName}/cards`;

const content = document.querySelector(".content");
export const placesList = content.querySelector(".places__list");

/* управляем модальным окном изменения профиля */
const profileInfo = content.querySelector(".profile__info");
export const profileTitle = profileInfo.querySelector(".profile__title");
export const profileDescription = profileInfo.querySelector(
  ".profile__description"
);

const profileEditButton = content.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEdit_closeButton = popupTypeEdit.querySelector(".popup__close");

const editProfileForm = document.forms["edit-profile"];

export const titleInput = editProfileForm.elements["profile__title"];
export const descriptionInput =
  editProfileForm.elements["profile__description"];
const editProfileFormButton = editProfileForm.querySelector("button");

profileEditButton.addEventListener("click", (event) => {
  clearValidation(popupTypeEdit, editProfileFormButton, validationConfig);
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputHasNoNewInfo =
    profileTitle.textContent == titleInput.value &&
    profileDescription.textContent == descriptionInput.value;

  if (inputHasNoNewInfo) {
    closeModal(popupTypeEdit);
  } else {
    renderLoading(true, editProfileFormButton);

    updateProfileInfo(titleInput.value, descriptionInput.value)
      .then((res) => {
        changeTextSmoothly(profileTitle, titleInput.value);
        changeTextSmoothly(profileDescription, descriptionInput.value);
        notify(notifications.profileInfoUpdated);
      })
      .catch((err) => {
        console.log("Ошибка при обновлении информации в профиле:", err);
        notify(notifications.profileInfoUpdatedErr);
      })
      .finally(() => {
        renderLoading(false, editProfileFormButton);
        clearValidation(popupTypeEdit, editProfileFormButton, validationConfig);
        closeModal(popupTypeEdit);
      });
  }
});

popupTypeEdit_closeButton.addEventListener("click", (event) => {
  closeModal(popupTypeEdit);
});

/* управляем поп-апом по созданию новой карточки */
const addButton = content.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeNewCard_closeButton =
  popupTypeNewCard.querySelector(".popup__close");

const newCardForm = document.forms["new-place"];
const newCardFormButton = newCardForm.querySelector(".button");

const placeNameInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements["link"];

placeNameInput.value = "Случайная картинка";
linkInput.value = "https://random.imagecdn.app/300/300";

addButton.addEventListener("click", (event) => {
  clearValidation(popupTypeNewCard, newCardFormButton, validationConfig);
  openModal(popupTypeNewCard);
});

popupTypeNewCard_closeButton.addEventListener("click", (event) => {
  clearValidation(popupTypeNewCard, newCardFormButton, validationConfig);
  closeModal(popupTypeNewCard);
});

newCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, newCardFormButton);

  postNewCard(placeNameInput.value, linkInput.value)
    .then((newCardWithId) => {
      placesList.prepend(newCardWithId);
      notify(notifications.newCardMessage);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении информации в профиле:", err);
      notify(notifications.newCardMessageErr);
    })
    .finally(() => {
      renderLoading(false, newCardFormButton);
      closeModal(popupTypeNewCard);
      clearValidation(popupTypeNewCard, newCardFormButton, validationConfig);
      newCardForm.reset();
    });
});

/* открываем поп-ап с картинкой */
const popupImage = document.querySelector(".popup_type_image");
const buttonCloseImagePopup = popupImage.querySelector(".popup__close");

export function imagePopupCallback(cardImage) {
  const imagePopupImage = popupImage.querySelector(".popup__image");
  const captionPopupImage = popupImage.querySelector(".popup__caption");

  imagePopupImage.src = cardImage.src;
  imagePopupImage.alt = cardImage.alt;
  captionPopupImage.textContent = cardImage.alt;

  openModal(popupImage);
}

buttonCloseImagePopup.addEventListener("click", (event) => {
  closeModal(popupImage);
});

/* открываем поп-ап с изменением аватара профиля */
export const profileImage = document.querySelector(".profile__image");
const popupEditProfileImage = document.querySelector(
  ".popup_type_profile-image-edit"
);
const buttonCloseEditProfileImagePopup =
  popupEditProfileImage.querySelector(".popup__close");
const editProfileImageForm = document.forms["edit-profile-image"];
const editProfileImageFormButton =
  editProfileImageForm.querySelector(".button");
export const linkProfileImageInput =
  editProfileImageForm.elements["link-to-image"];

profileImage.addEventListener("click", (event) => {
  clearValidation(
    popupEditProfileImage,
    editProfileImageFormButton,
    validationConfig
  );
  openModal(popupEditProfileImage);
  linkProfileImageInput.value = removeURL(profileImage.style.backgroundImage);
  linkProfileImageInput.focus(); 
  linkProfileImageInput.select(); 
});

buttonCloseEditProfileImagePopup.addEventListener("click", (event) => {
  closeModal(popupEditProfileImage);
  clearValidation(
    popupEditProfileImage,
    editProfileImageFormButton,
    validationConfig
  );
});

editProfileImageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputHasNoNewInfo =
    removeURL(profileImage.style.backgroundImage) ==
    linkProfileImageInput.value;

  if (inputHasNoNewInfo) {
    closeModal(popupEditProfileImage);
  } else {
    renderLoading(true, editProfileImageFormButton);
    updateProfilePhoto(linkProfileImageInput.value)
      .then(() => {
        profileImage.style.backgroundImage = makeURL(
          linkProfileImageInput.value
        );
        notify(notifications.profileAvatarUpdated);
      })
      .catch((err) => {
        console.log("Ошибка при обновлении информации в профиле:", err);
        notify(notifications.profileAvatarUpdatedErr);
      })
      .finally(() => {
        renderLoading(false, editProfileImageFormButton);
        clearValidation(
          popupEditProfileImage,
          editProfileImageFormButton,
          validationConfig
        );
        closeModal(popupEditProfileImage);
      });
  }
});

/* включаем валидацию */
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  //inputErrorClass у меня не используется, реализовал через id. Посмотреть: validation.js: 15, validation.js: 25
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

/* загружаем профиль на страницу */
renderProfile();

/* создаём первичный список карточек */
renderInitialCards();