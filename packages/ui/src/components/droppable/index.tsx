import { useDroppable } from "@dnd-kit/core";
import { Box, BoxProps } from "../box";
import { PropsWithChildren, useMemo } from "react";

export interface DroppableProps<TData = any> {
  id: string;
  acceptTypes?: string[];
  isDisabled?: boolean;
  data?: TData;
}
export const Droppable = ({
  id,
  acceptTypes,
  data,
  isDisabled,
  children,
  ...props
}: PropsWithChildren<DroppableProps>) => {
  const { setNodeRef, isOver, active, over } = useDroppable({
    id,
    data: {
      ...data,
      id,
      acceptTypes: acceptTypes || [],
    },
    disabled: !!isDisabled,
  });

  const isValidType = !!acceptTypes?.includes(active?.data?.current?.type);

  const activeStyle: BoxProps =
    isOver && isValidType
      ? {
          background: "background.300",
        }
      : {};

  return (
    <Box
      ref={setNodeRef}
      width="full"
      height="fit-content"
      flexDirection="column"
      {...activeStyle}
    >
      {children}
    </Box>
  );
};
