// обнуление по ESC, было удобно для тестирования
window.addEventListener("keyup", function (event) {
  if (event.key !== "Escape") return;
  placesList.replaceChildren();
});

// @todo: Темплейт карточки
function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

// @todo: DOM узлы
// глобальные элементы
const content = document.querySelector(".content");
const addButton = content.querySelector(".profile__add-button");
const editButton = content.querySelector(".profile__edit-button");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(initialCard) {
  cardElement = getCardTemplate();


  //кладём контент в шаблон
  const cardImage = cardElement.querySelector(".card__image"); 
  const cardTitle = cardElement.querySelector(".card__title"); 
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function (event) {
    const cardToDelete = event.target.closest(".places__item");
    deleteCard(cardToDelete);
  });

  return cardElement; 
}

// @todo: Функция удаления карточки
function deleteCard(cardToDelete) {
  cardToDelete.remove();
}

// @todo: Вывести карточки на страницу
function createPlacesList(initialCards) {
  initialCards.forEach(function (item) {  

    cardElement = createCard(item);
    placesList.append(cardElement);
  });
}

createPlacesList(initialCards);
