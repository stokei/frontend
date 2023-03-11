import {
  Box,
  Card,
  CardHeader,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} background="background.50">
          <CardHeader>
            <Stack
              direction="column"
              spacing="5"
              align="center"
              justify="center"
            >
              <SkeletonCircle />
              <Box
                width="full"
                align="center"
                justify="center"
                flexDirection="column"
                flex="1"
              >
                <SkeletonText width="full" noOfLines={2} />
              </Box>
            </Stack>
          </CardHeader>
        </Card>
      ))}
    </SimpleGrid>
  );
};
