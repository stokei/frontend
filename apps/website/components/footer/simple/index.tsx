import { DEFAULT_APP_NAME } from "@/constants/default-app-info";
import { useTranslations } from "@/hooks";
import { Box, Footer, FooterProps, Text } from "@stokei/ui";

export interface SimpleFooterProps extends FooterProps {}
export const SimpleFooter = ({ ...props }: SimpleFooterProps) => {
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
