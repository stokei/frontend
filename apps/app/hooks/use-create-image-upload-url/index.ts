import { useEffect, useMemo, useState } from "react";

import { useCreateImageUploadUrlMutation } from "./create-image-upload-url.mutation.graphql.generated";

export const useCreateImageUploadURL = () => {
  const [uploadURL, setUploadURL] = useState("");
  const [{ data, fetching: isLoading }, onExecuteMutation] =
    useCreateImageUploadUrlMutation();

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
