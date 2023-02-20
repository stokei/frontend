import { Text, TextProps } from "../text";

export interface NotFoundSubtitleProps extends TextProps {}
export const NotFoundSubtitle: React.FC<NotFoundSubtitleProps> = ({
  children,
  ...props
}) => (
  <Text paddingBottom="5" {...props}>
    {children}
  </Text>
);
