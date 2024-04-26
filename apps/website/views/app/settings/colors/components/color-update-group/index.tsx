import {
  Card,
  CardBody,
  Stack
} from "@stokei/ui";
import { PropsWithChildren } from "react";

export const ColorUpdateGroup = ({ children }: PropsWithChildren) => {
  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          {children}
        </Stack>
      </CardBody>
    </Card>
  );
};
