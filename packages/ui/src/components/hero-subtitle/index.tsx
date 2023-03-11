import { Text, TextProps } from "../text";

export interface HeroSubtitleProps extends TextProps {}
export const HeroSubtitle: React.FC<HeroSubtitleProps> = ({
  children,
  ...props
}) => (
  <Text maxWidth={["full", "full", "60%", "60%"]} {...props}>
    {children}
  </Text>
);
