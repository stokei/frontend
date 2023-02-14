export const isAuthError = (errorMessage: string) => {
  return errorMessage === "invalidToken";
};
