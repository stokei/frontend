import { useAPIErrors, usePage, useTranslations } from "@/hooks";
import {
  Box,
  Editable,
  EditableControls,
  EditableInput,
  EditablePreview,
  Label,
  Stack,
  Text,
  useToast,
} from "@stokei/ui";
import { useEffect, useState } from "react";
import { useUpdateVersionMutation } from "../../graphql/update-version.mutation.graphql.generated";

export const UpdateVersionNameForm = () => {
  const { version } = usePage();
  const [name, setName] = useState("");
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdateVersion }, onExecuteUpdateVersionMutation] =
    useUpdateVersionMutation();

  useEffect(() => {
    if (version?.name) {
      setName(version?.name);
    }
  }, [version?.name]);

  const onSubmit = async () => {
    try {
      const response = await onExecuteUpdateVersionMutation({
        input: {
          data: {
            name,
          },
          where: {
            version: version?.id || "",
          },
        },
      });
      if (!!response?.data?.updateVersion) {
        onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowAPIError({ message: "sorryAnErrorOccurred" });
    }
  };

  return (
    <Stack width="fit-content" direction="row" align="center" spacing="2">
      <Text fontWeight="bold">{translate.formatMessage({ id: 'version' })}:</Text>
      <Editable value={name} onSubmit={onSubmit} onChange={setName}>
        <EditablePreview />
        <EditableInput id="version-name" isLoading={isLoadingUpdateVersion} />
        <EditableControls />
      </Editable>
    </Stack>
  );
};
