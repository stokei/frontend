export const getParamFromContext = (
  paramName: string,
  context: any
): string => {
  return (
    context?.query?.[paramName]?.toString() ||
    context?.params?.[paramName]?.toString()
  );
};
