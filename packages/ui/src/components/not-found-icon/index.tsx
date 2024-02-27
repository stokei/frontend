import { Icon, IconProps } from "../icon";

export interface NotFoundIconProps extends IconProps {}
export const NotFoundIcon = ({ children, ...props }: NotFoundIconProps) => (
  <Icon fontSize="6xl" paddingBottom="2" color="primary.500" {...props}>
    {children}
  </Icon>
);
