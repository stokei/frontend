import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";
import { Box, BoxProps } from "../box";

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
  const { setNodeRef, isOver, active } = useDroppable({
    id,
    data: {
      ...data,
      id,
      acceptTypes: acceptTypes || [],
    },
    disabled: !!isDisabled || !acceptTypes?.length,
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
