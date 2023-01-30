import { Container, ContainerProps } from "../container";

export interface FooterProps extends ContainerProps {}
export const Footer: React.FC<FooterProps> = ({ children, ...props }) => (
  <Container
    width="full"
    flexDirection={["column", "column", "row", "row"]}
    justify={["flex-start", "flex-start", "space-between", "space-between"]}
    {...props}
  >
    {children}
  </Container>
);
