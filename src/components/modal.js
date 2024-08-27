import { clearValidation } from "./validation";
function overlayCloseModal(event) {
  if (event.currentTarget === event.target) {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

function escCloseModal(event) {
  if (event.key !== "Escape") return;
  const popup = document.querySelector(".popup_is-opened");
  closeModal(popup);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  
  window.removeEventListener("keyup", escCloseModal);
  popup.removeEventListener("click", overlayCloseModal);
  
  if (popup.querySelector(".popup__form") != null) {
    clearValidation(popup); 
  }
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  window.addEventListener("keyup", escCloseModal);
  popup.addEventListener("click", overlayCloseModal);
}
