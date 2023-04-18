import { Text, Title } from "@stokei/ui";
import { FC } from "react";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionInformation } from "../section-information";
import { useTranslations } from "@/hooks";

interface PricesProps {}

export const Prices: FC<PricesProps> = () => {
  const translate = useTranslations();
  return (
    <Section>
      <SectionInformation>
        <Title fontSize="md">{translate.formatMessage({ id: "prices" })}</Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "prices" })}</Text>
      </SectionInformation>
      <SectionContent>
        <Title fontSize="md">{translate.formatMessage({ id: "prices" })}</Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "prices" })}</Text>
      </SectionContent>
    </Section>
  );
};
