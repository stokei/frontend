import { PropsWithChildren } from "react";

import { Tailwind } from "@react-email/tailwind";

interface TailwindProviderProps {}

export const TailwindProvider = ({
  children,
}: PropsWithChildren<TailwindProviderProps>) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      {children}
    </Tailwind>
  );
};
