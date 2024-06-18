import { appRoutes } from "@stokei/routes";
import { Button } from "../../../components/button";
import { Spacer } from "../../../components/spacer";
import { Template } from "../../../components/template";
import { Text } from "../../../components/text";
import { Title } from "../../../components/title";
import { defaultApp } from "../../../constants/default-app";
import { BaseEmailProps } from "../../../types/base-email-props";
import { appendAppBaseURLToPathname } from "../../../utils/append-app-baseurl-to-pathname";

export interface UpdateOwnPasswordEmailProps extends BaseEmailProps {
  forgotPasswordCode: string;
}

export const UpdateOwnPasswordEmail = ({
  app,
  forgotPasswordCode,
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
      {forgotPasswordCode && (
        <Button href={appendAppBaseURLToPathname(app, `${appRoutes.auth.changePassword}?code=${forgotPasswordCode}`)} color={app?.colors?.primary}>
          Criar nova senha
        </Button>
      )}
    </Template>
  );
};

const UpdateOwnPasswordEmailExample = () => (
  <UpdateOwnPasswordEmail
    app={defaultApp}
    forgotPasswordCode="anyCode"
  />
);

export default UpdateOwnPasswordEmailExample;
