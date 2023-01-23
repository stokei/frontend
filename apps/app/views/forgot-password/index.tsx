import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface ForgotPasswordPageProps {}

export const ForgotPasswordPage: FC<ForgotPasswordPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">ForgotPassword</Title>
    </Container>
  );
};
