import { RefObject, useEffect } from "react";

type Handler = (event: MouseEvent) => void;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
): void => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        handler?.(event);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, ref]);
};
