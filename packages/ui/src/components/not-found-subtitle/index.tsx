import { Text, TextProps } from "../text";

export interface NotFoundSubtitleProps extends TextProps {}
export const NotFoundSubtitle = ({
  children,
  ...props
}: NotFoundSubtitleProps) => <Text {...props}>{children}</Text>;
