import { useCurrentApp } from "@/hooks";
import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { currentApp } = useCurrentApp();

  return (
    <Container padding="5">
      <Title marginBottom="5">App {currentApp?.name}</Title>
    </Container>
  );
};
