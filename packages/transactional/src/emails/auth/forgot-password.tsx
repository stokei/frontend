import { Button } from "../../components/button";
import { Spacer } from "../../components/spacer";
import { Template } from "../../components/template";
import { Text } from "../../components/text";
import { Title } from "../../components/title";
import { defaultApp } from "../../constants/default-app";
import { BaseEmailProps } from "../../types/base-email-props";

interface ForgotPasswordEmailProps extends BaseEmailProps {
  buttonForgotPasswordLink: string;
}

export const ForgotPasswordEmail = ({
  app,
  buttonForgotPasswordLink,
}: ForgotPasswordEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h3">Esqueceu sua senha?</Title>
      <Spacer />
      <Text>Clique no botão abaixo para criar uma nova senha.</Text>
      <Spacer />
      {buttonForgotPasswordLink && (
        <Button href={buttonForgotPasswordLink} color={app?.colors?.primary}>
          Criar nova senha
        </Button>
      )}
    </Template>
  );
};

const ForgotPasswordEmailExample = () => (
  <ForgotPasswordEmail
    app={defaultApp}
    buttonForgotPasswordLink="https://google.com"
  />
);

export default ForgotPasswordEmailExample;
