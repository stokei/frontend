export const convertEnumValueToCamelCase = (enumValue: string): any => {
  if (!enumValue) {
    return;
  }
  const enumValueLowerCase = enumValue.toLowerCase();
  const camelCaseValue = enumValueLowerCase
    ?.split("_")
    ?.map((value, index) => {
      const isFirstWord = index === 0;
      if (isFirstWord) {
        return value;
      }
      return value[0]?.toUpperCase() + value?.slice(1);
    })
    ?.join("");
  return camelCaseValue;
};
