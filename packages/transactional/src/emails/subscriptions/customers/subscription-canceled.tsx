import { Section, Row, Column, Img, Link } from "@react-email/components";
import { Spacer } from "../../../components/spacer";
import { Template } from "../../../components/template";
import { Title } from "../../../components/title";
import { defaultApp } from "../../../constants/default-app";
import { BaseEmailProps } from "../../../types/base-email-props";
import { Text } from "../../../components/text";
import { Button } from "../../../components/button";
import { noImageURL } from "../../../constants/no-image";
import { appRoutes } from "@stokei/routes";
import { appendAppBaseURLToPathname } from "../../../utils/append-app-baseurl-to-pathname";
import { getProductParentURLFromAppRoutes } from "../../../utils/get-product-parent-url";

interface SubscriptionItem {
  productId: string;
  productName: string;
  image?: string;
}

export interface SubscriptionCanceledEmailProps extends BaseEmailProps {
  subscriptionId: string;
  items: SubscriptionItem[];
}

export const SubscriptionCanceledEmail = ({
  subscriptionId,
  app,
  items,
}: SubscriptionCanceledEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h2" textAlign="center">
        Sua assinatura foi cancelada!
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
              <Link href={getProductParentURLFromAppRoutes(app, item.productId)}>
                <Text fontWeight="600">{item.productName}</Text>
              </Link>
            </Column>
          </Row>
        ))}
      </Section>
      <Spacer />
      {app?.url && (
        <Button
          href={appendAppBaseURLToPathname(app, appRoutes.customers.subscriptions.subscription({ subscription: subscriptionId }))}
          color={app?.colors?.primary}
        >
          Acessar assinatura
        </Button>
      )}
    </Template>
  );
};

const SubscriptionCanceledEmailExample = () => (
  <SubscriptionCanceledEmail
    subscriptionId="subscriptionId"
    app={defaultApp}
    items={[
      {
        productId: "material_1",
        productName: "Produto 1",
        image: "https://stokei.com/assets/logo.png",
      },
      {
        productId: "course_1",
        productName: "Produto 2",
        image: "https://stokei.com/assets/logo.png",
      },
    ]}
  />
);

export default SubscriptionCanceledEmailExample;
