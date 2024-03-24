import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  SkeletonText,
  Stack,
} from "@stokei/ui";

export const Loading = () => {
  return (
    <Card background="background.50">
      <CardHeader padding="0">
        <Skeleton height="32" roundedTop="md" rounded="0" />
      </CardHeader>
      <CardBody>
        <Stack spacing="3">
          <SkeletonText />
        </Stack>
      </CardBody>
    </Card>
  );
};
