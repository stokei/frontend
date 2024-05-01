import {
  Card,
  CardBody,
  CardHeader,
  Container,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
} from "@stokei/ui";

export const Loading = () => {
  return (
    <Stack paddingY="10" direction="column" spacing="10">
      <Container>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} background="background.50">
            <CardHeader padding="0">
              <Skeleton height="32" roundedTop="md" rounded="0" />
            </CardHeader>
            <CardBody>
              <Stack spacing="3">
                <SkeletonText />
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Container>
    </Stack>
  );
};
