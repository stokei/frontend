import { useCallback, useMemo } from "react";
import { useGetPluginsQuery } from "./plugins.query.graphql.generated";
import { PaymentGatewayType, PluginType } from "@/services/graphql/stokei";
import { useCurrentApp } from "../use-current-app";
import { convertEnumValueToCamelCase } from "@/utils";
import { capitalize } from "@/utils/capitalize";
import { convertPluginTypeToPaymentGatewayType } from "@/utils/convert-plugin-type-to-payment-gateway-type";

export const usePlugins = () => {
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading, data: dataGetPlugins }] =
    useGetPluginsQuery({
      pause: !currentApp?.id,
      variables: {
        where: {
          AND: {
            parent: {
              equals: currentApp?.id
            }
          }
        }
      },
    });

  const paymentGateways = useMemo(() => dataGetPlugins?.plugins?.items?.filter(plugin => !!convertPluginTypeToPaymentGatewayType(plugin.type)), [dataGetPlugins?.plugins?.items])

  const getPluginByType = useCallback((type: PluginType) => {
    return dataGetPlugins?.plugins?.items?.find(plugin => plugin.type === type);
  }, [dataGetPlugins?.plugins?.items]);

  const defaultPaymentGateway = useMemo(() => {
    if (!paymentGateways?.length) {
      return;
    }
    const paymentGatewaysWithoutInternationalPayments = paymentGateways?.filter(paymentGateway => paymentGateway.type !== PluginType.Stripe);
    if (!paymentGatewaysWithoutInternationalPayments?.length) {
      return paymentGateways[0];
    }
    return paymentGatewaysWithoutInternationalPayments[0];
  }, [paymentGateways]);

  const hasInternationalPayment = useMemo(() => !!getPluginByType(PluginType.Stripe), [getPluginByType]);

  return {
    isLoading,
    data: dataGetPlugins,
    paymentGateways,
    defaultPaymentGateway,
    hasInternationalPayment,
    hasPlugins: !!dataGetPlugins?.plugins?.totalCount,
    getPluginByType
  };
};
