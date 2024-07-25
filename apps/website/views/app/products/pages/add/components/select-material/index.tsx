import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Avatar,
  FormControl,
  Label,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions,
  SingleSelectSearchInput,
  Stack,
  Text,
  useDebounce
} from "@stokei/ui";
import { useMemo, useState } from "react";
import { ProductExternalReference } from "../../@types/product-external-reference";
import {
  AddProductMaterialSelectFragment,
  useGetAddProductMaterialsSelectQuery,
} from "../../graphql/materials.query.graphql.generated";

export interface SelectMaterialProps {
  productExternalReference?: ProductExternalReference;
  onChangeProductExternalReference: (productExternalReference?: ProductExternalReference) => void;
}
export const SelectMaterial = ({
  productExternalReference,
  onChangeProductExternalReference,
}: SelectMaterialProps) => {
  const [materialQuery, setMaterialQuery] = useState<string>("");
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const [materialQueryValue] = useDebounce(materialQuery, 500);

  const [{ fetching: isLoading, data: dataMaterials }] =
    useGetAddProductMaterialsSelectQuery({
      requestPolicy: "network-only",
      variables: {
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
            ...(materialQueryValue && {
              name: {
                startsWith: materialQueryValue,
              },
            }),
          },
        },
      },
    });

  const materials = useMemo(
    () => dataMaterials?.materials?.items,
    [dataMaterials]
  );

  const mapMaterialToProductExternalReference = (
    currentMaterial?: AddProductMaterialSelectFragment
  ) => {
    return (
      currentMaterial && {
        id: currentMaterial?.id || "",
        name: currentMaterial?.name || "",
        description: currentMaterial?.description || "",
        avatarURL: currentMaterial?.avatar?.file?.url || "",
      }
    );
  };

  const onChooseProductTypeItem = (
    currentMaterial?: AddProductMaterialSelectFragment
  ) => {
    onChangeProductExternalReference(mapMaterialToProductExternalReference(currentMaterial));
  };

  return (
    <Stack direction="column" spacing="5">
      <FormControl isInvalid={!productExternalReference}>
        <Label htmlFor="select-couse">
          {translate.formatMessage({ id: "material" })}
        </Label>
        <SingleSelect
          id="select-couse"
          isLoading={isLoading}
          value={productExternalReference}
          onChange={onChooseProductTypeItem}
        >
          <SingleSelectButton
            placeholder={translate.formatMessage({ id: "material" })}
            item={(materialItem) => (
              <Stack direction="row" spacing="4" align="center">
                <Avatar
                  size="sm"
                  src={materialItem?.avatar?.file?.url || ""}
                  name={materialItem?.name}
                />
                <Text fontWeight="bold">{materialItem?.name}</Text>
              </Stack>
            )}
          />

          <SingleSelectCombobox>
            <SingleSelectSearchInput
              value={materialQuery}
              onChange={(e) => setMaterialQuery(e.target.value || "")}
            />
            <SingleSelectOptions>
              {materials?.map((material) => (
                <SingleSelectOption
                  key={material?.id}
                  value={mapMaterialToProductExternalReference(material)}
                >
                  <Stack direction="row" spacing="4" align="center">
                    <Avatar
                      size="sm"
                      src={material?.avatar?.file?.url || ""}
                      name={material?.name}
                    />
                    <Text fontWeight="bold">{material?.name}</Text>
                  </Stack>
                </SingleSelectOption>
              ))}
            </SingleSelectOptions>
          </SingleSelectCombobox>
        </SingleSelect>
      </FormControl>
    </Stack>
  );
};
