import { I18nKey } from "@/interfaces/i18n-key";
import { useTranslations as useDefaultTranslations } from "@stokei/translations";

export const useTranslations = () => useDefaultTranslations<I18nKey>();
