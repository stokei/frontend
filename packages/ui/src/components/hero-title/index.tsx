import { Title, TitleProps } from "../title";

export interface HeroTitleProps extends TitleProps {}
export const HeroTitle = ({ children, ...props }: HeroTitleProps) => (
  <Title
    maxWidth={["full", "full", "70%", "70%"]}
    fontSize={["3xl", "3xl", "4xl", "5xl"]}
    fontWeight="semibold"
    lineHeight="shorter"
    {...props}
  >
    {children}
  </Title>
);
