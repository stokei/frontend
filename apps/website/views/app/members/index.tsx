import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { AppLayout } from "@/views/app/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDebounce,
  useDisclosure,
} from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MembersList } from "./components/members-list";
import { Navbar } from "./components/navbar";
import { AppMemberFragment } from "./graphql/member.fragment.graphql.generated";
import { useGetAppMembersQuery } from "./graphql/members.query.graphql.generated";
import { Loading } from "./loading";
import { AddMemberDrawer } from "./components/add-member-drawer";

interface MembersPageProps {}

export const MembersPage: FC<MembersPageProps> = () => {
  const { currentPage, onChangePage } = usePagination();
  const [members, setMembers] = useState<AppMemberFragment[]>([]);

  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const {
    isOpen: isOpenAddMemberDrawer,
    onClose: onCloseAddMemberDrawer,
    onOpen: onOpenAddMemberDrawer,
  } = useDisclosure();

  const validationSchema = z.object({
    search: z.string(),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const searchQueryText = useDebounce(watch("search"), 500);

  const [{ data: dataGetMembers, fetching: isLoading }] = useGetAppMembersQuery(
    {
      pause: !currentApp,
      variables: {
        page: {
          limit: 9,
          number: currentPage,
        },
        where: {
          ...(searchQueryText && {
            OR: [
              {
                firstname: {
                  search: searchQueryText,
                },
              },
              {
                lastname: {
                  search: searchQueryText,
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
          <Stack direction="column" spacing="5">
            <Stack
              direction={["column", "column", "row", "row"]}
              spacing="5"
              justify="space-between"
            >
              <FormControl
                width={["full", "full", "32%", "32%"]}
                isInvalid={!!errors?.search}
              >
                <InputGroup>
                  <Input
                    id="search"
                    placeholder={translate.formatMessage({
                      id: "search",
                    })}
                    background="background.50"
                    autoComplete="off"
                    {...register("search")}
                  />
                  <InputRightElement>
                    <Icon name="search" />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.search?.message}</FormErrorMessage>
              </FormControl>

              <Button onClick={onOpenAddMemberDrawer}>
                {translate.formatMessage({ id: "addMember" })}
              </Button>
            </Stack>
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
