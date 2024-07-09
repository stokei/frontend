export const isValidURL = (url: string): boolean => {
  const urlRegex =
    /^(https?:\/\/)?((([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,})|localhost)(:[0-9]{1,5})?(\/[a-zA-Z0-9#]+\/?)*$/;
  return urlRegex.test(url);
};
