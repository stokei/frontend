export const isBoolean = (value: any): boolean => {
  const booleanValues = ["true", "false", "1", "0"];
  return booleanValues.includes(value + "");
};
