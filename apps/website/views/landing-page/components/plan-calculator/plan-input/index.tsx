import { useTranslations } from "@/hooks";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { convertEnumValueToCamelCase } from "@/utils";
import { Price } from "@stokei/builder";
import { Input, InputGroup, InputLeftAddon, Loading, Stack, Title } from "@stokei/ui";
import { getOnlyNumbers } from "@stokei/utils";

interface PlanInputProps {
  id: string;
  value?: number;
  onChangeValue: (value: number) => void;
  plan?: GeneralProductFragment;
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
      <Title fontSize="large">
        {plan?.name}
      </Title>
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
      {plan?.defaultPrice && (
        <Price
          width="fit-content"
          price={plan?.defaultPrice}
          withUnitDescription
        />
      )}
    </Stack>
  );
};
