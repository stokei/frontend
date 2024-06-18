import { appRoutes } from '@stokei/routes';
import { Button } from "../../../components/button";
import { Spacer } from "../../../components/spacer";
import { Template } from "../../../components/template";
import { Text } from "../../../components/text";
import { Title } from "../../../components/title";
import { defaultApp } from "../../../constants/default-app";
import { BaseEmailProps } from "../../../types/base-email-props";
import { appendAppBaseURLToPathname } from '../../../utils/append-app-baseurl-to-pathname';

export interface ForgotPasswordEmailProps extends BaseEmailProps {
  forgotPasswordCode: string;
}

export const ForgotPasswordEmail = ({
  app,
  forgotPasswordCode,
}: ForgotPasswordEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h3">Esqueceu sua senha?</Title>
      <Spacer />
      <Text>Clique no botão abaixo para criar uma nova senha.</Text>
      <Spacer />
      {forgotPasswordCode && (
        <Button href={appendAppBaseURLToPathname(app, `${appRoutes.auth.changePassword}?code=${forgotPasswordCode}`)} color={app?.colors?.primary}>
          Criar nova senha
        </Button>
      )}
    </Template>
  );
};

const ForgotPasswordEmailExample = () => (
  <ForgotPasswordEmail
    app={defaultApp}
    forgotPasswordCode="anyCode"
  />
);

export default ForgotPasswordEmailExample;
