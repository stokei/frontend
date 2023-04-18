import { Text, Title } from "@stokei/ui";
import { FC } from "react";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionInformation } from "../section-information";
import { useTranslations } from "@/hooks";

interface ProductInformationProps {}

export const ProductInformation: FC<ProductInformationProps> = () => {
  const translate = useTranslations();
  return (
    <Section>
      <SectionInformation>
        <Title fontSize="md">
          {translate.formatMessage({ id: "product" })}
        </Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "product" })}</Text>
      </SectionInformation>
      <SectionContent>
        <Title fontSize="md">
          {translate.formatMessage({ id: "product" })}
        </Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "product" })}</Text>
      </SectionContent>
    </Section>
  );
};
