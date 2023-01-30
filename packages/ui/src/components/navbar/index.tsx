import { Container, ContainerProps } from "../container";

export interface NavbarProps extends ContainerProps {}
export const Navbar: React.FC<NavbarProps> = ({ children, ...props }) => (
  <Container
    as="nav"
    width="full"
    paddingX="5"
    paddingY="3"
    margin={0}
    borderColor="background.300"
    {...props}
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
  >
    {children}
  </Container>
);
