import { useTranslations } from "@/hooks";
import { Button, Spacer, Stack } from "@stokei/ui";
import { UpdateVersionNameForm } from "../update-version-name-form";

export const Header = () => {
  const translate = useTranslations();
  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <UpdateVersionNameForm />
      <Spacer />
      <Button onClick={() => {}}>
        {translate.formatMessage({ id: "publish" })}
      </Button>
    </Stack>
  );
};
