import { Heading, HeadingProps } from "@chakra-ui/react";

export interface TitleProps extends HeadingProps {}

export const Title = ({ children, ...props }: TitleProps) => {
  return (
    <Heading color="heading.500" {...props}>
      {children}
    </Heading>
  );
};
