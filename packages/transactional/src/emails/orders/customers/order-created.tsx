import { Column, Img, Row, Section } from "@react-email/components";
import { Button } from "../../../components/button";
import { Spacer } from "../../../components/spacer";
import { Template } from "../../../components/template";
import { Text } from "../../../components/text";
import { Title } from "../../../components/title";
import { defaultApp } from "../../../constants/default-app";
import { noImageURL } from "../../../constants/no-image";
import { BaseEmailProps } from "../../../types/base-email-props";

interface OrderItem {
  productId: string;
  productName: string;
  price: string;
  image?: string;
  fromPrice?: string;
}

interface OrderCreatedEmailProps extends BaseEmailProps {
  items: OrderItem[];
  totalAmount: string;
  subtotalAmount?: string;
}

export const OrderCreatedEmail = ({
  app,
  items,
  totalAmount,
  subtotalAmount,
}: OrderCreatedEmailProps) => {
  return (
    <Template app={app}>
      <Title level="h2" textAlign="center">
        Parabéns por escolher comprar conosco!
      </Title>
      <Spacer />
      <Text>
        Agradecemos pela sua confiança em nossos produtos. Agora basta aguardar
        a confirmação de pagamento para liberação dos seus produtos.
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
              <Text fontWeight="600">{item.productName}</Text>
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
        <Button href={app?.url} color={app?.colors?.primary}>
          Visitar plataforma
        </Button>
      )}
    </Template>
  );
};

const OrderCreatedEmailExample = () => (
  <OrderCreatedEmail
    app={defaultApp}
    subtotalAmount="R$ 200,00"
    totalAmount="R$ 200,00"
    items={[
      {
        productId: "1",
        productName: "Produto 1",
        fromPrice: "R$ 199,00",
        price: "R$ 100,00",
        image: "https://stokei.com/assets/logo.png",
      },
      {
        productId: "2",
        productName: "Produto 2",
        fromPrice: "R$ 136,00",
        price: "R$ 100,00",
        image: "https://stokei.com/assets/logo.png",
      },
    ]}
  />
);

export default OrderCreatedEmailExample;
