import { useCallback, useEffect, useMemo } from "react";
import { useTranslations } from "../../hooks";
import { Box } from "../box";
import { Input } from "../input";
import {
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions
} from "../selects";
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

export const InputDocument = ({
  id,
  isLoading,
  document,
  documentType,
  documentTypesAllowed,
  withDocumentTypeDisabled,
  onChangeDocument,
  onChangeDocumentType,
  ...props
}: InputDocumentProps) => {
  const translate = useTranslations();

  const documentTypes = useMemo(
    () =>
      documentTypesAllowed?.length
        ? documentTypesAllowed
        : [DocumentType.Cpf, DocumentType.Cnpj, DocumentType.Passport],
    [documentTypesAllowed]
  );

  const maxLength = useMemo(() => {
    const sizes: Record<DocumentType, number> = {
      [DocumentType.Cpf]: 11,
      [DocumentType.Cnpj]: 16,
      [DocumentType.Passport]: 50,
    };
    return sizes[documentType || DocumentType.Cpf];
  }, [documentType]);

  useEffect(() => {
    if (document) {
      onChangeDocument(document?.slice(0, maxLength));
    }
  }, [document, maxLength, onChangeDocument]);

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
        <SingleSelect
          id={id}
          isLoading={isLoading}
          value={documentType}
          onChange={onChangeDocumentType}
          isDisabled={withDocumentTypeDisabled}
        >
          <SingleSelectButton
            placeholder={documentTypes?.[0]}
            item={(item) => (
              <Text>
                {translate.formatMessage({
                  id: (item + "")?.toLowerCase() as any,
                })}
              </Text>
            )}
          />
          <SingleSelectCombobox>
            <SingleSelectOptions>
              {documentTypes.map((documentTypeAllow) => (
                <SingleSelectOption key={documentTypeAllow} value={documentTypeAllow}>
                  <Text>
                    {translate.formatMessage({
                      id: documentTypeAllow?.toLowerCase() as any,
                    })}
                  </Text>
                </SingleSelectOption>
              ))}
            </SingleSelectOptions>
          </SingleSelectCombobox>
        </SingleSelect>
      </Box>
      <Input
        id={id}
        value={document || ""}
        isDisabled={isLoading}
        placeholder={translate.formatMessage({
          id: documentType?.toLowerCase() as any,
        })}
        maxLength={maxLength}
        onChange={setDocument}
      />
    </Stack>
  );
};
