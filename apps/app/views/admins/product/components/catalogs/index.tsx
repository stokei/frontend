import { Text, Title } from "@stokei/ui";
import { FC } from "react";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionInformation } from "../section-information";
import { useTranslations } from "@/hooks";

interface CatalogsProps {}

export const Catalogs: FC<CatalogsProps> = () => {
  const translate = useTranslations();
  return (
    <Section>
      <SectionInformation>
        <Title fontSize="md">
          {translate.formatMessage({ id: "catalogs" })}
        </Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "catalogs" })}</Text>
      </SectionInformation>
      <SectionContent>
        <Title fontSize="md">
          {translate.formatMessage({ id: "catalogs" })}
        </Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "catalogs" })}</Text>
      </SectionContent>
    </Section>
  );
};
