export const makeURL = (text) => {
  return "url(" + text + ")";
};

export const removeURL = (text) => {
  return text.substring(5, text.length - 2);
};