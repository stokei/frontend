import { Skeleton, SkeletonText, Stack } from "@stokei/ui";

export const ModuleLoading = () => {
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
};
