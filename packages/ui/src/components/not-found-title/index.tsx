import { Title, TitleProps } from "../title";

export interface NotFoundTitleProps extends TitleProps {}
export const NotFoundTitle: React.FC<NotFoundTitleProps> = ({
  children,
  ...props
}) => (
  <Title fontSize="md" {...props}>
    {children}
  </Title>
);
