import { useTranslations } from "@/hooks";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  NotFoundTitle,
} from "@stokei/ui";
import { FC } from "react";
import { ErrorLayout } from "../../layout";

interface AnErrorOcurredPageProps {}

export const AnErrorOcurredPage: FC<AnErrorOcurredPageProps> = () => {
  const translate = useTranslations();

  return (
    <ErrorLayout>
      <Container paddingY="10">
        <NotFound>
          <NotFoundIcon name="error" />
          <NotFoundTitle fontSize="2xl">Oops,</NotFoundTitle>
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "sorryAnErrorOccurred" })}
          </NotFoundSubtitle>
        </NotFound>
      </Container>
    </ErrorLayout>
  );
};
