import "./styles/index.css";
import "./components/initialCardsArr.js";
import "./components/cards.js";

import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, likeFunction } from "./components/cards.js";
import { initialCards } from "./components/initialCardsArr.js";

/* глобальные переменные */
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function createPlacesList(initialCards) {
  initialCards.forEach(function (item) {
    const cardElement = createCard(item, likeFunction, deleteCard, imagePopupCallback);
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

profileEditButton.addEventListener("click", (event) => {
  openModal(popupTypeEdit);

  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(event);
  console.log(event.currentTarget.parentElement.parentElement); 
});

popupTypeEdit_closeButton.addEventListener("click", closeModal); 

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

popupTypeNewCard_closeButton.addEventListener("click", closeModal); 

newCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  newCard.name = placeNameInput.value;
  newCard.link = linkInput.value;

  const cardElement = createCard(newCard, likeFunction, deleteCard, imagePopupCallback);
  placesList.prepend(cardElement);

  closeModal(event);

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

buttonCloseImagePopup.addEventListener('click', closeModal); 