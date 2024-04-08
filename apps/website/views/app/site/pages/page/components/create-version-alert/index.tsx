import { useTranslations } from "@/hooks";
import { Alert, AlertDescription, AlertIcon, Button, Stack } from "@stokei/ui";
import { useCreateNewVersion } from "../../hooks/use-create-new-version";

export const CreateVersionAlert = () => {
  const { isLoading, onCreateNewVersion } = useCreateNewVersion();
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Alert status="warning">
        <AlertIcon />
        <Stack
          direction={["column", "column", "row", "row"]}
          spacing="2"
          justify={["center", "center", "space-between", "space-between"]}
          align={["space-between", "space-between", "center", "center"]}
        >
          <AlertDescription>
            {translate.formatMessage({
              id: "thisPageIsInItsMostRecentVersionToMakeChangesClickOnCreateNewVersion",
            })}
          </AlertDescription>
          <Button
            variant="ghost"
            colorScheme="black"
            isLoading={isLoading}
            onClick={onCreateNewVersion}
          >
            {translate.formatMessage({
              id: "createNewVersion",
            })}
          </Button>
        </Stack>
      </Alert>
    </Stack>
  );
};
