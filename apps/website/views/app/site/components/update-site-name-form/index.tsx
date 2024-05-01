import { useAPIErrors, useSite, useTranslations } from "@/hooks";
import {
  Editable,
  EditableControls,
  EditableInput,
  EditablePreview,
  useToast,
} from "@stokei/ui";
import { useEffect, useState } from "react";
import { useUpdateSiteMutation } from "../../graphql/update-site.mutation.graphql.generated";

export const UpdateSiteNameForm = () => {
  const { site } = useSite();
  const [name, setName] = useState("");
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdateSite }, onExecuteUpdateSiteMutation] =
    useUpdateSiteMutation();

  useEffect(() => {
    if (site?.name) {
      setName(site?.name);
    }
  }, [site?.name]);

  const onSubmit = async () => {
    try {
      const response = await onExecuteUpdateSiteMutation({
        input: {
          data: {
            name,
          },
          where: {
            site: site?.id || "",
          },
        },
      });
      if (!!response?.data?.updateSite) {
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
    <Editable value={name} onSubmit={onSubmit} onChange={setName}>
      <EditablePreview />
      <EditableInput id="site-name" />
      <EditableControls />
    </Editable>
  );
};
