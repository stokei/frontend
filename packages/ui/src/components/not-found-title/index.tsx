import { Title, TitleProps } from "../title";

export interface NotFoundTitleProps extends TitleProps { }
export const NotFoundTitle = ({ children, ...props }: NotFoundTitleProps) => (
  <Title fontSize="md" textAlign="center" {...props}>
    {children}
  </Title>
);
