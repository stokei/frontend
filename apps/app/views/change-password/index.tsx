import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface ChangePasswordPageProps {}

export const ChangePasswordPage: FC<ChangePasswordPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">ChangePassword</Title>
    </Container>
  );
};
