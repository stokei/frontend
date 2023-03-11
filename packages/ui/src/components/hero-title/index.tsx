import { Title, TitleProps } from "../title";

export interface HeroTitleProps extends TitleProps {}
export const HeroTitle: React.FC<HeroTitleProps> = ({ children, ...props }) => (
  <Title
    maxWidth={["full", "full", "50%", "50%"]}
    fontSize={["3xl", "3xl", "4xl", "5xl"]}
    fontWeight="semibold"
    lineHeight="shorter"
    {...props}
  >
    {children}
  </Title>
);
