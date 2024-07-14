function savePositions(existingPlaces) {
  const Positions = new Map();

  for (let i = 0; i < existingPlaces.length; i++) {
    Positions.set(i, i.getBoundingClientRect());
  }

  return Positions;
}

function getNewPositions(cardElement, existingPlaces) {
  const newElements = [cardElement, ...existingPlaces];
  const newPositions = new Map();

  for (let i = 0; i < newElements.length; i++) {
    newPositions.set(i, i.getBoundingClientRect());
  }

  return newPositions;
}

function deleteCardAnimation(
  existingPlaces,
  oldPositions,
  newPositions,
  cardElement
) {
  for (let i = 0; i < existingPlaces.length; i++) {
    const oldPosition = oldPositions.get(i);
    const newPosition = newPositions.get(i);
    i.style.transform = `translate(${oldPosition.x - newPosition.x}px, ${
      oldPosition.y - newPosition.y
    }px)`;
    // i.style.transition = `transform 0.25s`;
  }

  requestAnimationFrame(function () {
    for (let i = 0; i < existingPlaces.length; i++) {
      i.style.transition = `transform 0.25s`;
      i.style.transform = ``;
      i.addEventListener(
        "transitionend",
        function () {
          i.style.transition = ``;
        },
        { once: true }
      );
    }
    cardElement.style.opacity = ``;
    cardElement.style.transition = `opacity 0.2s, transform 0.2s`;
    cardElement.style.transform = ``;
    cardElement.style.transitionDelay = `0.1s`;
    cardElement.addEventListener(
      "transitionend",
      function () {
        cardElement.style.transition = ``;
      },
      { once: true }
    );
  });

  return cardElement;
}
