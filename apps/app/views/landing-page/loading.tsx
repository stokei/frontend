import { Container, Loading as LoadingUI } from "@stokei/ui";
import { FC } from "react";

export interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <Container align="center" justify="center" minHeight="50vh">
      <LoadingUI />
    </Container>
  );
};
