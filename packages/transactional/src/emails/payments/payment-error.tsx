import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import { Spacer } from "../../components/spacer";
import { Template } from "../../components/template";
import { Text } from "../../components/text";
import { Title } from "../../components/title";
import { defaultApp } from "../../constants/default-app";
import { BaseEmailProps } from "../../types/base-email-props";

interface PaymentErrorEmailProps extends BaseEmailProps {
  totalAmount: string;
  subtotalAmount?: string;
}

export const PaymentErrorEmail = ({
  app,
  totalAmount,
  subtotalAmount,
}: PaymentErrorEmailProps) => {
  return (
    <Template app={app}>
      <Icon name="error" color="#e53e3e" />
      <Spacer />
      <Title level="h2" textAlign="center">
        Erro no pagamento!
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
        <Button href={app?.url} color={app?.colors?.primary}>
          Visitar plataforma
        </Button>
      )}
    </Template>
  );
};

const PaymentErrorEmailExample = () => (
  <PaymentErrorEmail
    app={defaultApp}
    subtotalAmount="R$ 200,00"
    totalAmount="R$ 200,00"
  />
);

export default PaymentErrorEmailExample;
