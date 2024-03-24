import {
  Card,
  CardBody,
  Container,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
} from "@stokei/ui";

export const Loading = () => {
  return (
    <Container>
      <Stack direction="column" spacing="3">
        <Skeleton height="16" />
        <SkeletonText />
      </Stack>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="5">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} background="background.50">
            <CardBody>
              <Stack direction="column" spacing="3">
                <Skeleton height="16" />
                <SkeletonText />
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
