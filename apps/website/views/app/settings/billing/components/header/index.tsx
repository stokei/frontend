import { useTranslations } from "@/hooks";
import {
  Card,
  CardBody,
  DatePickerGroup,
  Description,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { useMemo } from "react";

export const Header = () => {
  const translate = useTranslations();

  const firstDayMonth = useMemo(() => {
    const date = new Date(Date.now());
    date.setDate(1);
    return date;
  }, []);

  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          <Stack width="full" direction="column" spacing="1">
            <Title fontSize="2xl">
              {translate.formatMessage({ id: "costsRelatedToTheUse" })}
            </Title>
            <Description>
              {translate.formatMessage({
                id: "costsRelatedToTheUseDescription",
              })}
            </Description>
            <DatePickerGroup>
              <Text>{translate.formatDate(firstDayMonth)}</Text>
              <Text>{translate.formatDate(Date.now())}</Text>
            </DatePickerGroup>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
