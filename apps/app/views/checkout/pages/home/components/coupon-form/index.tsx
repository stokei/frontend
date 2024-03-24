import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
} from "@stokei/ui";
import { useEffect, useState } from "react";
import {
  CheckoutPageCouponFragment,
  useGetCheckoutPageCouponQuery,
} from "../../graphql/coupon.query.graphql.generated";

export interface CouponFormProps {
  coupon?: CheckoutPageCouponFragment;
  onSuccess?: (coupon?: CheckoutPageCouponFragment) => void;
}

export const CouponForm = ({ coupon, onSuccess }: CouponFormProps) => {
  const [couponCode, setCouponCode] = useState("");
  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();

  const [
    {
      fetching: isLoadingGetCheckoutPageCoupon,
      data: dataGetCoupon,
      error: errorGetCoupon,
    },
    onExecuteGetCheckoutPageCoupon,
  ] = useGetCheckoutPageCouponQuery({
    pause: true,
    requestPolicy: "network-only",
    variables: {
      code: couponCode,
    },
  });

  useEffect(() => {
    if (dataGetCoupon?.coupon) {
      onSuccess?.(dataGetCoupon?.coupon);
    }
  }, [dataGetCoupon?.coupon, onSuccess]);

  useEffect(() => {
    if (!!errorGetCoupon?.graphQLErrors?.length) {
      errorGetCoupon.graphQLErrors.map((error) =>
        onShowAPIError({ message: error?.message })
      );
      onSuccess?.(undefined);
    }
  }, [errorGetCoupon, onShowAPIError, onSuccess]);

  const onSubmit = async () => {
    try {
      await onExecuteGetCheckoutPageCoupon({
        requestPolicy: "network-only",
      });
    } catch (error) {
      onShowAPIError({ message: "somethingWentWrong" });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Stack direction="column" spacing="5">
        <InputGroup>
          <Input
            id="input-coupon-code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder={translate.formatMessage({ id: "code" })}
            borderRight="none"
            roundedRight="none"
            isReadOnly={isLoadingGetCheckoutPageCoupon}
          />

          <InputRightAddon
            width="auto"
            paddingX="2"
            background="transparent"
            borderLeft="none"
          >
            <Button
              size="xs"
              onClick={onSubmit}
              isDisabled={!couponCode}
              isLoading={isLoadingGetCheckoutPageCoupon}
              colorScheme="gray"
            >
              {translate.formatMessage({ id: "apply" })}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Stack>
    </Form>
  );
};
