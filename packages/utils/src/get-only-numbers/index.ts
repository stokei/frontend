export const getOnlyNumbers = (value: string) =>
  value?.trim()?.replace(/\D/g, "");
