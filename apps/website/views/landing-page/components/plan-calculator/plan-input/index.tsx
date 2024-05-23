import { useTranslations } from "@/hooks";
import { convertEnumValueToCamelCase } from "@/utils";
import { FormControl, Input, InputGroup, InputLeftAddon, Label, Loading, Stack, Title } from "@stokei/ui";
import { getOnlyNumbers } from "@stokei/utils";
import { LandingPageProductFragment } from "../../../graphql/products.query.graphql.generated";
import { Price } from "@/components";

interface PlanInputProps {
  id: string;
  value?: number;
  onChangeValue: (value: number) => void;
  plan?: LandingPageProductFragment;
  isLoading?: boolean;
}
export const PlanInput = ({
  id,
  plan,
  isLoading,
  value,
  onChangeValue
}: PlanInputProps) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="2">
      <Stack direction="row" spacing="2" justify="space-between" align="center">
        <Title fontSize="large">
          {plan?.name}
        </Title>
        {plan?.defaultPrice && (
          <Price
            width="fit-content"
            price={plan?.defaultPrice}
            size="md"
            withUnitDescription
          />
        )}
      </Stack>
      <InputGroup>
        <InputLeftAddon textTransform="capitalize">
          {plan?.defaultPrice?.unit ?
            translate.formatMessage({ id: convertEnumValueToCamelCase(plan?.defaultPrice?.unit) }) :
            <Loading />}
        </InputLeftAddon>
        <Input
          id={id + "-input"}
          value={value}
          isLoading={isLoading}
          placeholder="0"
          onChange={e => {
            const convertedValue = getOnlyNumbers(e.target.value)
            e.target.value = convertedValue;
            onChangeValue(convertedValue ? parseInt(convertedValue) : 0)
          }}
          roundedLeft={0}
        />
      </InputGroup>
    </Stack>
  );
};
