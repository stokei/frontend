export const onlyHexadecimal = (value: string): string => {
  try {
    value = value?.trim();
    if (value) {
      value = value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
      return value.replace(/[^0-9A-Fa-f]/g, "")?.toLowerCase();
    }
  } catch (error) {}
  return "";
};
