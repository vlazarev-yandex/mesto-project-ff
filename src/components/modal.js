export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");

  window.removeEventListener("keyup", (event) => {
    if (event.key !== "Escape") return;
    closeModal(popup);
  });

  popup.removeEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      closeModal(popup);
    }
  });
}
export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  window.addEventListener("keyup", (event) => {
    if (event.key !== "Escape") return;
    closeModal(popup);
  });

  popup.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      closeModal(popup);
    }
  });
}