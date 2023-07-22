export { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import React, { PropsWithChildren, useCallback, useMemo } from "react";
import {
  IColorHue,
  IColorName,
  Language,
  StokeiConfig,
} from "../../interfaces";
import { theme } from "../../styles/themes";

export interface StokeiUIContextValues {
  readonly appId?: string;
  readonly accountId?: string;
  readonly accountAccessToken?: string;
  readonly accountRefreshToken?: string;
  readonly language?: Language;
  readonly cloudflareAPIToken?: string;
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
  readonly cloudflareAPIToken?: string;
  readonly language?: Language;
  readonly config?: StokeiConfig;
}

export const StokeiUIContext = React.createContext({} as StokeiUIContextValues);

export const StokeiUIProvider: React.FC<
  PropsWithChildren<StokeiUIContextProps>
> = ({
  children,
  config,
  appId,
  accountId,
  cloudflareAPIToken,
  language,
  accountAccessToken,
  accountRefreshToken,
}) => {
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
      cloudflareAPIToken,
      language,
      accountAccessToken,
      accountRefreshToken,
      getHexdecimalColor,
    }),
    [
      appId,
      accountId,
      cloudflareAPIToken,
      language,
      accountAccessToken,
      accountRefreshToken,
      getHexdecimalColor,
    ]
  );

  return (
    <ChakraProvider theme={themeData}>
      <StokeiUIContext.Provider value={stokeiConfig}>
        {children}
      </StokeiUIContext.Provider>
    </ChakraProvider>
  );
};
