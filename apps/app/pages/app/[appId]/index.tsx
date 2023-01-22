import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCurrentAppQuery } from "./current-app.query.graphql.generated";
import { useLoginMutation } from "./login.mutation.graphql.generated";
import { useMeAccountQuery } from "./me.query.graphql.generated";

interface Props {}

const Page: NextPage<Props> = () => {
  const router = useRouter();

  const [
    {
      fetching: isLoadingLoginMutation,
      data: dataLoginMutation,
      error: errorLoginMutation,
    },
    onLogin,
  ] = useLoginMutation();

  const [
    { fetching: isLoadingMeQuery, data: dataMeQuery, error: errorMeQuery },
    reload,
  ] = useMeAccountQuery();

  const [
    {
      fetching: isLoadingCurrentAppQuery,
      data: dataCurrentAppQuery,
      error: errorCurrentAppQuery,
    },
  ] = useCurrentAppQuery();

  useEffect(() => {
    if (dataLoginMutation) {
      setAccessToken(
        dataLoginMutation.login.accessToken,
        dataLoginMutation.login.prefixToken
      );
      setRefreshToken(dataLoginMutation.login.refreshToken);
      router.reload();
    }
  }, [dataLoginMutation, router]);

  return (
    <Container padding="5">
      <Title marginBottom="5">
        App {dataCurrentAppQuery?.currentApp?.name}
      </Title>
      <Stack direction="row">
        <Card background="background.50">
          <CardHeader>
            <Title>Olá {dataMeQuery?.me?.fullname}</Title>
          </CardHeader>
          <CardBody>
            <Stack>
              <Text>MeError: {errorMeQuery?.message}</Text>
              <Text>LoginError: {errorLoginMutation?.message}</Text>
              <Text>AppError: {errorCurrentAppQuery?.message}</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button
              isLoading={isLoadingMeQuery}
              onClick={() => reload({ requestPolicy: "network-only" })}
            >
              Reload
            </Button>
            <Button
              isLoading={isLoadingLoginMutation}
              onClick={() =>
                onLogin({
                  input: {
                    email: "admin@stokei.com",
                    password: "123456",
                  },
                })
              }
            >
              Fazer login
            </Button>
          </CardFooter>
        </Card>
      </Stack>
    </Container>
  );
};

export default Page;
