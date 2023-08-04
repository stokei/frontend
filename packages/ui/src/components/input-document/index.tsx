import { useCallback } from "react";
import { useTranslations } from "../../hooks";
import { Box } from "../box";
import { Input } from "../input";
import { Select } from "../select";
import { SelectInput } from "../select-input";
import { SelectItem } from "../select-item";
import { SelectList } from "../select-list";
import { Stack } from "../stack";
import { Text } from "../text";

export enum DocumentType {
  CPF = "CPF",
  CNPJ = "CNPJ",
}

export interface InputDocumentProps {
  id: string;
  isLoading?: boolean;
  document: string;
  documentType: DocumentType;
  onChangeDocument: (document: string) => void;
  onChangeDocumentType: (documentType: DocumentType) => void;
}

export const InputDocument: React.FC<InputDocumentProps> = ({
  id,
  isLoading,
  document,
  documentType,
  onChangeDocument,
  onChangeDocumentType,
  ...props
}) => {
  const translate = useTranslations();

  const setDocument = useCallback(
    (e: any) => {
      onChangeDocument((e.target.value + "")?.trim()?.replace(/\D/g, ""));
    },
    [onChangeDocument]
  );

  return (
    <Stack direction="row" spacing="2" {...props}>
      <Box width="40">
        <Select
          isLoading={isLoading}
          value={documentType}
          onChooseItem={onChangeDocumentType}
          onRemoveChooseItem={onChangeDocumentType}
        >
          <SelectInput
            id={`${id || ""}-select-input`}
            item={(item) => (
              <Text>
                {translate.formatMessage({
                  id: (item + "")?.toLowerCase() as any,
                })}
              </Text>
            )}
          />
          <SelectList>
            <SelectItem value={DocumentType.CPF}>
              <Text>
                {translate.formatMessage({
                  id: "cpf",
                })}
              </Text>
            </SelectItem>
            <SelectItem value={DocumentType.CNPJ}>
              <Text>
                {translate.formatMessage({
                  id: "cnpj",
                })}
              </Text>
            </SelectItem>
          </SelectList>
        </Select>
      </Box>
      <Input
        id={id}
        value={document || ""}
        isDisabled={isLoading}
        placeholder={translate.formatMessage({
          id: documentType === DocumentType.CPF ? "cpf" : "cnpj",
        })}
        maxLength={documentType === DocumentType.CPF ? 11 : 14}
        onChange={setDocument}
      />
    </Stack>
  );
};
