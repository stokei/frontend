import { Card, CardBody, Container, SkeletonText, Stack } from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Container>
      <Stack paddingY="5" direction="column" spacing="5">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} background="background.50">
            <CardBody>
              <SkeletonText />
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
