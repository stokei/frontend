export const getCheckoutURL = ({
  domain,
  product,
}: {
  product: string;
  domain: string;
}) => {
  return `${domain}/checkout/${product}`;
};
