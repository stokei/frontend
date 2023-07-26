import { Card, CardHeader, SkeletonText } from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Card background="background.50">
      <CardHeader>
        <SkeletonText width="full" noOfLines={1} />
      </CardHeader>
    </Card>
  );
};
