import {
  FormControl,
  Label,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOptions
} from "@stokei/ui";
import { useBuilder, useTranslations } from "../../hooks";
import { SitePageFragment, useGetSitePagesQuery } from "./graphql/pages.query.graphql.generated";
import { PageSelectItem } from "./page-select-item";
import { PageSelectItemContent } from "./page-select-item-content";

interface SelectPageProps {
  readonly label?: string;
  readonly value?: SitePageFragment | null;
  readonly showLabel?: boolean;
  readonly onChange: (value?: SitePageFragment) => void;
}

export const SelectPage = ({
  label,
  value,
  showLabel = true,
  onChange,
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

  return (
    <FormControl flex="3">
      {showLabel && (
        <Label htmlFor="page-select-search-input">
          {label || translate.formatMessage({ id: "page" })}
        </Label>
      )}
      <SingleSelect
        id="page-select-search-input"
        isLoading={isLoadingGetPages}
        value={value}
        onChange={onChange}
        marginBottom="2"
      >
        <SingleSelectButton
          placeholder={translate.formatMessage({
            id: "page",
          })}
          item={(item) => <PageSelectItemContent page={item} />}
        />
        <SingleSelectCombobox>
          <SingleSelectOptions>
            {dataGetPages?.pages?.items?.map((page) => (
              <PageSelectItem key={page.id} page={page} />
            ))}
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl>
  );
};
