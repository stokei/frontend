import {
  Card,
  CardBody,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@stokei/ui";
import { FC, memo } from "react";

export interface ProductSkeletonProps {}

export const ProductSkeleton: FC<ProductSkeletonProps> = memo(() => {
  return (
    <Card background="background.50">
      <CardBody>
        <Stack spacing="3">
          <Skeleton height="16" />
          <SkeletonText />
        </Stack>
      </CardBody>
    </Card>
  );
});
