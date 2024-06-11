import { Section, Row, Column, Img } from "@react-email/components";
import { Spacer } from "../../components/spacer";
import { Template } from "../../components/template";
import { Title } from "../../components/title";
import { defaultApp } from "../../constants/default-app";
import { BaseEmailProps } from "../../types/base-email-props";
import { Text } from "../../components/text";
import { Button } from "../../components/button";
import { noImageURL } from "../../constants/no-image";

interface SubscriptionItem {
  productId: string;
  productName: string;
  image?: string;
}

interface SubscriptionActivatedEmailProps extends BaseEmailProps {
  items: SubscriptionItem[];
}

export const SubscriptionActivatedEmail = ({
  app,
  items,
}: SubscriptionActivatedEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h2" textAlign="center">
        Sua assinatura foi ativada!
      </Title>
      <Spacer />
      <Section>
        {items?.map((item) => (
          <Row
            key={item.productId}
            style={{
              marginBottom: "8px",
            }}
          >
            <Column
              style={{
                width: "64px",
                paddingRight: "12px",
              }}
            >
              <Img
                src={item?.image || noImageURL}
                alt="Produto"
                style={{
                  width: "100%",
                  margin: "0",
                }}
              />
            </Column>
            <Column>
              <Text fontWeight="600">{item.productName}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <Spacer />
      {app?.url && (
        <Button href={app?.url} color={app?.colors?.primary}>
          Visitar plataforma
        </Button>
      )}
    </Template>
  );
};

const SubscriptionActivatedEmailExample = () => (
  <SubscriptionActivatedEmail
    app={defaultApp}
    items={[
      {
        productId: "1",
        productName: "Produto 1",
        image: "https://stokei.com/assets/logo.png",
      },
      {
        productId: "2",
        productName: "Produto 2",
        image: "https://stokei.com/assets/logo.png",
      },
    ]}
  />
);

export default SubscriptionActivatedEmailExample;
