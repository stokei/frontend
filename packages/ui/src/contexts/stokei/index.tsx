export { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import React, { PropsWithChildren, useMemo } from "react";
import { Language, StokeiConfig } from "../../interfaces";
import { theme } from "../../styles/themes";

export interface StokeiUIContextValues {
  readonly appId?: string;
  readonly accountId?: string;
  readonly language?: Language;
  readonly cloudflareAPIToken?: string;
}

export interface StokeiUIContextProps {
  readonly appId?: string;
  readonly accountId?: string;
  readonly cloudflareAPIToken?: string;
  readonly language?: Language;
  readonly config?: StokeiConfig;
}

export const StokeiUIContext = React.createContext({} as StokeiUIContextValues);

export const StokeiUIProvider: React.FC<
  PropsWithChildren<StokeiUIContextProps>
> = ({ children, config, appId, accountId, cloudflareAPIToken, language }) => {
  const themeData = useMemo(() => theme(config), [config]);
  const stokeiConfig = useMemo(
    () => ({ appId, accountId, cloudflareAPIToken, language }),
    [appId, accountId, cloudflareAPIToken, language]
  );
  return (
    <ChakraProvider theme={themeData}>
      <StokeiUIContext.Provider value={stokeiConfig}>
        {children}
      </StokeiUIContext.Provider>
    </ChakraProvider>
  );
};
