import {
  Card,
  CardBody,
  CardHeader,
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
    <Container>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} background="background.50">
            <CardHeader padding="0">
              <Skeleton height="32" roundedTop="md" rounded="0" />
            </CardHeader>
            <CardBody>
              <Stack spacing="3">
                <SkeletonText />
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
