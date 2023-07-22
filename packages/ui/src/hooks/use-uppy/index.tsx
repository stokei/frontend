import { Uppy } from "@uppy/core";
import { useEffect, useMemo } from "react";

export interface UseUppyConfig {
  onError?: () => void;
  onSuccess?: () => void;
  getUppy: () => Uppy;
}
export const useUppy = ({
  getUppy,
  onError,
  onSuccess,
}: UseUppyConfig): Uppy => {
  const uppy = useMemo(() => getUppy(), [getUppy]);

  useEffect(() => {
    uppy.on("upload-success", (result) => {
      const isSuccess = !!result?.data;
      if (isSuccess) {
        onSuccess?.();
      }
    });
    return () => {
      uppy.off("upload-success", () => {});
    };
  }, [uppy, onSuccess]);

  useEffect(() => {
    uppy.on("upload-error", (result) => {
      const isFailed = !!result?.data;
      if (isFailed) {
        onError?.();
      }
    });
    return () => {
      uppy.off("upload-error", () => {});
    };
  }, [uppy, onError]);

  return uppy;
};
