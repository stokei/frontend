import { AlertStatus, useToast as useChakraToast } from "@chakra-ui/react";
import { useCallback } from "react";

export interface UseToastParams {
  /**
   * The title of the toast
   */
  title?: React.ReactNode;
  /**
   * The description of the toast
   */
  description?: React.ReactNode;
  /**
   * If `true`, toast will show a close button
   */
  isClosable?: boolean;
  /**
   * The status of the toast.
   */
  status?: AlertStatus;
  /**
   * A custom icon that will be displayed by the toast.
   */
  icon?: React.ReactNode;

  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?: () => void;
}

export const useToast = () => {
  const toast = useChakraToast();

  const onShowToast = useCallback(
    (params: UseToastParams) =>
      toast({
        ...params,
        duration: 3000,
        variant: "subtle",
        position: "top-right",
        isClosable:
          params?.isClosable === true || params?.isClosable === false
            ? params?.isClosable
            : true,
      }),
    [toast]
  );

  return { onShowToast };
};
