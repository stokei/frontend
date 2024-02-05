export const getOnlyLettersAndNumbers = (value: string) =>
  value?.replace(/[^a-zA-Z0-9]+/g, "");
