import { Card, CardHeader, Container, Skeleton, Stack } from "@stokei/ui";

export const Loading = () => {
  return (
    <Container paddingY="5">
      <Stack direction="column" spacing="5">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} background="background.50">
            <CardHeader>
              <Skeleton height="20" />
            </CardHeader>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
