import { useAPIErrors, usePage, useTranslations } from "@/hooks";
import {
  Editable,
  EditableControls,
  EditableInput,
  EditablePreview,
  useToast,
} from "@stokei/ui";
import { useEffect, useState } from "react";
import { useUpdatePageMutation } from "../../graphql/update-page.mutation.graphql.generated";

export const UpdatePageTitleForm = () => {
  const { page, pageId, onChangePage } = usePage();
  const [title, setTitle] = useState("");
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdatePage }, onExecuteUpdatePageMutation] =
    useUpdatePageMutation();

  useEffect(() => {
    if (page?.title) {
      setTitle(page?.title);
    }
  }, [page?.title]);

  const onSubmit = async () => {
    try {
      const response = await onExecuteUpdatePageMutation({
        input: {
          data: {
            title,
          },
          where: {
            page: pageId,
          },
        },
      });
      if (!!response?.data?.updatePage) {
        onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
        onChangePage(response?.data?.updatePage);
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
    <Editable value={title} onSubmit={onSubmit} onChange={setTitle}>
      <EditablePreview />
      <EditableInput id="page-title" isLoading={isLoadingUpdatePage} />
      <EditableControls />
    </Editable>
  );
};
