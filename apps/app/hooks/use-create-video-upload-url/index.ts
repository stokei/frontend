import { useEffect, useMemo, useState } from "react";

import { useCreateVideoUploadUrlMutation } from "./create-video-upload-url.mutation.graphql.generated";

export const useCreateVideoUploadURL = () => {
  const [fileId, setFileId] = useState<string>();
  const [uploadURL, setUploadURL] = useState("");
  const [{ data, fetching: isLoading }, onExecuteMutation] =
    useCreateVideoUploadUrlMutation();

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
