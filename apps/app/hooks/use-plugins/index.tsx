import { PluginType } from "@/services/graphql/stokei";
import { convertPluginTypeToPaymentGatewayType } from "@/utils/convert-plugin-type-to-payment-gateway-type";
import { useCallback, useMemo } from "react";
import { useCurrentApp } from "../use-current-app";
import { GetPluginsPluginFragment, useGetPluginsQuery } from "./plugins.query.graphql.generated";
import { PaymentGatewaysPaymentGatewayFragment, useGetPaymentGatewaysQuery } from "./payment-gateways.query.graphql.generated";

export type DefaultPaymentGateway = GetPluginsPluginFragment & { paymentMethods: PaymentGatewaysPaymentGatewayFragment['paymentMethods'] };

export const usePlugins = () => {
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading, data: dataGetPlugins }] =
    useGetPluginsQuery({
      pause: !currentApp?.id,
      requestPolicy: 'network-only',
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
  const [{ fetching: isLoadingGetAllPaymentGateways, data: dataGetAllPaymentGateways }] =
    useGetPaymentGatewaysQuery({
      pause: !currentApp?.id,
      requestPolicy: 'network-only'
    });

  const allPaymentGateways = useMemo(() => dataGetAllPaymentGateways?.paymentGateways || [], [dataGetAllPaymentGateways?.paymentGateways]);

  const paymentGateways: DefaultPaymentGateway[] = useMemo(() => {
    const gateways = dataGetPlugins?.plugins?.items?.filter(plugin => !!convertPluginTypeToPaymentGatewayType(plugin.type))?.map(
      plugin => {
        const paymentGateway = allPaymentGateways.find(item => item.type === convertPluginTypeToPaymentGatewayType(plugin.type));
        return {
          ...plugin,
          paymentMethods: paymentGateway?.paymentMethods || []
        }
      }
    )
    return gateways || []
  }, [dataGetPlugins?.plugins?.items, allPaymentGateways])

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
    isLoading: isLoading || isLoadingGetAllPaymentGateways,
    data: dataGetPlugins,
    paymentGateways,
    defaultPaymentGateway,
    hasInternationalPayment,
    hasPlugins: !!dataGetPlugins?.plugins?.totalCount,
    getPluginByType
  };
};
