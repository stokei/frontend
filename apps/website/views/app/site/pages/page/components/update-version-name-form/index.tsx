import { useAPIErrors, usePage, useTranslations } from "@/hooks";
import {
  Editable,
  EditableControls,
  EditableInput,
  EditablePreview,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdateVersionMutation } from "../../graphql/update-version.mutation.graphql.generated";

export const UpdateVersionNameForm = () => {
  const router = useRouter();
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
        router.reload();
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
    <Editable value={name} onSubmit={onSubmit} onChange={setName}>
      <EditablePreview />
      <EditableInput id="version-name" />
      <EditableControls />
    </Editable>
  );
};
