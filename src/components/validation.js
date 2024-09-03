const setValidityMessage = (input) => {
  const InputValidity = input.validity;

  if (InputValidity.patternMismatch) {
    input.setCustomValidity(input.dataset.patternMismatchErrorMessage);
  } else {
    input.setCustomValidity("");
  }
};

const showError = (form, input, errorMessage, errorClass) => {
  input.classList.add(errorClass);

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.remove("popup__input_transparent_text");
  //   inputError.addEventListener("transitionend", () => {
  inputError.textContent = errorMessage;
  //   });
};

const hideError = (form, input, errorClass) => {
  input.classList.remove(errorClass);

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.add("popup__input_transparent_text");
  //   inputError.addEventListener("transitionend", () => {
  inputError.textContent = "";
  //   });
};

const checkInputValidity = (form, input, validationConfig) => {
  setValidityMessage(input);

  if (!input.validity.valid) showError(form, input, input.validationMessage, validationConfig.errorClass);
  else hideError(form, input, validationConfig.errorClass);
};

function setEventListeners(form, validationConfig) {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true; 
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false; 
  }
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
};

export function clearValidation(popup, buttonElement, validationConfig) {
  const form = popup.querySelector(validationConfig.formSelector);
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((input) => {
    hideError(form, input, validationConfig.errorClass);
  });
  toggleButtonState(inputList, buttonElement, validationConfig); 
}
