import {
  Card,
  CardBody,
  CardHeader,
  Container,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@stokei/ui";

export const Loading = () => {
  return (
    <Stack paddingY="5" direction="column" spacing="10">
      <Stack direction="row" spacing="2">
        <SkeletonCircle />
        <Stack direction="column" spacing="2">
          <Skeleton />
          <Skeleton />
        </Stack>
      </Stack>
      <SkeletonText noOfLines={6} />
    </Stack>
  );
};
