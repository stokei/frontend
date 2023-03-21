import {
  Box,
  Card,
  CardBody,
  Container,
  Skeleton,
  SkeletonText,
  Stack,
} from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Container paddingY="10" align="center">
      <Box
        width={["full", "full", "584px", "584px"]}
        height="fit-content"
        flexDirection="column"
      >
        <Stack direction="column" spacing="10">
          <Skeleton width="full" height="10" />
          <Skeleton width="full" height="40" />
        </Stack>
      </Box>
    </Container>
  );
};
