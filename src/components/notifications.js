const toggleVisibility = (object) => {
  if (object.classList.contains("notification-hidden")) {
    object.classList.remove("notification-hidden");
    setTimeout(function () {
      object.classList.remove("notification-visually-hidden");
    }, 20);
  } else {
    object.classList.add("notification-visually-hidden");
    object.addEventListener(
      "transitionend",
      function (event) {
        object.classList.add("notification-hidden");
      },
      {
        capture: false,
        once: true,
        passive: false,
      }
    );
  }
};

export const notify = (message) => {
  const notification = document.querySelector(".server-notification");
  const notificationTitle = notification.querySelector(".notification-title");
  const notificationMessage = notification.querySelector(
    ".notification-message"
  );

  notificationTitle.textContent = message.title;
  notificationMessage.textContent = message.text;

  toggleVisibility(notification);

  setTimeout(() => {
    toggleVisibility(notification);
  }, 2000);
};

export const notifications = {
  likeMessage: {
    title: "Поймали ваш лайк!",
    text: "Он уже улетел на сервер",
  },
  dislikeMessage: {
    title: "Сняли ваш лайк!",
    text: "Иногда то, что раньше любил, может и разонравиться",
  },
  newCardMessage: {
    title: "Добавили новую карточку!",
    text: "Ну уж эта точно соберёт много лайков",
  },
  deleteCardMessage: {
    title: "Карточка удалена!",
    text: "Что делать с вашими карточками, решать только вам",
  },
  profileInfoUpdated: {
    title: "Инорфмация обновлена!",
    text: "Её уже видят другие участники проекта",
  },
  profileInfoUpdatedErr: {
    title: "Что-то пошло не так!",
    text: "Информацию обновить не удалось",
  },
  profileAvatarUpdated: {
    title: "Аватарка обновлена!",
    text: "Её уже видят другие участники проекта",
  },
  profileAvatarUpdatedErr: {
    title: "Что-то пошло не так!",
    text: "Аватарку обновить не удалось",
  },
};
