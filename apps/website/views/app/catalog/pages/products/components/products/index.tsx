import { useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { Section } from "@/views/app/catalog/components/section";
import { SectionContent } from "@/views/app/catalog/components/section-content";
import { CatalogPageCatalogFragment } from "@/views/app/catalog/graphql/catalog.query.graphql.generated";
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Loading,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { FC, useMemo, useState } from "react";
import { useGetAdminCatalogPageCatalogItemsQuery } from "../../graphql/catalog-items.query.graphql.generated";
import { AddCatalogItemDrawer } from "../add-catalog-item-drawer";
import { ProductItem } from "../product-item";

interface ProductsProps {
  catalog?: CatalogPageCatalogFragment;
}

export const Products: FC<ProductsProps> = ({ catalog }) => {
  const [productNameQuery, setProductNameQuery] = useState("");
  const translate = useTranslations();

  const {
    isOpen: isOpenAddCatalogItemDrawer,
    onClose: onCloseAddCatalogItemDrawer,
    onOpen: onOpenAddCatalogItemDrawer,
  } = useDisclosure();

  const [
    { data: dataGetCatalogItems, fetching: isLoadingCatalogItems },
    onReloadCatalogItems,
  ] = useGetAdminCatalogPageCatalogItemsQuery({
    requestPolicy: "network-only",
    variables: {
      where: {
        AND: {
          catalog: {
            equals: catalog?.id,
          },
        },
      },
      orderBy: {
        createdAt: OrderBy.Desc,
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
      <SectionContent>
        <AddCatalogItemDrawer
          catalogId={catalog?.id || ""}
          isOpenDrawer={isOpenAddCatalogItemDrawer}
          onCloseDrawer={onCloseAddCatalogItemDrawer}
          onSuccess={() =>
            onReloadCatalogItems({ requestPolicy: "network-only" })
          }
        />
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
                  <Button
                    leftIcon={<Icon name="plus" />}
                    onClick={onOpenAddCatalogItemDrawer}
                  >
                    {translate.formatMessage({
                      id: "add",
                    })}
                  </Button>
                </Box>
              </Stack>
              {!catalogItems?.length ? (
                <NotFound>
                  <NotFoundIcon name="product" />
                  <NotFoundSubtitle>
                    {translate.formatMessage({ id: "productsNotFound" })}
                  </NotFoundSubtitle>
                </NotFound>
              ) : (
                <>
                  {catalogItems?.map((catalogItem) => (
                    <ProductItem
                      catalogItem={catalogItem}
                      onCatalogItemRemoved={() =>
                        onReloadCatalogItems({ requestPolicy: "network-only" })
                      }
                    />
                  ))}
                </>
              )}
            </>
          )}
        </Stack>
      </SectionContent>
    </Section>
  );
};
