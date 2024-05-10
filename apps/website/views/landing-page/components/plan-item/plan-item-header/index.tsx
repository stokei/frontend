import { useCurrentApp, useTranslations } from "@/hooks";
import {
  CardHeader,
  Stack,
  Text,
  Title
} from "@stokei/ui";

interface PlanItemHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly price?: number;
}

export const PlanItemHeader = ({ title, subtitle, price }: PlanItemHeaderProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  return (
    <CardHeader>
      <Stack direction="column" spacing="2" justify="center" align="center">
        <Title size="xl">{title}</Title>
        {subtitle && (
          <Text size="md">{subtitle}</Text>
        )}
        <Stack
          width="fit-content"
          direction="row"
          align="center"
          justify="center"
        >
          <Text fontSize="md" fontWeight="600">
            {currentApp?.currency?.symbol}
          </Text>
          <Text
            fontSize="2xl"
            color="primary.500"
            fontWeight="900"
            lineHeight="shorter"
          >
            {translate.formatMoney({
              showSymbol: false,
              amount: price || 0,
              currency: currentApp?.currency?.id || "",
              minorUnit: currentApp?.currency?.minorUnit,
            })}
          </Text>
        </Stack>
      </Stack>
    </CardHeader>
  );
};
