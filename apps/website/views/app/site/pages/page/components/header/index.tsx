import { Stack } from "@stokei/ui";
import { ActionsMenu } from "../actions-menu";
import { UpdateVersionNameForm } from "../update-version-name-form";

export const Header = () => {
  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      justify="space-between"
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <UpdateVersionNameForm />
      <ActionsMenu />
    </Stack>
  );
};
