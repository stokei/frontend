import { I18nKey } from "../../types/i18n-key";
import { useTranslations as useDefaultTranslations } from "@stokei/translations";

export const useTranslations = () => useDefaultTranslations<I18nKey>();
