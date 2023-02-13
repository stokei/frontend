import {
  Card,
  CardBody,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
} from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="5">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} background="background.50">
          <CardBody>
            <Stack spacing="3">
              <Skeleton height="16" />
              <SkeletonText />
            </Stack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};
