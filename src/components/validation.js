const showError = (form, input) => {
  input.classList.add("popup__input_error");

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.remove("popup__input_transparent_text");
//   inputError.addEventListener("transitionend", () => {
    inputError.textContent = input.validationMessage;
//   }); 
};

const hideError = (form, input) => {
  input.classList.remove("popup__input_error");

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.add("popup__input_transparent_text");
//   inputError.addEventListener("transitionend", () => {
    inputError.textContent = "";
//   }); 
};

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) showError(form, input);
  else hideError(form, input);
};

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const buttonElement = form.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.classList.remove("popup__button_inactive");
  }
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(form);
  });
};

export function clearInputErrors(popup) {
  const form = popup.querySelector(".popup__form");
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    hideError(form, input);
  });
}
