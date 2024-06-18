import { Column, Img, Link, Row, Section } from "@react-email/components";
import { websiteRoutes } from "@stokei/routes";
import { Button } from "../../../components/button";
import { Spacer } from "../../../components/spacer";
import { Template } from "../../../components/template";
import { Text } from "../../../components/text";
import { Title } from "../../../components/title";
import { defaultAccount } from "../../../constants/default-account";
import { defaultApp } from "../../../constants/default-app";
import { noImageURL } from "../../../constants/no-image";
import { AccountModel } from "../../../types/account";
import { BaseEmailProps } from "../../../types/base-email-props";
import { appendAppBaseURLToPathname } from "../../../utils/append-app-baseurl-to-pathname";
import { getProductParentURLFromWebsiteRoutes } from "../../../utils/get-product-parent-url";

interface OrderItem {
  productId: string;
  productName: string;
  price: string;
  image?: string;
  fromPrice?: string;
}

export interface OrderCreatedEmailProps extends BaseEmailProps {
  orderId: string;
  items: OrderItem[];
  customer: AccountModel;
  totalAmount: string;
  subtotalAmount?: string;
}

export const OrderCreatedEmail = ({
  app,
  items,
  customer,
  orderId,
  totalAmount,
  subtotalAmount,
}: OrderCreatedEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h2" textAlign="center">
        Parabéns pela nova venda!
      </Title>
      <Spacer />
      <Text>
        O cliente <Link href={appendAppBaseURLToPathname(app, websiteRoutes.app({ appId: app?.id }).member({ member: customer.id }).home)}><b>{customer.fullname} ({customer.email})</b></Link> realizou a compra dos produtos abaixo.
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
              <Link href={getProductParentURLFromWebsiteRoutes(app, item.productId)}>
                <Text fontWeight="600">{item.productName}</Text>
              </Link>
              <Text>
                {item.fromPrice && (
                  <span
                    style={{
                      margin: "0",
                      marginRight: "4px",
                      fontSize: "14px",
                      textDecoration: "line-through",
                      color: "#666",
                    }}
                  >
                    {item.fromPrice}
                  </span>
                )}
                {item.price}
              </Text>
            </Column>
          </Row>
        ))}
      </Section>
      <Spacer />
      {subtotalAmount && (
        <Text textAlign="center">
          Subtotal:
          <span
            style={{
              margin: "0",
              marginLeft: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              textDecoration: "line-through",
              color: "#666",
            }}
          >
            {subtotalAmount}
          </span>
        </Text>
      )}
      <Text textAlign="center" margin="4px 0 12px">
        Total:
        <span
          style={{
            margin: "0",
            marginLeft: "4px",
            fontSize: "24px",
            fontWeight: "bold",
            color: app?.colors?.primary,
          }}
        >
          {totalAmount}
        </span>
      </Text>
      <Spacer />
      {app?.url && (
        <Button href={appendAppBaseURLToPathname(app, websiteRoutes.app({ appId: app.id }).orders.order({ order: orderId }))} color={app?.colors?.primary}>
          Acessar pedido
        </Button>
      )}
    </Template>
  );
};

const OrderCreatedEmailExample = () => (
  <OrderCreatedEmail
    app={defaultApp}
    orderId="orderId"
    customer={defaultAccount}
    subtotalAmount="R$ 200,00"
    totalAmount="R$ 200,00"
    items={[
      {
        productId: "material_1",
        productName: "Produto 1",
        fromPrice: "R$ 199,00",
        price: "R$ 100,00",
        image: "https://stokei.com/assets/logo.png",
      },
      {
        productId: "course_1",
        productName: "Produto 2",
        fromPrice: "R$ 136,00",
        price: "R$ 100,00",
        image: "https://stokei.com/assets/logo.png",
      },
    ]}
  />
);

export default OrderCreatedEmailExample;
