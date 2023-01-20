import { Card, CardHeader, Container, Stack, Title } from "@stokei/ui";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <Container padding="5">
      <Title marginBottom="5">MEU</Title>
      <Stack direction="row">
        <Card background="background.50">
          <CardHeader>
            <Title>Olá MEU</Title>
          </CardHeader>
        </Card>
      </Stack>
    </Container>
  );
};

export default Page;
