import { Heading, HeadingProps } from "@chakra-ui/react";

export interface TitleProps extends HeadingProps {}

export const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return (
    <Heading color="heading.500" {...props}>
      {children}
    </Heading>
  );
};
