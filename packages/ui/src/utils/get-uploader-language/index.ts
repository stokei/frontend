// @ts-ignore
import enUS from "@uppy/locales/lib/en_US";
// @ts-ignore
import ptBR from "@uppy/locales/lib/pt_BR";

import { Language } from "../../interfaces";

export const getUploaderLanguage = (language: Language = "pt-BR") => {
  const languages: Record<Language, any> = {
    "en-US": enUS,
    "pt-BR": ptBR,
  };
  return languages[language] || languages["pt-BR"];
};
