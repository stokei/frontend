import { Link } from "@react-email/components";
import { websiteRoutes } from "@stokei/routes";
import { Button } from "../../../components/button";
import { Spacer } from "../../../components/spacer";
import { Template } from "../../../components/template";
import { Text } from "../../../components/text";
import { Title } from "../../../components/title";
import { defaultApp } from "../../../constants/default-app";
import { BaseEmailProps } from "../../../types/base-email-props";
import { appendAppBaseURLToPathname } from "../../../utils/append-app-baseurl-to-pathname";
import { AccountModel } from "../../../types/account";
import { defaultAccount } from "../../../constants/default-account";

export interface NewMemberEmailProps extends BaseEmailProps {
  member: AccountModel;
}

export const NewMemberEmail = ({
  app,
  member,
}: NewMemberEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h2" textAlign="center">
        Parabéns, você tem um novo membro!
      </Title>
      <Spacer />
      <Text>
        O membro <Link href={appendAppBaseURLToPathname(app, websiteRoutes.app({ appId: app?.id }).member({ member: member.id }).home)}><b>{member.fullname} ({member.email})</b></Link> acaba de se cadastrar.
      </Text>
      <Spacer />
      {app?.url && (
        <Button href={appendAppBaseURLToPathname(app, websiteRoutes.app({ appId: app?.id }).member({ member: member.id }).home)} color={app?.colors?.primary}>
          Visualizar novo membro
        </Button>
      )}
    </Template>
  );
};

const NewMemberEmailExample = () => (
  <NewMemberEmail
    app={defaultApp}
    member={defaultAccount}
  />
);

export default NewMemberEmailExample;
