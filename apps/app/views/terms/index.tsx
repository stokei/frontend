import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface TermsPageProps {}

export const TermsPage: FC<TermsPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">Terms</Title>
    </Container>
  );
};
