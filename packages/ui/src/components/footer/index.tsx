import { Container, ContainerProps } from "../container";

export interface FooterProps extends ContainerProps {}
export const Footer = ({ children, ...props }: FooterProps) => (
  <Container
    width="full"
    flexDirection={["column", "column", "row", "row"]}
    justify={["flex-start", "flex-start", "space-between", "space-between"]}
    {...props}
  >
    {children}
  </Container>
);
