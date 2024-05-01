import { Card, CardHeader, Skeleton, Stack } from "@stokei/ui";

export const Loading = () => {
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
