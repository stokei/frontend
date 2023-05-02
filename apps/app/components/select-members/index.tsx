import { useCurrentApp, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  FormControl,
  Label,
  Select,
  SelectList,
  SelectSearchInput,
  SelectTagItem,
  SelectTagList,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDebounce,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AppAccountFragment,
  useGetAppAccountsQuery,
} from "./graphql/accounts.query.graphql.generated";
import { MemberSelectItem } from "./member-select-item";
import { useCurrentAccount } from "@/hooks/use-current-account";

interface SelectMembersProps {
  readonly label?: string;
  readonly hasCurrentAccount?: boolean;
  readonly currentMembers?: AppAccountFragment[];
  readonly onChooseCurrentMember: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentMember: (value?: AppAccountFragment) => void;
}

export const SelectMembers: FC<SelectMembersProps> = ({
  label,
  currentMembers,
  hasCurrentAccount = true,
  onChooseCurrentMember,
  onRemoveChooseCurrentMember,
}) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();

  const validationSchema = z.object({
    searchMember: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const searchMemberQueryText = useDebounce(watch("searchMember"), 500);

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
            firstname: {
              search: searchMemberQueryText,
            },
            lastname: {
              search: searchMemberQueryText,
            },
          },
          OR: [
            {
              lastname: {
                search: searchMemberQueryText,
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
    if (!hasCurrentAccount) {
      return dataGetMembers?.accounts?.items || [];
    }
    const currentAccountMember: AppAccountFragment | undefined = currentAccount
      ? {
          id: currentAccount.id,
          firstname: currentAccount.firstname,
          fullname: currentAccount.fullname,
          email: currentAccount.email,
          avatar: currentAccount.avatar,
        }
      : undefined;
    const membersList = dataGetMembers?.accounts?.items || [];
    return [currentAccountMember, ...membersList].filter(
      Boolean
    ) as AppAccountFragment[];
  }, [currentAccount, dataGetMembers, hasCurrentAccount]);

  return (
    <FormControl flex="3">
      <Label htmlFor="member-invoice-filters-select-search-input">
        {label || translate.formatMessage({ id: "student" })}
      </Label>
      <Select
        isLoading={isLoadingGetMembers}
        value={currentMembers}
        onChooseItem={onChooseCurrentMember}
        onRemoveChooseItem={onRemoveChooseCurrentMember}
        marginBottom="2"
      >
        <SelectSearchInput
          id="member-invoice-filters-select-search-input"
          placeholder={translate.formatMessage({
            id: "search",
          })}
          {...register("searchMember")}
        />
        <SelectList>
          {members?.map((member) => (
            <MemberSelectItem key={member.id} member={member} />
          ))}
        </SelectList>
      </Select>
      {!!currentMembers?.length && (
        <SelectTagList>
          {currentMembers?.map((currentMember) => (
            <SelectTagItem key={currentMember.id}>
              <Tag>
                <TagLabel>
                  <Stack direction="row" spacing="4" align="center">
                    <Avatar
                      size="xs"
                      src={currentMember?.avatar?.file?.url || ""}
                      name={currentMember?.fullname}
                    />
                    <Text fontWeight="bold">{currentMember?.fullname}</Text>
                  </Stack>
                </TagLabel>
                <TagCloseButton
                  onClick={() => onRemoveChooseCurrentMember(currentMember)}
                />
              </Tag>
            </SelectTagItem>
          ))}
        </SelectTagList>
      )}
    </FormControl>
  );
};
