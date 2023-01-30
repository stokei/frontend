import { I18nKey as UII18nKey } from "@stokei/ui";
import { ptBRMessages } from "@/i18n";

export type I18nKey = keyof typeof ptBRMessages | UII18nKey;
