import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@stokei/ui";
import { FC } from "react";

interface PlanItemSkeletonProps {}

export const PlanItemSkeleton: FC<PlanItemSkeletonProps> = () => {
  return (
    <Card background="background.50">
      <CardHeader>
        <Stack spacing="2" justify="center" align="center">
          <SkeletonCircle boxSize="16" />
          <Skeleton />
        </Stack>
      </CardHeader>
      <CardBody paddingTop={0}>
        <SkeletonText noOfLines={5} />
      </CardBody>
      <CardFooter background="background.200">
        <Box width="full" justify="center" align="center">
          <Skeleton height="10" />
        </Box>
      </CardFooter>
    </Card>
  );
};
