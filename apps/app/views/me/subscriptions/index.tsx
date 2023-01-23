import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface MeSubscriptionsPageProps {}

export const MeSubscriptionsPage: FC<MeSubscriptionsPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">MeSubscriptions</Title>
    </Container>
  );
};
