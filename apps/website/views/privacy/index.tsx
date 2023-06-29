import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface PrivacyPageProps {}

export const PrivacyPage: FC<PrivacyPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">Privacy</Title>
    </Container>
  );
};
