import { useEffect, useMemo, useState } from "react";

import { useCreateImageUploadUrlMutation } from "./create-image-upload-url.mutation.graphql.generated";

export const useCreateImageUploadURL = () => {
  const [fileId, setFileId] = useState<string>();
  const [uploadURL, setUploadURL] = useState("");
  const [{ data, fetching: isLoading }, onExecuteMutation] =
    useCreateImageUploadUrlMutation();

  useEffect(() => {
    if (!!data?.response?.uploadURL) {
      setFileId(data?.response.file?.id);
      setUploadURL(data?.response.uploadURL);
    }
  }, [data]);

  return {
    fileId,
    isLoading,
    uploadURL,
    onStartUpload: () => onExecuteMutation({}),
  };
};
