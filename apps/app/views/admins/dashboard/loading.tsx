import {
  Box,
  Card,
  CardHeader,
  Container,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Container>
      <Stack direction="column" spacing="5">
        {Array.from({ length: 2 }).map((_, i) => (
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
                  <SkeletonText width="full" noOfLines={1} />
                </Box>
              </Stack>
            </CardHeader>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
