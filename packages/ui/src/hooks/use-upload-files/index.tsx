import { useCallback, useState } from "react";

export const useUploadFiles = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onRemoveFile = useCallback((position: number) => {
    setFiles(
      (currentFiles) =>
        currentFiles?.filter((_, index) => position !== index) || []
    );
  }, []);

  const onAddFiles = useCallback((newFiles: File[]) => {
    setFiles((currentFiles) => [...currentFiles, ...newFiles]);
  }, []);

  return {
    files,
    onAddFiles,
    onRemoveFile,
  };
};
