import { Container, Skeleton, SkeletonText, Stack } from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Stack paddingY="10" direction="column" spacing="10">
      <Container justify="center" align="center">
        <Skeleton width="40%" height="8" />
        <SkeletonText width="30%" noOfLines={1} />
      </Container>
    </Stack>
  );
};
