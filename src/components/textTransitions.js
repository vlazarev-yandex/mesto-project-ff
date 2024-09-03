export const changeTextSmoothly = (object, text) => {
  object.classList.add("text-visually-hidden");
  object.classList.remove("text-visible");
  setTimeout(function (event) {
    object.textContent = text;
    object.classList.remove("text-visually-hidden");
    object.classList.add("text-visible");
  }, 300);
};
