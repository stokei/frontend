import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
} from "@stokei/ui";

export const Loading = () => {
  return (
    <Stack direction="column" spacing="5">
      {Array.from({ length: 6 }).map((_, i) => (
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
    </Stack>
  );
};
