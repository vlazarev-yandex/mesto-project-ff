export function openModal(popup) {
    popup.classList.add("popup_is-opened"); 
}

export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
}

export function allCloseModalEvents(popup, close_button, key) {
    
    window.addEventListener("keyup", (event) => {
        if (event.key !== key) return;
        closeModal(popup);
      });
    
    close_button.addEventListener("click", (event) => {
      closeModal(popup);
    });
    
    popup.addEventListener("click", (event) => {
      if (event.currentTarget === event.target) {
        closeModal(popup);
      }
    });
}