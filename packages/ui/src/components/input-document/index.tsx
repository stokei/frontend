import { useCallback, useMemo } from "react";
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
  Cnpj = "CNPJ",
  Cpf = "CPF",
  Passport = "PASSPORT",
}

export interface InputDocumentProps {
  id: string;
  isLoading?: boolean;
  document: string;
  documentType: DocumentType;
  withDocumentTypeDisabled?: boolean;
  documentTypesAllowed?: DocumentType[];
  onChangeDocument: (document: string) => void;
  onChangeDocumentType: (documentType: DocumentType) => void;
}

export const InputDocument: React.FC<InputDocumentProps> = ({
  id,
  isLoading,
  document,
  documentType,
  documentTypesAllowed,
  withDocumentTypeDisabled,
  onChangeDocument,
  onChangeDocumentType,
  ...props
}) => {
  const translate = useTranslations();

  const documentTypes = useMemo(
    () =>
      documentTypesAllowed?.length
        ? documentTypesAllowed
        : [DocumentType.Cpf, DocumentType.Cnpj, DocumentType.Passport],
    [documentTypesAllowed]
  );

  const setDocument = useCallback(
    (e: any) => {
      if (documentType === DocumentType.Passport) {
        const valueWithOnlyNumbersAndLetters = (e.target.value + "")
          ?.trim()
          ?.replace(/[^a-zA-Z0-9]/g, "");
        onChangeDocument(valueWithOnlyNumbersAndLetters);
      } else {
        const valueWithOnlyNumbers = (e.target.value + "")
          ?.trim()
          ?.replace(/[^0-9]/g, "");
        onChangeDocument(valueWithOnlyNumbers);
      }
    },
    [documentType, onChangeDocument]
  );

  return (
    <Stack direction="row" spacing="2" {...props}>
      <Box width="40">
        <Select
          isLoading={isLoading}
          value={documentType}
          onChooseItem={onChangeDocumentType}
          onRemoveChooseItem={onChangeDocumentType}
          isDisabled={withDocumentTypeDisabled}
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
            {documentTypes.map((documentTypeAllow) => (
              <SelectItem key={documentTypeAllow} value={documentTypeAllow}>
                <Text>
                  {translate.formatMessage({
                    id: documentTypeAllow?.toLowerCase() as any,
                  })}
                </Text>
              </SelectItem>
            ))}
          </SelectList>
        </Select>
      </Box>
      <Input
        id={id}
        value={document || ""}
        isDisabled={isLoading}
        placeholder={translate.formatMessage({
          id: documentType?.toLowerCase() as any,
        })}
        maxLength={documentType === DocumentType.Passport ? 50 : 16}
        onChange={setDocument}
      />
    </Stack>
  );
};
