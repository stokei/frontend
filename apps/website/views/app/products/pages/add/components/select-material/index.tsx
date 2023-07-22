import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Avatar,
  FormControl,
  Label,
  Select,
  SelectItem,
  SelectList,
  SelectSearchInput,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDebounce,
} from "@stokei/ui";
import React, { useMemo, useState } from "react";
import { ProductParent } from "../../@types/product-parent";
import {
  AddProductMaterialSelectFragment,
  useGetAddProductMaterialsSelectQuery,
} from "../../graphql/materials.query.graphql.generated";

export interface SelectMaterialProps {
  productParent?: ProductParent;
  onChangeProductParent: (parent?: ProductParent) => void;
}
export const SelectMaterial: React.FC<SelectMaterialProps> = ({
  productParent,
  onChangeProductParent,
}) => {
  const [materialQuery, setMaterialQuery] = useState<string>("");
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const materialQueryValue = useDebounce(materialQuery, 500);

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

  const mapMaterialToProductParent = (
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
    onChangeProductParent(mapMaterialToProductParent(currentMaterial));
  };

  return (
    <Stack direction="column" spacing="5">
      <FormControl isInvalid={!productParent}>
        <Label htmlFor="select-couse">
          {translate.formatMessage({ id: "material" })}
        </Label>
        <Select
          isLoading={isLoading}
          value={productParent}
          onChooseItem={onChooseProductTypeItem}
          onRemoveChooseItem={onChooseProductTypeItem}
        >
          <SelectSearchInput
            id="select-couse"
            onChange={(e) => setMaterialQuery(e.target.value || "")}
            item={(materialItem) => (
              <Tag>
                <TagLabel>
                  <Stack direction="row" spacing="4" align="center">
                    <Avatar
                      size="sm"
                      src={materialItem?.avatar?.file?.url || ""}
                      name={materialItem?.name}
                    />
                    <Text fontWeight="bold">{materialItem?.name}</Text>
                  </Stack>
                </TagLabel>
                <TagCloseButton onClick={() => onChooseProductTypeItem()} />
              </Tag>
            )}
          />

          <SelectList>
            {materials?.map((material) => (
              <SelectItem
                key={material?.id}
                value={mapMaterialToProductParent(material)}
              >
                <Stack direction="row" spacing="4" align="center">
                  <Avatar
                    size="sm"
                    src={material?.avatar?.file?.url || ""}
                    name={material?.name}
                  />
                  <Text fontWeight="bold">{material?.name}</Text>
                </Stack>
              </SelectItem>
            ))}
          </SelectList>
        </Select>
      </FormControl>
    </Stack>
  );
};
