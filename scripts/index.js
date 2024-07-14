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
function createCard(picture, cityName) {
  cardElement = getCardTemplate();

  //кладём контент в шаблон
  cardElement.querySelector(".card__image").src = picture;
  cardElement.querySelector(".card__title").textContent = cityName;

  placesList.append(cardElement);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function (event) {
    oldPositions = savePositions(placesList);
    deleteCard(event);
    newPositions = getNewPositions(cardElement, placesList);
    deleteCardAnimation(placesList, oldPositions, newPositions, cardElement);
  });
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const cardToDelete = event.target.closest(".places__item");
  cardToDelete.remove();
}

// @todo: Вывести карточки на страницу
function createPlacesList(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    picture = initialCards[i].link;
    cityName = initialCards[i].name;
    createCard(picture, cityName);
  }
}

createPlacesList(initialCards);
