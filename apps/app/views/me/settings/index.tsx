import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface MeSettingsPageProps {}

export const MeSettingsPage: FC<MeSettingsPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">MeSettings</Title>
    </Container>
  );
};
