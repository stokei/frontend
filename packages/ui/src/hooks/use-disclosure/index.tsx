import { useDisclosure as useDisclosureChakra } from "@chakra-ui/react";

export interface UseDisclosureProps {
  readonly startOpen?: boolean;
}
export interface UseDisclosureResponse {
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onClose: () => void;
  readonly onToggle: () => void;
}

export const useDisclosure = (
  data?: UseDisclosureProps
): UseDisclosureResponse => {
  return useDisclosureChakra({
    defaultIsOpen: !!data?.startOpen,
  });
};
