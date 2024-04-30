import { ButtonGroup, Stack } from "@stokei/ui";
import { ActionsMenu } from "../actions-menu";
import { UpdateVersionNameForm } from "../update-version-name-form";
import { PublishVersionButton } from "./publish-version-button";

export const Header = () => {
  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      justify="space-between"
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <UpdateVersionNameForm />
      <ButtonGroup>
        <ActionsMenu />
        <PublishVersionButton />
      </ButtonGroup>
    </Stack>
  );
};
