import "./styles/index.css";
import { openModal, closeModal } from "./components/modal/modal.js";
import { postNewCard } from "./components/card.js/card.js";
import { makeURL, removeURL } from "./components/urlValidation.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import { renderInitialCards } from "./components/api/renderInitialCards.js";
import { renderProfile } from "./components/api/renderProfile.js";
import {
  updateProfileInfo,
  updateProfilePhoto,
} from "./components/api/updateProfile.js";
import { notifications, notify } from "./components/notifications.js";
import { changeTextSmoothly, renderLoading } from "./components/transitions.js";

/* отрисовываем профиль и карточки */
export const myProfile = await renderProfile();
export const initialCards = await renderInitialCards();

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

const content = document.querySelector(".content");
export const placesList = content.querySelector(".places__list");

/* управляем профилем */
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const profileEditButton = content.querySelector(".profile__edit-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEdit_closeButton = popupTypeEdit.querySelector(".popup__close");

const editProfileForm = document.forms["edit-profile"];
export const titleInput = editProfileForm.elements["profile__title"];
export const descriptionInput = editProfileForm.elements["profile__description"];
const editProfileFormButton = editProfileForm.querySelector("button");

titleInput.value = myProfile.name; 
descriptionInput.value = myProfile.about;

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
        changeTextSmoothly(profileTitle, res.name);
        changeTextSmoothly(profileDescription, res.about);
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

/* открываем поп-ап с изменением аватара профиля */
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
linkProfileImageInput.value = myProfile.avatar;

profileImage.addEventListener("click", (event) => {
  clearValidation(
    popupEditProfileImage,
    editProfileImageFormButton,
    validationConfig
  );
  openModal(popupEditProfileImage);
  linkProfileImageInput.value = removeURL(profileImage.style.backgroundImage);
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
      .then((res) => {
        profileImage.style.backgroundImage = makeURL(res.avatar);
        notify(notifications.profileAvatarUpdated);
      })
      .catch((err) => {
        console.log("Ошибка при обновлении аватарки:", err);
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

  postNewCard(placeNameInput.value, linkInput.value, myProfile)
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