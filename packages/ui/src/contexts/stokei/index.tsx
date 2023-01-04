export { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import React, { PropsWithChildren, useMemo } from "react";
import { Language, StokeiConfig } from "../../interfaces";
import { theme } from "../../styles/themes";

export interface StokeiContextValues {
  readonly appId?: string;
  readonly accountId?: string;
  readonly language?: Language;
  readonly cloudflareAPIToken?: string;
}

export interface StokeiContextProps {
  readonly appId?: string;
  readonly accountId?: string;
  readonly cloudflareAPIToken?: string;
  readonly language?: Language;
  readonly config?: StokeiConfig;
}

export const StokeiContext = React.createContext({} as StokeiContextValues);

export const StokeiProvider: React.FC<
  PropsWithChildren<StokeiContextProps>
> = ({ children, config, appId, accountId, cloudflareAPIToken, language }) => {
  const themeData = useMemo(() => theme(config), []);
  const stokeiConfig = useMemo(
    () => ({ appId, accountId, cloudflareAPIToken, language }),
    [appId, accountId, cloudflareAPIToken, language]
  );
  return (
    <ChakraProvider theme={themeData}>
      <StokeiContext.Provider value={stokeiConfig}>
        {children}
      </StokeiContext.Provider>
    </ChakraProvider>
  );
};
