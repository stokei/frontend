import { useCurrentApp, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  Label,
  MultiSelect,
  MultiSelectButton,
  MultiSelectCombobox,
  MultiSelectOptions,
  MultiSelectSearchInput,
  useDebounce
} from "@stokei/ui";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AppAccountFragment,
  useGetAppAccountsQuery,
} from "./graphql/accounts.query.graphql.generated";
import { MemberSelectItem } from "./member-select-item";
import { MemberSelectItemContent } from "./member-select-item-content";

interface SelectMembersProps {
  readonly label?: string;
  readonly isOptional?: boolean;
  readonly hasCurrentAccount?: boolean;
  readonly currentMembers?: AppAccountFragment[];
  readonly onChange: (value?: AppAccountFragment) => void;
}

export const SelectMembers = ({
  label,
  isOptional,
  currentMembers,
  hasCurrentAccount = true,
  onChange,
}: SelectMembersProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();

  const validationSchema = z.object({
    searchMember: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const [searchMemberQueryText] = useDebounce(watch("searchMember"), 500);

  const [{ data: dataGetMembers, fetching: isLoadingGetMembers }] =
    useGetAppAccountsQuery({
      pause: !currentApp && !searchMemberQueryText,
      variables: {
        page: {
          limit: 5,
        },
        orderBy: {
          firstname: OrderBy.Asc,
          lastname: OrderBy.Asc,
        },
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
          },
          OR: [
            {
              firstname: {
                search: searchMemberQueryText,
              },
            },
            {
              lastname: {
                search: searchMemberQueryText,
              },
            },
            {
              email: {
                equals: searchMemberQueryText,
              },
            },
          ],
          ...(!hasCurrentAccount &&
            currentAccount?.id && {
            NOT: {
              ids: [currentAccount?.id],
            },
          }),
        },
      },
    });

  const members = useMemo(() => {
    if (!hasCurrentAccount || !currentAccount) {
      return dataGetMembers?.accounts?.items || [];
    }
    const currentAccountMember: AppAccountFragment = {
      id: currentAccount.id,
      firstname: currentAccount.firstname,
      fullname: currentAccount.fullname,
      email: currentAccount.email,
      avatar: currentAccount.avatar,
    };
    const membersList = dataGetMembers?.accounts?.items || [];
    return [currentAccountMember, ...membersList].filter(
      (member) => member.id !== currentAccount.id
    ) as AppAccountFragment[];
  }, [currentAccount, dataGetMembers, hasCurrentAccount]);

  return (
    <FormControl flex="3">
      <Label
        htmlFor="member-invoice-filters-select-search-input"
        isOptional={!!isOptional}
      >
        {label || translate.formatMessage({ id: "student" })}
      </Label>
      <MultiSelect
        id="member-invoice-filters-select-search-input"
        isLoading={isLoadingGetMembers}
        value={currentMembers}
        onChange={onChange}
        marginBottom="2"
      >
        <MultiSelectButton
          placeholder={translate.formatMessage({
            id: "search",
          })}
          item={(member) => (
            <MemberSelectItemContent key={member.id} member={member} />
          )}
        />
        <MultiSelectCombobox>
          <MultiSelectOptions>
            <MultiSelectSearchInput
              {...register('searchMember')}
            />
            {members?.map((member) => (
              <MemberSelectItem key={member.id} member={member} />
            ))}
          </MultiSelectOptions>
        </MultiSelectCombobox>
      </MultiSelect>
    </FormControl>
  );
};
