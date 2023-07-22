import { Card, CardHeader, Container, SkeletonText, Stack } from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Container>
      <Stack direction="column" spacing="5">
        <SkeletonText width="full" noOfLines={1} />
        <Card background="background.50">
          <CardHeader>
            <SkeletonText width="full" noOfLines={5} />
          </CardHeader>
        </Card>
      </Stack>
    </Container>
  );
};
