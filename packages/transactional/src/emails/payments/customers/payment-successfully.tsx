import { appRoutes } from "@stokei/routes";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { Spacer } from "../../../components/spacer";
import { Template } from "../../../components/template";
import { Text } from "../../../components/text";
import { Title } from "../../../components/title";
import { defaultApp } from "../../../constants/default-app";
import { BaseEmailProps } from "../../../types/base-email-props";
import { appendAppBaseURLToPathname } from "../../../utils/append-app-baseurl-to-pathname";

export interface PaymentSuccessfullyEmailProps extends BaseEmailProps {
  orderId: string;
  totalAmount: string;
  subtotalAmount?: string;
}

export const PaymentSuccessfullyEmail = ({
  orderId,
  app,
  totalAmount,
  subtotalAmount,
}: PaymentSuccessfullyEmailProps) => {
  return (
    <Template app={app}>
      <Icon name="check" color="#38a169" />
      <Spacer />
      <Title level="h2" textAlign="center">
        Pagamento efetuado com sucesso!
      </Title>
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
        <Button href={appendAppBaseURLToPathname(app, appRoutes.customers.orders.order({ order: orderId }))} color={app?.colors?.primary}>
          Acessar pedido
        </Button>
      )}
    </Template>
  );
};

const PaymentSuccessfullyEmailExample = () => (
  <PaymentSuccessfullyEmail
    orderId="orderId"
    app={defaultApp}
    subtotalAmount="R$ 200,00"
    totalAmount="R$ 200,00"
  />
);

export default PaymentSuccessfullyEmailExample;
