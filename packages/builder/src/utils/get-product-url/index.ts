export const getProductURL = ({
  product,
  price,
}: {
  product: string;
  price?: string;
}) => {
  return `/products/${product}${price ? "?price=" + price : ""}`;
};
