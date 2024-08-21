function overlayCloseModal(event) {
  if (event.currentTarget === event.target) {
    closeModal(event);
  }
}

function escCloseModal(event) {
  if (event.key !== "Escape") return;
  closeModal(event);
}

export function closeModal(event) {

  const openedPopup = document.querySelector(".popup_is-opened"); 
  openedPopup.classList.remove("popup_is-opened");

  window.removeEventListener("keyup", escCloseModal); 
  openedPopup.removeEventListener("click", overlayCloseModal); 
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  window.addEventListener("keyup", escCloseModal); 
  popup.addEventListener("click", overlayCloseModal); 
}