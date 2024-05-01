import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { AppLayout } from "@/views/app/layout";
import {
  Box,
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useEffect, useState } from "react";
import { AddMemberDrawer } from "./components/add-member-drawer";
import { Header } from "./components/header";
import { MembersFilters } from "./components/members-filters";
import { MembersList } from "./components/members-list";
import { Navbar } from "./components/navbar";
import { AppMemberFragment } from "./graphql/member.fragment.graphql.generated";
import { useGetAppMembersQuery } from "./graphql/members.query.graphql.generated";
import { Loading } from "./loading";

export const MembersPage = () => {
  const { currentPage, onChangePage } = usePagination();
  const [members, setMembers] = useState<AppMemberFragment[]>([]);
  const [filteredNameQuery, setFilteredNameQuery] = useState<string>();

  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const {
    isOpen: isOpenFiltersDrawer,
    onClose: onCloseFiltersDrawer,
    onOpen: onOpenFiltersDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenAddMemberDrawer,
    onClose: onCloseAddMemberDrawer,
    onOpen: onOpenAddMemberDrawer,
  } = useDisclosure();

  const [{ data: dataGetMembers, fetching: isLoading }] = useGetAppMembersQuery(
    {
      pause: !currentApp,
      variables: {
        page: {
          limit: 9,
          number: currentPage,
        },
        where: {
          ...(filteredNameQuery && {
            OR: [
              {
                firstname: {
                  search: filteredNameQuery,
                },
              },
              {
                lastname: {
                  search: filteredNameQuery,
                },
              },
            ],
          }),
          AND: {
            app: {
              equals: currentApp?.id,
            },
          },
        },
      },
    }
  );

  useEffect(() => {
    setMembers(dataGetMembers?.accounts?.items || []);
  }, [dataGetMembers]);

  const onSuccessMemberAdded = async (member: AppMemberFragment) => {
    setMembers((currentMembers) => [member, ...currentMembers]);
    onCloseAddMemberDrawer();
  };

  return (
    <AppLayout>
      <Navbar />
      <Box width="full" flexDirection="row">
        <Container paddingY="5">
          <AddMemberDrawer
            isOpenDrawer={isOpenAddMemberDrawer}
            onCloseDrawer={onCloseAddMemberDrawer}
            onSuccess={onSuccessMemberAdded}
          />
          <MembersFilters
            isOpen={isOpenFiltersDrawer}
            onClose={onCloseFiltersDrawer}
            filteredNameQuery={filteredNameQuery}
            onChangeFilteredNameQuery={setFilteredNameQuery}
          />
          <Stack direction="column" spacing="5">
            <Header
              totalCount={dataGetMembers?.accounts?.totalCount || 0}
              onOpenFilters={onOpenFiltersDrawer}
              onOpenAddMember={onOpenAddMemberDrawer}
            />
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {!members?.length ? (
                  <NotFound>
                    <NotFoundIcon name="user" />
                    <NotFoundSubtitle>
                      {translate.formatMessage({ id: "accountsNotFound" })}
                    </NotFoundSubtitle>
                    <Button onClick={onOpenAddMemberDrawer}>
                      {translate.formatMessage({ id: "addMember" })}
                    </Button>
                  </NotFound>
                ) : (
                  <MembersList appMembers={members} />
                )}
              </>
            )}

            {dataGetMembers?.accounts?.totalPages &&
              dataGetMembers?.accounts?.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  hasNextPage={!!dataGetMembers?.accounts?.hasNextPage}
                  hasPreviousPage={!!dataGetMembers?.accounts?.hasPreviousPage}
                  totalPages={dataGetMembers?.accounts?.totalPages || 1}
                />
              )}
          </Stack>
        </Container>
      </Box>
    </AppLayout>
  );
};
