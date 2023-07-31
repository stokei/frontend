import { useCurrentApp, useTranslations } from "@/hooks";
import defaultNoImage from "@/assets/no-image.png";
import { getProductAvatarURL } from "@/utils/get-product-avatar-url";
import { Section } from "@/views/app/catalog/components/section";
import { SectionContent } from "@/views/app/catalog/components/section-content";
import { SectionInformation } from "@/views/app/catalog/components/section-information";
import { CatalogPageCatalogFragment } from "@/views/app/catalog/graphql/catalog.query.graphql.generated";
import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Loading,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC, useMemo, useState } from "react";
import { useGetAdminCatalogPageCatalogItemsQuery } from "../../graphql/catalog-items.query.graphql.generated";
import { routes } from "@/routes";

interface ProductsProps {
  catalog?: CatalogPageCatalogFragment;
}

export const Products: FC<ProductsProps> = ({ catalog }) => {
  const [productNameQuery, setProductNameQuery] = useState("");
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const [{ data: dataGetCatalogItems, fetching: isLoadingCatalogItems }] =
    useGetAdminCatalogPageCatalogItemsQuery({
      requestPolicy: "network-only",
      variables: {
        where: {
          AND: {
            catalog: {
              equals: catalog?.id,
            },
          },
        },
      },
    });

  const catalogItems = useMemo(() => {
    if (!productNameQuery) {
      return dataGetCatalogItems?.catalogItems?.items || [];
    }
    const filteredList = dataGetCatalogItems?.catalogItems?.items?.filter(
      ({ product }) => !!product?.name?.match(new RegExp(productNameQuery, "i"))
    );
    return filteredList || [];
  }, [dataGetCatalogItems?.catalogItems?.items, productNameQuery]);

  return (
    <Section>
      <SectionInformation>
        <Title fontSize="lg">
          {translate.formatMessage({ id: "products" })}
        </Title>
      </SectionInformation>
      <SectionContent>
        <Stack direction="column" spacing="5">
          {isLoadingCatalogItems ? (
            <Loading />
          ) : (
            <>
              <Stack
                direction={["column", "column", "row", "row"]}
                spacing="5"
                align={["flex-start", "flex-start", "center", "center"]}
              >
                <InputGroup>
                  <Input
                    id="search-product-input"
                    onChange={(e) => setProductNameQuery(e.target.value)}
                    placeholder={translate.formatMessage({
                      id: "namePlaceholder",
                    })}
                  />
                  <InputRightElement>
                    <Icon name="search" />
                  </InputRightElement>
                </InputGroup>
                <Box>
                  <Button leftIcon={<Icon name="plus" />}>
                    {translate.formatMessage({
                      id: "add",
                    })}
                  </Button>
                </Box>
              </Stack>
              {catalogItems?.map((catalogItem) => (
                <Stack
                  key={catalogItem.id}
                  direction={["column", "column", "row", "row"]}
                  spacing="5"
                  justify="space-between"
                >
                  <Link
                    href={
                      routes
                        .app({ appId: currentApp?.id })
                        .product({ product: catalogItem.product.id }).home
                    }
                    target="_blank"
                  >
                    <Stack
                      width="fit-content"
                      direction="row"
                      spacing="4"
                      align="center"
                    >
                      <Image
                        width="10"
                        rounded="sm"
                        src={getProductAvatarURL({
                          productParent: catalogItem.product?.parent,
                          defaultAvatar:
                            catalogItem.product?.avatar?.file.url || "",
                        })}
                        fallbackSrc={defaultNoImage.src}
                        alt={translate.formatMessage({ id: "product" })}
                      />
                      <Stack direction="column" spacing="4">
                        <Text fontWeight="bold">
                          {catalogItem.product?.name}
                        </Text>
                      </Stack>
                    </Stack>
                  </Link>
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </SectionContent>
    </Section>
  );
};
