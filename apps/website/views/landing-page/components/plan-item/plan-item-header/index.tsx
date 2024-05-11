import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  Button,
  CardHeader,
  Stack,
  Text,
  Title
} from "@stokei/ui";
import { useRouter } from "next/router";

interface PlanItemHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly price?: number;
}

export const PlanItemHeader = ({ title, subtitle, price }: PlanItemHeaderProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const router = useRouter();
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
        <Button onClick={() => router.push(websiteRoutes.auth.signUp)} marginY="5">
          {translate.formatMessage({ id: 'freeSignUp' })}
        </Button>
      </Stack>
    </CardHeader>
  );
};
