import { useContext } from "react";
import { DragAndDropContext } from "../../contexts";

export const useDragAndDropContext = () => useContext(DragAndDropContext);
