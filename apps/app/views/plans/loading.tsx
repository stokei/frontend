import {
  Card,
  CardBody,
  Container,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
} from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Container paddingY="10">
      <Stack direction="column" spacing="10">
        <Stack direction="column" spacing="1" align="center" justify="center">
          <Skeleton width="40%" height="8" />
          <SkeletonText width="30%" noOfLines={1} />
        </Stack>
        <SimpleGrid columns={[1, 2, 3, 3]} spacing="5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              background="background.50"
              width={["full", "full", "350px", "350px"]}
            >
              <CardBody>
                <Stack spacing="3">
                  <Skeleton height="16" />
                  <SkeletonText />
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
