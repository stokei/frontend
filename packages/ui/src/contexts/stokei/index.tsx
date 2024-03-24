export { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { languages as stokeiLanguages } from "@stokei/translations";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import dateFnsPortuguese from "date-fns/locale/pt-BR";
import dateFnsEnglish from "date-fns/locale/en-US";
import {
  IColorHue,
  IColorName,
  Language,
  StokeiConfig,
} from "../../interfaces";
import { theme } from "../../styles/themes";

registerLocale(stokeiLanguages.PT_BR, dateFnsPortuguese);
registerLocale(stokeiLanguages.EN_US, dateFnsEnglish);

export interface StokeiUIContextValues {
  readonly appId?: string;
  readonly accountId?: string;
  readonly accountAccessToken?: string;
  readonly accountRefreshToken?: string;
  readonly language?: Language;
  readonly getHexdecimalColor: (
    colorName: IColorName,
    colorHue: IColorHue
  ) => string;
}

export interface StokeiUIContextProps {
  readonly appId?: string;
  readonly accountId?: string;
  readonly accountAccessToken?: string;
  readonly accountRefreshToken?: string;
  readonly language?: Language;
  readonly config?: StokeiConfig;
}

export const StokeiUIContext = React.createContext({} as StokeiUIContextValues);

export const StokeiUIProvider = ({
  children,
  config,
  appId,
  accountId,
  language,
  accountAccessToken,
  accountRefreshToken,
}: PropsWithChildren<StokeiUIContextProps>) => {
  const themeData = useMemo(() => theme(config), [config]);

  const getHexdecimalColor = useCallback(
    (colorName: IColorName, colorHue: IColorHue) => {
      return themeData?.colors?.[colorName]?.[colorHue];
    },
    [themeData]
  );

  const stokeiConfig = useMemo(
    () => ({
      appId,
      accountId,
      language,
      accountAccessToken,
      accountRefreshToken,
      getHexdecimalColor,
    }),
    [
      appId,
      accountId,
      language,
      accountAccessToken,
      accountRefreshToken,
      getHexdecimalColor,
    ]
  );

  useEffect(() => {
    if (language) {
      setDefaultLocale(language);
    }
  }, [language]);

  return (
    <ChakraProvider theme={themeData}>
      <StokeiUIContext.Provider value={stokeiConfig}>
        {children}
      </StokeiUIContext.Provider>
    </ChakraProvider>
  );
};
