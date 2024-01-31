import { useClipboard, useTranslations } from "../../hooks";
import { Button } from "../button";
import { Input } from "../input";
import { InputGroup } from "../input-group";
import { InputRightAddon } from "../input-right-addon";
import { Stack } from "../stack";

export interface CopyInputProps {
  value: string;
}

export const CopyInput: React.FC<CopyInputProps> = ({ value }) => {
  const translate = useTranslations();
  const { onCopy, hasCopied } = useClipboard(value || "");

  return (
    <InputGroup>
      <Input
        id="copyAndPaste"
        borderRight="none"
        roundedRight="none"
        isReadOnly
        value={value}
      />

      <InputRightAddon
        width="auto"
        paddingX="2"
        background="transparent"
        borderLeft="none"
      >
        <Button
          size="xs"
          onClick={onCopy}
          isDisabled={!value}
          colorScheme="gray"
        >
          {translate.formatMessage({ id: hasCopied ? "copied" : "copy" })}
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
};
