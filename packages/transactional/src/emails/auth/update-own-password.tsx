import { Button } from "../../components/button";
import { Spacer } from "../../components/spacer";
import { Template } from "../../components/template";
import { Text } from "../../components/text";
import { Title } from "../../components/title";
import { defaultApp } from "../../constants/default-app";
import { BaseEmailProps } from "../../types/base-email-props";

interface UpdateOwnPasswordEmailProps extends BaseEmailProps {
  buttonUpdateOwnPasswordLink: string;
}

export const UpdateOwnPasswordEmail = ({
  app,
  buttonUpdateOwnPasswordLink,
}: UpdateOwnPasswordEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h3">Você solicitou a alteração de senha?</Title>
      <Spacer />
      <Text>
        Se sim, clique no botão abaixo para criar uma nova senha. Caso contrario
        entre em contato conosco.
      </Text>
      <Spacer />
      {buttonUpdateOwnPasswordLink && (
        <Button href={buttonUpdateOwnPasswordLink} color={app?.colors?.primary}>
          Criar nova senha
        </Button>
      )}
    </Template>
  );
};

const UpdateOwnPasswordEmailExample = () => (
  <UpdateOwnPasswordEmail
    app={defaultApp}
    buttonUpdateOwnPasswordLink="https://google.com"
  />
);

export default UpdateOwnPasswordEmailExample;
