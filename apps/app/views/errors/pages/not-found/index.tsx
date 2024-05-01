import { useTranslations } from "@/hooks";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  NotFoundTitle,
} from "@stokei/ui";

import { ErrorLayout } from "../../layout";

export const NotFoundPage = () => {
  const translate = useTranslations();

  return (
    <ErrorLayout>
      <Container paddingY="10">
        <NotFound>
          <NotFoundIcon name="error" />
          <NotFoundTitle fontSize="2xl">Oops,</NotFoundTitle>
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "sorryWeCouldntFindWhatYouNeeded" })}
          </NotFoundSubtitle>
        </NotFound>
      </Container>
    </ErrorLayout>
  );
};
