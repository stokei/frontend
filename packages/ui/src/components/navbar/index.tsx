import { Container, ContainerProps } from "../container";

export interface NavbarProps extends ContainerProps {}
export const Navbar = ({ children, ...props }: NavbarProps) => (
  <Container
    as="nav"
    width="full"
    paddingY="3"
    margin={0}
    flexDirection="row"
    justify="space-between"
    align="center"
    {...props}
  >
    {children}
  </Container>
);
