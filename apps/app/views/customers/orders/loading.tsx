import { Card, CardHeader, Container, Skeleton, Stack } from "@stokei/ui";

export const Loading = () => {
  return (
    <Container>
      <Stack direction="column" spacing="5">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} background="background.50">
            <CardHeader>
              <Skeleton height="16" />
            </CardHeader>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
