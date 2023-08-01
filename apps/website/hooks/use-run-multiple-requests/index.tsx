import { useCallback, useState } from "react";

export interface UseRunMultipleRequests<THandler> {
  handlers: THandler[];
  onSuccess: () => void;
  onError: (errorPositions: number[]) => void;
}

export const useRunMultipleRequests = <THandler,>({
  handlers,
  onSuccess,
  onError,
}: UseRunMultipleRequests<THandler>) => {
  const [concludedItems, setConcludedItems] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPositions, setErrorPositions] = useState<number[]>([]);

  const onSubmit = useCallback(async () => {
    setConcludedItems(1);
    setIsLoading(true);
    let errorsPositionsList: number[] = [];
    for (let index = 0; index < handlers.length; index++) {
      try {
        const handler = (handlers as any)?.[index];
        const response = await handler?.();
        if (response) {
          setConcludedItems(
            (currentConcludedItems) => (currentConcludedItems += 1)
          );
        } else {
          errorsPositionsList = [...errorsPositionsList, index];
        }
      } catch (error) {
        errorsPositionsList = [...errorsPositionsList, index];
      }
    }
    if (!errorsPositionsList?.length) {
      onSuccess?.();
    } else {
      setErrorPositions(errorsPositionsList);
      onError?.(errorsPositionsList);
    }
    setIsLoading(false);
  }, [handlers, onError, onSuccess]);

  return {
    isLoading,
    errorPositions,
    totalItems: handlers?.length || 0,
    concludedItems,
    onSubmit,
  };
};
