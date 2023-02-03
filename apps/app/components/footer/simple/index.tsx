import { DEFAULT_APP_NAME } from "@/constants/default-app-info";
import { useTranslations } from "@/hooks";
import { Box, Footer, FooterProps, Text } from "@stokei/ui";
import { FC } from "react";

export interface SimpleFooterProps extends FooterProps {}
export const SimpleFooter: FC<SimpleFooterProps> = ({ ...props }) => {
  const translate = useTranslations();

  return (
    <Footer justify="center" paddingY="4" {...props}>
      <Box>
        <Text>
          {translate.formatMessage(
            { id: "allRightsReserved" },
            { year: "2023", company: DEFAULT_APP_NAME }
          )}
        </Text>
      </Box>
    </Footer>
  );
};
