import { useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  Label,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOptions,
  SingleSelectSearchInput,
  useDebounce
} from "@stokei/ui";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BankSelectItem } from "./bank-select-item";
import { BankSelectItemContent } from "./bank-select-item-content";

export interface Bank {
  code: string;
  name: string;
}

interface SelectBankProps {
  readonly label?: string;
  readonly bank?: Bank;
  readonly onChange: (value?: Bank) => void;
}

export const SelectBank = ({
  label,
  bank,
  onChange,
}: SelectBankProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [banks, setBanks] = useState<Bank[]>([]);
  const translate = useTranslations();

  const validationSchema = z.object({
    searchBank: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const [searchBankQueryText] = useDebounce(watch("searchBank"), 500);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const response = await fetch("https://brasilapi.com.br/api/banks/v1");
        const data = await response.json();
        setBanks(data || []);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    loadBanks();
  }, []);

  const banksFiltered = useMemo(() => {
    const banksWithCode = banks?.filter((currentBank) => !!currentBank?.code);
    if (!searchBankQueryText) {
      return banksWithCode || [];
    }
    return banksWithCode?.filter(
      (currentBank) =>
        !!currentBank?.name?.match(new RegExp(searchBankQueryText, "i"))
    );
  }, [banks, searchBankQueryText]);

  return (
    <FormControl flex="3">
      <Label htmlFor="bank-select-search-input">
        {label || translate.formatMessage({ id: "bankCode" })}
      </Label>
      <SingleSelect
        id="bank-select-search-input"
        isLoading={isLoading}
        value={bank}
        onChange={onChange}
        marginBottom="2"
      >
        <SingleSelectButton
          placeholder={translate.formatMessage({
            id: "search",
          })}
          item={(currentBank) => (
            <BankSelectItemContent key={currentBank.code} bank={currentBank} />
          )}
        />
        <SingleSelectCombobox>
          <SingleSelectOptions>
            <SingleSelectSearchInput
              {...register('searchBank')}
            />
            {banksFiltered?.map((currentBank) => (
              <BankSelectItem key={currentBank.code} bank={currentBank} />
            ))}
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl>
  );
};
