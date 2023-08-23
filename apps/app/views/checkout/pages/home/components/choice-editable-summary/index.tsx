import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  IconButton,
  Stack,
} from "@stokei/ui";
import { PropsWithChildren } from "react";

export interface ChoiseEditableSummaryProps {
  onChange: () => void;
}

export const ChoiseEditableSummary: React.FC<
  PropsWithChildren<ChoiseEditableSummaryProps>
> = ({ onChange, children }) => {
  return (
    <Card>
      <CardBody>
        <Stack direction="row" spacing="5" align="center">
          <Box flexDirection="column" flex="1">
            {children}
          </Box>
          <ButtonGroup>
            <IconButton variant="ghost" name="edit" onClick={onChange} />
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
