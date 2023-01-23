import { Container, Title } from "@stokei/ui";
import { FC } from "react";

interface SignUpPageProps {}

export const SignUpPage: FC<SignUpPageProps> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">SignUp</Title>
    </Container>
  );
};
