import { Card, CardHeader, SkeletonText } from "@stokei/ui";

export const Loading = () => {
  return (
    <Card background="background.50">
      <CardHeader>
        <SkeletonText width="full" noOfLines={1} />
      </CardHeader>
    </Card>
  );
};
