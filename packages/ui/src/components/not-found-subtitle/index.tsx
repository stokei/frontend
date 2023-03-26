import { Text, TextProps } from "../text";

export interface NotFoundSubtitleProps extends TextProps {}
export const NotFoundSubtitle: React.FC<NotFoundSubtitleProps> = ({
  children,
  ...props
}) => <Text {...props}>{children}</Text>;
