import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Avatar,
  FormControl,
  Label,
  Select,
  SelectItem,
  SelectList,
  SelectSearchInput,
  SelectTagItem,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDebounce,
} from "@stokei/ui";
import React, { useEffect, useMemo, useState } from "react";
import {
  AddProductCourseSelectFragment,
  useGetAddProductCoursesSelectQuery,
} from "../../graphql/courses.query.graphql.generated";
import { ProductParent } from "../../@types/product-parent";

export interface SelectCurseProps {
  productParent?: ProductParent;
  onChangeProductParent: (parent?: ProductParent) => void;
}
export const SelectCurse: React.FC<SelectCurseProps> = ({
  productParent,
  onChangeProductParent,
}) => {
  const [courseQuery, setCourseQuery] = useState<string>("");
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const courseQueryValue = useDebounce(courseQuery, 500);

  const [{ fetching: isLoading, data: dataCourses }] =
    useGetAddProductCoursesSelectQuery({
      pause: !!courseQueryValue,
      variables: {
        where: {
          AND: {
            name: {
              search: courseQueryValue,
            },
            parent: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  const courses = useMemo(() => dataCourses?.courses?.items, [dataCourses]);

  const mapCourseToProductParent = (
    currentCourse?: AddProductCourseSelectFragment
  ) => {
    return (
      currentCourse && {
        id: currentCourse?.id || "",
        name: currentCourse?.name,
        avatarURL: currentCourse?.avatar?.file?.url || "",
      }
    );
  };

  const onChooseProductTypeItem = (
    currentCourse?: AddProductCourseSelectFragment
  ) => {
    onChangeProductParent(mapCourseToProductParent(currentCourse));
  };

  return (
    <Stack direction="column" spacing="5">
      <FormControl isInvalid={!productParent}>
        <Label htmlFor="select-couse">
          {translate.formatMessage({ id: "course" })}
        </Label>
        <Select
          isLoading={isLoading}
          value={productParent}
          onChooseItem={onChooseProductTypeItem}
          onRemoveChooseItem={onChooseProductTypeItem}
        >
          <SelectSearchInput
            id="select-couse"
            item={(courseItem) => (
              <Tag>
                <TagLabel>
                  <Stack direction="row" spacing="4" align="center">
                    <Avatar
                      size="sm"
                      src={courseItem?.avatar?.file?.url || ""}
                      name={courseItem?.name}
                    />
                    <Text fontWeight="bold">{courseItem?.name}</Text>
                  </Stack>
                </TagLabel>
                <TagCloseButton onClick={() => onChooseProductTypeItem()} />
              </Tag>
            )}
            onChange={(e) => setCourseQuery(e.target.value || "")}
          />

          <SelectList>
            {courses?.map((course) => (
              <SelectItem
                key={course?.id}
                value={mapCourseToProductParent(course)}
              >
                <Stack direction="row" spacing="4" align="center">
                  <Avatar
                    size="sm"
                    src={course?.avatar?.file?.url || ""}
                    name={course?.name}
                  />
                  <Text fontWeight="bold">{course?.name}</Text>
                </Stack>
              </SelectItem>
            ))}
          </SelectList>
        </Select>
      </FormControl>
    </Stack>
  );
};
