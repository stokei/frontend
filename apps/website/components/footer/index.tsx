import { FooterProps as UIFooterProps } from "@stokei/ui";
import { SimpleFooter } from "./simple";

export enum FooterVariant {
  SIMPLE = "SIMPLE",
}

export interface FooterProps extends UIFooterProps {
  readonly variant?: FooterVariant;
}
export const Footer = ({ variant, ...props }: FooterProps) => {
  return <SimpleFooter {...props} />;
};
