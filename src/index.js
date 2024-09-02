import "./styles/index.css";

import { openModal, closeModal } from "./components/modal.js";
import { createCard, likeFunction } from "./components/card.js";
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
import {
  renderLoading,
  deleteCard,
  POST,
  GET,
} from "./components/api.js";
import { notifications, notify } from "./components/notifications.js";

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
  openModal(popupTypeEdit);

  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, editProfileFormButton);
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  /* чтобы было наглядно, как переключается кнопка */
  setTimeout(() => {
    updateProfileInfo(titleInput.value, descriptionInput.value);
    console.log(updateProfilePhoto); 
    closeModal(popupTypeEdit);
    renderLoading(false, editProfileFormButton);
  }, 300);
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

placeNameInput.value = "new card";
linkInput.value = "https://i.postimg.cc/j5NsqWyG/temp-Image-NGHu-Mi.avif";

addButton.addEventListener("click", (event) => {
  openModal(popupTypeNewCard);
});

popupTypeNewCard_closeButton.addEventListener("click", (event) => {
  closeModal(popupTypeNewCard);
});

newCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, newCardFormButton);

  let newCard = {
    likes: [], 
    createdAt: "", 
    name: placeNameInput.value,
    link: linkInput.value,
    _id: "",
    owner: myProfile
  };
  
  const cardElement = createCard(
    newCard,
    likeFunction,
    imagePopupCallback, 
    deleteCard
  );

  POST(newCard, newCardURL)
  .then((res) => {
    cardElement.dataset.cardId = res._id; 
    cardElement.querySelector(".card__like-button").dataset.parentCardId = cardElement.dataset.cardId;
    cardElement.querySelector(".card__delete-button").dataset.parentCardId = cardElement.dataset.cardId;
  });      

  /* чтобы было наглядно, как переключается кнопка */
  setTimeout(() => {
    renderLoading(false, newCardFormButton);
    closeModal(popupTypeNewCard);
    newCardForm.reset();
    placesList.prepend(cardElement);
    notify(notifications.newCardMessage); 
  }, 300);
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
  openModal(popupEditProfileImage);
  linkProfileImageInput.value = removeURL(profileImage.style.backgroundImage);
});

buttonCloseEditProfileImagePopup.addEventListener("click", (event) => {
  closeModal(popupEditProfileImage);
});

editProfileImageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, editProfileImageFormButton);

  /* чтобы было наглядно, как переключается кнопка */
  setTimeout(() => {
    renderLoading(false, editProfileImageFormButton);
    profileImage.style.backgroundImage = makeURL(linkProfileImageInput.value);
    updateProfilePhoto(linkProfileImageInput.value);
    closeModal(popupEditProfileImage);
  }, 300);
});

// Вынес в глобальную переменную, а не в аргумент, тк кажется, что эти классы — это просто глобальный инпут. Типа «я в своём коде расставил вот такие классы». Тогда проще объявить это в глобальном поле, а не передавать аргументом во множество функций.
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  //inputErrorClass у меня не используется, реализовал через id. Посмотреть: validation.js: 15, validation.js: 25
  errorClass: "popup__error_visible",
};

/* включаем валидацию */
enableValidation(validationConfig);

/* загружаем профиль на страницу */
renderProfile(); 
/* ещё раз включаем валидацию, когда данные дошли — так у кнопок будут актуальные состояния */

/* создаём первичный список карточек */
renderInitialCards();

