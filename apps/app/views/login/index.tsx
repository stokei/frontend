import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">Login</Title>
    </Container>
  );
};
