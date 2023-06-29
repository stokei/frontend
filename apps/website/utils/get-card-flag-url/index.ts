export const getCardFlagURL = (cardBrand?: string | null) => {
  if (!cardBrand) {
    return `/assets/card-flags/generic.svg`;
  }
  return `/assets/card-flags/${cardBrand?.toLowerCase()}.svg`;
};
