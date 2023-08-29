import { Card, CardHeader, Skeleton, Stack } from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Stack direction="column" spacing="5">
      <Card background="background.50">
        <CardHeader>
          <Skeleton height="16" />
        </CardHeader>
      </Card>
    </Stack>
  );
};
