import { Box, BoxProps } from "@stokei/ui";
import { CardElement } from "@stripe/react-stripe-js";
import { FC } from "react";

export interface CardInputProps extends BoxProps {}

export const CardInput: FC<CardInputProps> = ({ ...props }) => {
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
