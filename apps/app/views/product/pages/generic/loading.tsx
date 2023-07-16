import {
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
    <Stack direction="column" spacing="5">
      <Container paddingY="10" background="black.500">
        <Stack direction="column" spacing="5">
          <Skeleton width="50%" height="10" />
          <SkeletonText width="60%" noOfLines={1} />
        </Stack>
      </Container>
      <Container>
        <Stack
          spacing="10"
          direction={["column-reverse", "column-reverse", "row", "row"]}
        >
          <Stack spacing="5" direction="column" width="auto" flex="1">
            <Skeleton height="16" />
            <Skeleton height="16" />
            <SkeletonText />
          </Stack>
          <Card
            background="background.50"
            width={["full", "full", "350px", "350px"]}
          >
            <CardBody>
              <Stack spacing="3">
                <Skeleton height="52" />
                <SkeletonText />
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Container>
    </Stack>
  );
};
