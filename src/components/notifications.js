const toggleVisibility = (object) => {
  if (object.classList.contains("hidden")) {
    object.classList.remove("hidden");
    setTimeout(function () {
      object.classList.remove("visually-hidden");
    }, 20);
  } else {
    object.classList.add("visually-hidden");
    object.addEventListener(
      "transitionend",
      function (event) {
        object.classList.add("hidden");
      },
      {
        capture: false,
        once: true,
        passive: false,
      }
    );
  }
};

export const notify = (message, status) => {
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
    text: "Иногда может и разонравиться то, что раньше любил",
  },
};
