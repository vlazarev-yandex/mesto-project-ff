import "./styles/index.css";
import "./components/initialCardsArr.js";
import "./components/cards.js";

import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, likeFunction } from "./components/cards.js";
import { initialCards } from "./components/initialCardsArr.js";
import { makeURL, removeURL } from "./components/urlValidation.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import { apiJS, getProfileInfo } from "./components/api.js";

/* глобальные переменные */
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function createPlacesList(initialCards) {
  initialCards.forEach(function (item) {
    const cardElement = createCard(
      item,
      likeFunction,
      deleteCard,
      imagePopupCallback
    );
    placesList.append(cardElement);
  });
}

/* создаём первичный список карточек */
createPlacesList(initialCards);

/* управляем модальным окном изменения профиля */
const profileInfo = content.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");

const profileEditButton = content.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEdit_closeButton = popupTypeEdit.querySelector(".popup__close");

const editProfileForm = document.forms["edit-profile"];

const titleInput = editProfileForm.elements["profile__title"];
const descriptionInput = editProfileForm.elements["profile__description"];

/* добавил первичный стейт, чтобы при открытии поп-апа кнопка сразу была активной */
titleInput.value = profileTitle.textContent;
descriptionInput.value = profileDescription.textContent;

profileEditButton.addEventListener("click", (event) => {
  openModal(popupTypeEdit);

  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(popupTypeEdit);
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

const placeNameInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements["link"];

const newCard = {
  name: "",
  link: "",
};

addButton.addEventListener("click", (event) => {
  openModal(popupTypeNewCard);
});

popupTypeNewCard_closeButton.addEventListener("click", (event) => {
  closeModal(popupTypeNewCard);
});

newCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  newCard.name = placeNameInput.value;
  newCard.link = linkInput.value;

  const cardElement = createCard(
    newCard,
    likeFunction,
    deleteCard,
    imagePopupCallback
  );
  placesList.prepend(cardElement);

  closeModal(popupTypeNewCard);
  newCardForm.reset();
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
const profileImage = document.querySelector(".profile__image");
const popupEditProfileImage = document.querySelector(
  ".popup_type_profile-image-edit"
);
const buttonCloseEditProfileImagePopup =
  popupEditProfileImage.querySelector(".popup__close");
const editProfileImageForm = document.forms["edit-profile-image"];
const linkProfileImageInput = editProfileImageForm.elements["link-to-image"];

profileImage.addEventListener("click", (event) => {
  openModal(popupEditProfileImage);
  linkProfileImageInput.value = removeURL(profileImage.style.backgroundImage);
});

buttonCloseEditProfileImagePopup.addEventListener("click", (event) => {
  closeModal(popupEditProfileImage);
});

editProfileImageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileImage.style.backgroundImage = makeURL(linkProfileImageInput.value);
  closeModal(popupEditProfileImage);
});

// Вынес в глобальную переменную, а не в аргумент, тк кажется, что эти классы — это просто глобальный инпут. Типа «я в своём коде расставил вот такие классы». Тогда проще объявить это в глобальном поле, а не передавать аргументом во множество функций.
export const classListObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  //inputErrorClass у меня не используется, реализовал через id. Посмотреть: validation.js: 15, validation.js: 25
  errorClass: "popup__error_visible",
};

/* загружаем профиль на страницу */
getProfileInfo(); 

/* включаем валидацию */
enableValidation();
