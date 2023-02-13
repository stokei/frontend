import { useEffect, useMemo, useState } from "react";

import { useCreateVideoUploadUrlMutation } from "./create-video-upload-url.mutation.graphql.generated";

export const useCreateVideoUploadURL = () => {
  const [uploadURL, setUploadURL] = useState("");
  const [{ data, fetching: isLoading }, onExecuteMutation] =
    useCreateVideoUploadUrlMutation();

  useEffect(() => {
    if (!!data?.response?.uploadURL) {
      setUploadURL(data?.response.uploadURL);
    }
  }, [data]);

  return {
    isLoading,
    uploadURL,
    onStartUpload: () => onExecuteMutation({}),
  };
};
