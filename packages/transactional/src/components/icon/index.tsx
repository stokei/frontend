import React from "react";
import { CheckIcon, ErrorIcon } from "./components";

export const icons = {
  check: CheckIcon,
  error: ErrorIcon,
};

export type IconName = keyof typeof icons;

export interface IconProps {
  readonly name: IconName;
  readonly size?: string;
  readonly color?: string;
}

export const Icon: React.FC<IconProps> = ({
  size = "64px",
  name,
  ...props
}) => {
  const IconComp = icons[name];
  return (
    <div
      style={{
        width: "fit-content",
        margin: "auto",
      }}
    >
      <IconComp {...props} fontSize={size} />
    </div>
  );
};
