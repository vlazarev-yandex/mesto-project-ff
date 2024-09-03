export const changeTextSmoothly = (object, text) => {
  object.classList.add("text-visually-hidden");
  object.classList.remove("text-visible");
  setTimeout(function (event) {
    object.textContent = text;
    object.classList.remove("text-visually-hidden");
    object.classList.add("text-visible");
  }, 300); /* можно вынести в переменную */
};

export const toggleVisibility = (object, target) => {
  const hiddenClass = target + "-hidden"; 
  const visuallyhiddenClass = target + "-visually-hidden"; 

  if (object.classList.contains(hiddenClass)) {
    object.classList.remove(hiddenClass);
    setTimeout(function () {
      object.classList.remove(visuallyhiddenClass);
    }, 20);
  } else {
    object.classList.add(visuallyhiddenClass);
    object.addEventListener(
      "transitionend",
      function (event) {
        object.classList.add(hiddenClass);
      },
      {
        capture: false,
        once: true,
        passive: false,
      }
    );
  }
};