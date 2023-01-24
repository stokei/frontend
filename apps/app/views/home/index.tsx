import { useCurrentApp } from "@/hooks";
import { getRoutes } from "@/routes";
import { Box, Button, Container, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();

  return (
    <Container padding="5">
      <Title marginBottom="5">App {currentApp?.name}</Title>
      <Box>
        <Button onClick={() => router.push(getRoutes().login)}>Login</Button>
      </Box>
    </Container>
  );
};
