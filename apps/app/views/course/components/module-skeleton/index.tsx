import { Card, CardBody, Skeleton, SkeletonText, Stack } from "@stokei/ui";
import { FC, memo } from "react";

export interface ModuleSkeletonProps {}

export const ModuleSkeleton: FC<ModuleSkeletonProps> = memo(() => {
  return (
    <Stack spacing="3">
      <Skeleton height="16" />
      <SkeletonText />
    </Stack>
  );
});
