import { useCurrentApp, useTranslations } from "@/hooks";
import { AdminLayout } from "@/views/admins/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
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
  Label,
  Stack,
  useDebounce,
} from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MembersList } from "./components/members-list";
import { Navbar } from "./components/navbar";
import { AppMemberFragment } from "./graphql/member.fragment.graphql.generated";
import { useGetAppMembersQuery } from "./graphql/members.query.graphql.generated";
import { Loading } from "./loading";

interface MembersPageProps {}

export const MembersPage: FC<MembersPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<AppMemberFragment[]>([]);

  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

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
        where: {
          ...(searchQueryText && {
            OR: {
              firstname: {
                search: searchQueryText,
              },
              lastname: {
                search: searchQueryText,
              },
            },
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
    if (!!dataGetMembers?.accounts?.items?.length) {
      setMembers(dataGetMembers?.accounts?.items);
    }
  }, [dataGetMembers]);

  const onSearch = async () => {};

  return (
    <AdminLayout>
      <Navbar />
      <Box width="full" flexDirection="row">
        <Container paddingY="5">
          <Stack direction="column" spacing="5">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit(onSearch)}>
                  <FormControl isInvalid={!!errors?.search}>
                    <InputGroup>
                      <Input
                        id="search"
                        placeholder={translate.formatMessage({
                          id: "search",
                        })}
                        autoComplete="off"
                        {...register("search")}
                      />
                      <InputRightElement>
                        <Icon name="search" />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors?.search?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Form>
              </CardBody>
            </Card>
            {isLoading ? <Loading /> : <MembersList appMembers={members} />}
          </Stack>
        </Container>
      </Box>
    </AdminLayout>
  );
};
