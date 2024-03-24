import { DetailedHTMLProps, IframeHTMLAttributes } from "react";
import { Box, BoxProps } from "../box";

export type IframeProps = BoxProps &
  DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;

export const Iframe = ({ ...props }: IframeProps) => (
  <Box as="iframe" loading="lazy" {...props} />
);
