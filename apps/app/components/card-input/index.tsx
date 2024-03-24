import { Box, BoxProps } from "@stokei/ui";
import { CardElement } from "@stripe/react-stripe-js";

export interface CardInputProps extends BoxProps {}

export const CardInput = ({ ...props }: CardInputProps) => {
  return (
    <Box
      display="block"
      width="full"
      rounded="md"
      outline="2px solid transparent"
      outlineOffset="2px"
      borderWidth="1px"
      paddingY="3"
      paddingX="4"
      _hover={{
        boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
        borderColor: "primary.500",
      }}
      {...props}
    >
      <CardElement
        options={{
          hidePostalCode: true,
        }}
      />
    </Box>
  );
};
