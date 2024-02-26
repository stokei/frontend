import { ChoiseEditableSummary } from "@/components/choice-editable-summary";
import { AppCatalogFragment } from "@/components/select-catalogs/graphql/catalogs.query.graphql.generated";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
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

import { ProductParent } from "../../@types/product-parent";
import { ProductPayload } from "../../@types/product-payload";
import { useCreateProductMutation } from "../../graphql/create-product.mutation.graphql.generated";

interface SummaryStepProps {
  catalogs?: AppCatalogFragment[];
  productPayload?: ProductPayload;
  productParent?: ProductParent;
  onPreviousStep: () => void;
}

export const SummaryStep = ({
  catalogs,
  productParent,
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

      const parent = productParent?.id || currentApp?.id;
      const response = await onCreateProduct({
        input: {
          parent: parent || "",
          name: productPayload?.name || "",
          description: productPayload?.description,
          catalogs: catalogsIds,
        },
      });
      if (!!response?.data?.createProduct) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        router.push(
          routes
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
    } catch (error) {}
  };

  return (
    <Form onSubmit={onSubmit}>
      <Stack direction="column" spacing="5">
        <Title fontSize="lg">{productPayload?.name}</Title>

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
