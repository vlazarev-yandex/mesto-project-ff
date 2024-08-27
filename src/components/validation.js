import { classListObject } from "..";

const setValidityMessage = (input) => {
  const InputValidity = input.validity; 
  
  if (InputValidity.patternMismatch) {
    input.setCustomValidity(input.dataset.patternMismatchErrorMessage);
    console.log(InputValidity); 
  } else {
    input.setCustomValidity("");
  }
}

const showError = (form, input, errorMessage) => {
  input.classList.add(classListObject.errorClass);

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.remove("popup__input_transparent_text");
//   inputError.addEventListener("transitionend", () => {
    inputError.textContent = errorMessage;
//   }); 
};

const hideError = (form, input) => {
  input.classList.remove(classListObject.errorClass);

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.add("popup__input_transparent_text");
//   inputError.addEventListener("transitionend", () => {
    inputError.textContent = "";
//   }); 
};

const checkInputValidity = (form, input) => {
  
  setValidityMessage(input); 

  if (!input.validity.valid) showError(form, input, input.validationMessage);
  else hideError(form, input);
};

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll(classListObject.inputSelector));
  const buttonElement = form.querySelector(classListObject.submitButtonSelector);
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
    buttonElement.classList.add(classListObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(classListObject.inactiveButtonClass);
  }
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(classListObject.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(form);
  });
};

clearValidation

export function clearValidation(popup, validationConfig) {
  // validationConfig у меня нигде не используется, не понял, зачем нужен этот аргумент.
  const form = popup.querySelector(classListObject.formSelector);
  const inputList = Array.from(form.querySelectorAll(classListObject.inputSelector));
  inputList.forEach((input) => {
    hideError(form, input);
  });
}
