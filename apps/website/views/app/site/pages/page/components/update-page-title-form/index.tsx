import { useAPIErrors, usePage, useTranslations } from "@/hooks";
import {
  Editable,
  EditableControls,
  EditableInput,
  EditablePreview,
  useToast,
} from "@stokei/ui";
import { z } from "zod";
import { useUpdatePageMutation } from "../../graphql/update-page.mutation.graphql.generated";
import { useEffect, useState } from "react";

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
      onShowToast({
        title: translate.formatMessage({ id: "sorryAnErrorOccurred" }),
        status: "error",
      });
    }
  };

  return (
    <Editable value={title} onSubmit={onSubmit} onChange={setTitle}>
      <EditablePreview />
      <EditableInput id="page-title" />
      <EditableControls />
    </Editable>
  );
};
