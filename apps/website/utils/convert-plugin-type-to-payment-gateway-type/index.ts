import { PaymentGatewayType, PluginType } from "@/services/graphql/stokei";
import { capitalize } from "@stokei/utils";

export const convertPluginTypeToPaymentGatewayType = (
  pluginType: PluginType
): PaymentGatewayType => {
  return PaymentGatewayType[
    capitalize(pluginType) as keyof typeof PaymentGatewayType
  ];
};
