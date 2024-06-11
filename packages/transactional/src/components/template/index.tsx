import { PropsWithChildren } from "react";

import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Section,
} from "@react-email/components";
import { BaseEmailProps } from "../../types/base-email-props";
import { Divider } from "../divider";
import { Spacer } from "../spacer";
import { Text } from "../text";
import { bodyStyle, containerStyle, logoStyle } from "./styles";
import { noImageURL } from "../../constants/no-image";

interface TemplateProps extends BaseEmailProps { }

export const Template = ({
  app,
  children,
}: PropsWithChildren<TemplateProps>) => {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section>
            <Img
              src={app?.logoURL || noImageURL}
              alt="eu"
              style={logoStyle}
            />
          </Section>
          <Spacer />
          {children}
          <Spacer />
          <Divider />
          <Spacer />
          <Section>
            <Text color="gray">{app?.name}</Text>
            <Text color="gray">{app?.email}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
