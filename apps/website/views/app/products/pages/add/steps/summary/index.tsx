import { ChoiseEditableSummary } from "@/components/choice-editable-summary";
import { AppCatalogFragment } from "@/components/select-catalogs/graphql/catalogs.query.graphql.generated";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Description,
  Form,
  Stack,
  Text,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";

import { ProductExternalReference } from "../../@types/product-external-reference";
import { ProductPayload } from "../../@types/product-payload";
import { useCreateProductMutation } from "../../graphql/create-product.mutation.graphql.generated";
import { ProductType as ProductTypeAPI } from "@/services/graphql/stokei";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { ProductType } from "@/constants/product-type";

interface SummaryStepProps {
  productType?: ProductType;
  comboProducts?: GeneralProductFragment[];
  catalogs?: AppCatalogFragment[];
  productPayload?: ProductPayload;
  productExternalReference?: ProductExternalReference;
  onPreviousStep: () => void;
}

export const SummaryStep = ({
  productType,
  comboProducts,
  catalogs,
  productExternalReference,
  productPayload,
  onPreviousStep,
}: SummaryStepProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();

  const [{ fetching: isLoadingCreateProduct }, onCreateProduct] =
    useCreateProductMutation();

  const onSubmit = async () => {
    try {
      const catalogsIds = catalogs?.map(({ id }) => id);
      const comboProductsIds = comboProducts?.map(({ id }) => id)
      const externalReference = productExternalReference?.id;
      const response = await onCreateProduct({
        input: {
          parent: currentApp?.id || "",
          externalReference,
          type: ProductType.COMBO === productType ? ProductTypeAPI.Combo : ProductTypeAPI.Unique,
          name: productPayload?.name || "",
          description: productPayload?.description,
          catalogs: catalogsIds,
          comboProducts: comboProductsIds
        },
      });
      if (!!response?.data?.createProduct) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        router.push(
          websiteRoutes
            .app({ appId: currentApp?.id })
            .product({ product: response.data.createProduct.id }).home
        );
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) { }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Stack direction="column" spacing="5">
        <Title fontSize="lg">{productPayload?.name}</Title>

        {comboProducts?.length && (
          <Stack direction="column" spacing="3">
            <Title fontSize="sm" color="text.700">
              {translate.formatMessage({ id: "comboProducts" })}
            </Title>

            {comboProducts?.map((comboProduct) => (
              <Card key={comboProduct.id} size="sm">
                <CardBody>
                  <Stack direction="row" spacing="3" align="center">
                    <Avatar
                      name={comboProduct.name}
                      src={comboProduct.avatar?.file.url || ""}
                    />
                    <Text fontWeight="semibold">{comboProduct.name}</Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Stack>
        )}

        <Stack direction="column" spacing="3">
          <Title fontSize="sm" color="text.700">
            {translate.formatMessage({ id: "catalogs" })}
          </Title>

          {catalogs?.length ? (
            <>
              {catalogs?.map((catalog) => (
                <Card key={catalog.id} size="sm">
                  <CardBody>
                    <Text fontWeight="semibold">{catalog.title}</Text>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <Description>
              {translate.formatMessage({
                id: "catalogsNotFound",
              })}
            </Description>
          )}
        </Stack>
        <ButtonGroup width="full" justifyContent="space-between">
          <Button variant="ghost" onClick={onPreviousStep}>
            {translate.formatMessage({ id: "previous" })}
          </Button>
          <Button type="submit" isLoading={isLoadingCreateProduct}>
            {translate.formatMessage({ id: "save" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
