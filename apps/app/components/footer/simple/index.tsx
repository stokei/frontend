import { DEFAULT_APP_NAME } from "@/constants/default-app-info";
import { STOKEI_WEBSITE_URL } from "@/constants/stokei-urls";
import { useTranslations } from "@/hooks";
import { Box, Footer, FooterProps, Link, Text } from "@stokei/ui";
import NextLink from "next/link";
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
            {
              year: "2023",
              company: (
                <Link
                  as={NextLink}
                  href={STOKEI_WEBSITE_URL}
                  marginLeft="2"
                  target="_blank"
                >
                  {DEFAULT_APP_NAME}
                </Link>
              ),
            }
          )}
        </Text>
      </Box>
    </Footer>
  );
};
