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
  IColor,
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
  readonly getColorByHexdecimal: (colorValue: string, colorName?: IColorName) => IColor | undefined
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
  const getColorByHexdecimal = useCallback(
    (colorValue: string, colorName?: IColorName): IColor | undefined => {
      if (!colorValue) {
        return
      }
      for (const currentColorName in themeData?.colors) {
        const hues = themeData?.colors[currentColorName];
        if (colorName && currentColorName !== colorName) {
          continue;
        }
        for (const hue in hues) {
          if (hues[hue] === colorValue) {
            return `${currentColorName}.${hue}` as IColor;
          }
        }
      }
      return;
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
      getColorByHexdecimal
    }),
    [appId, accountId, language, accountAccessToken, accountRefreshToken, getHexdecimalColor, getColorByHexdecimal]
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
