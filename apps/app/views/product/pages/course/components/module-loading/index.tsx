import { Card, CardBody, Skeleton, SkeletonText, Stack } from "@stokei/ui";
import { FC, memo } from "react";

export interface ModuleLoadingProps {}

export const ModuleLoading: FC<ModuleLoadingProps> = memo(() => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <Stack key={i} spacing="3">
          <Skeleton height="16" />
          <SkeletonText />
        </Stack>
      ))}
    </>
  );
});

ModuleLoading.displayName = "ModuleLoading";
