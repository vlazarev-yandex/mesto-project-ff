import './styles/index.css'; 
import './components/initialCardsArr.js'; 
import './components/cards.js'; 

import { openModal, closeModal, allCloseModalEvents } from "./components/modal.js";
import { createCard, createPlacesList } from './components/cards.js';
import { initialCards } from './components/initialCardsArr.js';

/* глобальные переменные */
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

/* создаём первичный список карточек */
createPlacesList(initialCards);

/* управляем модальным окном изменения профиля */
const profileInfo = content.querySelector('.profile__info'); 
const profileTitle = profileInfo.querySelector('.profile__title'); 
const profileDescription = profileInfo.querySelector('.profile__description'); 

const profileEditButton = content.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEdit_closeButton = popupTypeEdit.querySelector(".popup__close");

const editProfileForm = document.forms['edit-profile']; 

const titleInput = editProfileForm.elements['profile__title']
const descriptionInput = editProfileForm.elements['profile__description']

profileEditButton.addEventListener("click", (event) => {
    openModal(popupTypeEdit);
    allCloseModalEvents(popupTypeEdit, popupTypeEdit_closeButton, "Escape"); 

    titleInput.value = profileTitle.textContent; 
    descriptionInput.value = profileDescription.textContent; 

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        closeModal(popupTypeEdit); 
        profileTitle.textContent = titleInput.value; 
        profileDescription.textContent = descriptionInput.value; 
    }); 
}); 

/* управляем поп-апом по созданию новой карточки */
const addButton = content.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeNewCard_closeButton =
  popupTypeNewCard.querySelector(".popup__close");

const newCardForm = document.forms["new-place"];

const placeNameInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements["link"];

let newCard = {
      name: '', 
      link: ''
    }; 

addButton.addEventListener("click", (event) => {
  openModal(popupTypeNewCard);
  allCloseModalEvents(popupTypeNewCard, popupTypeNewCard_closeButton, "Escape");

  newCardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newCard.name = placeNameInput.value; 
    newCard.link = linkInput.value; 

    console.log(newCard); 

    const cardElement = createCard(newCard); 

    console.log(cardElement); 
    placesList.prepend(cardElement); 

    closeModal(popupTypeNewCard);

    placeNameInput.value = ''; 
    linkInput.value = ''; 
  });
});

/* поп-ап картинки реализован на card.js:40 */