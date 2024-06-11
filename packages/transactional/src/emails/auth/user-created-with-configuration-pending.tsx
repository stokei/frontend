import { Button } from "../../components/button";
import { Spacer } from "../../components/spacer";
import { Template } from "../../components/template";
import { Text } from "../../components/text";
import { Title } from "../../components/title";
import { defaultApp } from "../../constants/default-app";
import { BaseEmailProps } from "../../types/base-email-props";
interface User {
  email: string;
  password: string;
}
interface UserCreatedWithConfigurationPendingEmailProps extends BaseEmailProps {
  user: User;
}

export const UserCreatedWithConfigurationPendingEmail = ({
  app,
  user,
}: UserCreatedWithConfigurationPendingEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h3">Olá, como é bom ter você aqui.</Title>
      <Spacer />
      <Text>
        Foi criado o seu acesso na plataforma <b>{app?.name}</b> com uma senha
        temporária.
      </Text>
      <Text>
        Basta entrar na plataforma e será solicitado a criação de uma nova
        senha.
      </Text>
      <Spacer />
      <Text>
        <b>Email:</b> {user?.email}
      </Text>
      <Text>
        <b>Senha:</b> {user?.password}
      </Text>
      <Spacer />
      {app?.url && (
        <Button href={app?.url} color={app?.colors?.primary}>
          Visitar plataforma
        </Button>
      )}
    </Template>
  );
};

const UserCreatedWithConfigurationPendingEmailExample = () => (
  <UserCreatedWithConfigurationPendingEmail
    app={defaultApp}
    user={{
      email: "teste@teste.com",
      password: "123456",
    }}
  />
);

export default UserCreatedWithConfigurationPendingEmailExample;
