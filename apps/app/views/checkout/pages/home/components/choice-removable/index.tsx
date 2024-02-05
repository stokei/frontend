import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  IconButton,
  Stack,
} from "@stokei/ui";
import { PropsWithChildren } from "react";

export interface ChoiseRemovableProps {
  onRemove: () => void;
}

export const ChoiseRemovable: React.FC<
  PropsWithChildren<ChoiseRemovableProps>
> = ({ onRemove, children }) => {
  return (
    <Card>
      <CardBody>
        <Stack direction="row" spacing="5" align="center">
          <Box flexDirection="column" flex="1">
            {children}
          </Box>
          <ButtonGroup>
            <IconButton variant="ghost" name="trash" onClick={onRemove} />
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
