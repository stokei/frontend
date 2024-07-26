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

export interface SubscriptionExpiredEmailProps extends BaseEmailProps {
  subscriptionId: string;
  items: SubscriptionItem[];
}

export const SubscriptionExpiredEmail = ({
  app,
  items,
}: SubscriptionExpiredEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h2" textAlign="center">
        Sua assinatura expirou!
      </Title>
      <Text>
        Infelizmente o tempo da sua assinatura expirou. Caso desejar, você pode renovar sua assinatura clicando no botão abaixo.
      </Text>
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
          href={appendAppBaseURLToPathname(app, appRoutes.store.home)}
          color={app?.colors?.primary}
        >
          Quero renovar
        </Button>
      )}
    </Template>
  );
};

const SubscriptionExpiredEmailExample = () => (
  <SubscriptionExpiredEmail
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

export default SubscriptionExpiredEmailExample;
