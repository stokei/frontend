import { useBuilder, useTranslations } from "../../hooks";
import {
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectList,
} from "@stokei/ui";
import { useCallback } from "react";
import { PageSelectItem } from "./page-select-item";
import { PageSelectItemContent } from "./page-select-item-content";
import { SitePageFragment, useGetSitePagesQuery } from "./graphql/pages.query.graphql.generated";

interface SelectPageProps {
  readonly label?: string;
  readonly value?: SitePageFragment | null;
  readonly showLabel?: boolean;
  readonly onChoose: (value?: SitePageFragment) => void;
  readonly onRemoveChoose: (value?: SitePageFragment) => void;
}

export const SelectPage = ({
  label,
  value,
  showLabel = true,
  onChoose,
  onRemoveChoose,
}: SelectPageProps) => {
  const { siteId } = useBuilder();
  const translate = useTranslations();

  const [{ data: dataGetPages, fetching: isLoadingGetPages }] = useGetSitePagesQuery({
    pause: !siteId,
    variables: {
      where: {
        AND: {
          parent: {
            equals: siteId
          }
        }
      }
    }
  });

  const onChooseItem = useCallback(
    (value?: SitePageFragment) => {
      onChoose?.(value);
    },
    [onChoose]
  );
  const onRemoveChooseItem = useCallback(
    (value?: SitePageFragment) => {
      onRemoveChoose?.(value);
    },
    [onRemoveChoose]
  );

  return (
    <FormControl flex="3">
      {showLabel && (
        <Label htmlFor="page-select-search-input">
          {label || translate.formatMessage({ id: "page" })}
        </Label>
      )}
      <Select
        isLoading={isLoadingGetPages}
        value={value}
        onChooseItem={onChooseItem}
        onRemoveChooseItem={onRemoveChooseItem}
        marginBottom="2"
      >
        <SelectInput
          id="page-select-search-input"
          placeholder={translate.formatMessage({
            id: "page",
          })}
          item={(item) => <PageSelectItemContent page={item} />}
        />
        <SelectList>
          {dataGetPages?.pages?.items?.map((page) => (
            <PageSelectItem key={page.id} page={page} />
          ))}
        </SelectList>
      </Select>
    </FormControl>
  );
};
