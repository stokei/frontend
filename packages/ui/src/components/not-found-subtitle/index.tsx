import { Text, TextProps } from "../text";

export interface NotFoundSubtitleProps extends TextProps { }
export const NotFoundSubtitle = ({
  children,
  ...props
}: NotFoundSubtitleProps) => <Text textAlign="center" {...props}>{children}</Text>;
