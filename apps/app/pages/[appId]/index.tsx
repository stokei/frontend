import { Card, CardBody, Container, Stack, Title } from "@stokei/ui";

const defaultOptions = Array.from(
  { length: 15 },
  (_, value) => `Valor ${value}`
);
export default function Home() {
  return (
    <Container padding="5">
      <Title marginBottom="5">App</Title>
      <Stack direction="row">
        <Card background="background.50">
          <CardBody>t</CardBody>
        </Card>
      </Stack>
    </Container>
  );
}
