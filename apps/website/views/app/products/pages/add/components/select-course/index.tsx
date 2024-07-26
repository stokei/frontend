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
  AddProductCourseSelectFragment,
  useGetAddProductCoursesSelectQuery,
} from "../../graphql/courses.query.graphql.generated";

export interface SelectCurseProps {
  productExternalReference?: ProductExternalReference;
  onChangeProductExternalReference: (externalReference?: ProductExternalReference) => void;
}
export const SelectCurse = ({
  productExternalReference,
  onChangeProductExternalReference,
}: SelectCurseProps) => {
  const [courseQuery, setCourseQuery] = useState<string>("");
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const [courseQueryValue] = useDebounce(courseQuery, 500);

  const [{ fetching: isLoading, data: dataCourses }] =
    useGetAddProductCoursesSelectQuery({
      requestPolicy: "network-only",
      variables: {
        where: {
          AND: {
            name: {
              startsWith: courseQueryValue,
            },
            parent: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  const courses = useMemo(() => dataCourses?.courses?.items, [dataCourses]);

  const mapCourseToProductExternalReference = (
    currentCourse?: AddProductCourseSelectFragment
  ) => {
    return (
      currentCourse && {
        id: currentCourse?.id || "",
        name: currentCourse?.name || "",
        description: currentCourse?.description || "",
        avatarURL: currentCourse?.avatar?.file?.url || "",
      }
    );
  };

  const onChooseProductTypeItem = (
    currentCourse?: AddProductCourseSelectFragment
  ) => {
    onChangeProductExternalReference(mapCourseToProductExternalReference(currentCourse));
  };

  return (
    <Stack direction="column" spacing="5">
      <FormControl isInvalid={!productExternalReference}>
        <Label htmlFor="select-couse">
          {translate.formatMessage({ id: "course" })}
        </Label>
        <SingleSelect
          id="select-couse"
          isLoading={isLoading}
          value={productExternalReference}
          onChange={onChooseProductTypeItem}
        >
          <SingleSelectButton
            placeholder={translate.formatMessage({ id: "course" })}
            item={(courseItem) => (
              <Stack direction="row" spacing="4" align="center">
                <Avatar
                  size="sm"
                  src={courseItem?.avatar?.file?.url || ""}
                  name={courseItem?.name}
                />
                <Text fontWeight="bold">{courseItem?.name}</Text>
              </Stack>
            )}
          />
          <SingleSelectCombobox>
            <SingleSelectSearchInput
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value || "")}
            />
            <SingleSelectOptions>
              {courses?.map((course) => (
                <SingleSelectOption
                  key={course?.id}
                  value={mapCourseToProductExternalReference(course)}
                >
                  <Stack direction="row" spacing="4" align="center">
                    <Avatar
                      size="sm"
                      src={course?.avatar?.file?.url || ""}
                      name={course?.name}
                    />
                    <Text fontWeight="bold">{course?.name}</Text>
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
