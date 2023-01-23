import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface MeHomePageProps {}

export const MeHomePage: FC<MeHomePageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">MeHome</Title>
    </Container>
  );
};
