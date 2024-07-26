import { useCurrentApp, useTranslations } from "@/hooks";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { websiteRoutes } from "@stokei/routes";
import {
  Avatar,
  Link,
  Stack,
  Text,
  Title
} from "@stokei/ui";
import { Section } from "../../../../components/section";
import { SectionContent } from "../../../../components/section-content";
import { SectionInformation } from "../../../../components/section-information";

interface ComboProductsProps {
  product?: GeneralProductFragment;
}

export const ComboProducts = ({
  product,
}: ComboProductsProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Section>
      <SectionInformation>
        <Stack
          direction={["column", "column", "row", "row"]}
          spacing="5"
          align={["flex-start", "flex-start", "center", "center"]}
        >
          <Stack direction="column" spacing="1">
            <Title fontSize="lg">
              {translate.formatMessage({ id: "comboProducts" })}
            </Title>
          </Stack>
        </Stack>
      </SectionInformation>
      <SectionContent>
        <Stack
          direction="column"
          spacing="5"
        >
          {product?.combo?.map(productComboItem => (
            <Stack
              key={productComboItem.id}
              direction="row"
              spacing="2"
              align="center"
            >
              <Avatar
                name={productComboItem?.name}
                src={productComboItem.avatar?.file.url || ""}
              />
              <Link
                href={websiteRoutes.app({ appId: currentApp?.id }).product({ product: productComboItem?.id || "" }).home}
              >
                <Text fontWeight="bold">
                  {productComboItem?.name}
                </Text>
              </Link>
            </Stack>
          ))}
        </Stack>
      </SectionContent>
    </Section>
  );
};
