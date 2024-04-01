import { Box, Text } from "@stokei/ui";
import { useTranslations } from "../../hooks";

export const DropComponentHere = () => {
  const translate = useTranslations();

  return (
    <Box
      width="full"
      align="center"
      justify="center"
      padding="5"
      borderWidth="thin"
      borderStyle="dashed"
    >
      <Text fontSize="sm" color="text.300">
        {translate.formatMessage({ id: "addYourComponentHere" })}
      </Text>
    </Box>
  );
};
