import { PropsWithChildren, CSSProperties } from "react";

import { Button as ReactEmailButton } from "@react-email/components";

interface ButtonProps {
  href: string;
  align?: "center" | "left" | "right";
  width?: CSSProperties["width"];
  color?: CSSProperties["color"];
}

export const Button = ({
  href,
  children,
  align = "center",
  width = "auto",
  color = "#24615e",
}: PropsWithChildren<ButtonProps>) => {
  return (
    <div
      style={{
        width: "fit-content",
        marginLeft: align === "center" || align === "left" ? "auto" : "0",
        marginRight: align === "center" || align === "right" ? "auto" : "0",
      }}
    >
      <ReactEmailButton
        href={href}
        color={color}
        style={{
          width,
          boxSizing: "border-box",
          borderRadius: "100px",
          fontSize: "14px",
          textAlign: "center",
          fontWeight: "600",
          background: color,
          color: "#fff",
          padding: "12px 20px",
        }}
      >
        {children}
      </ReactEmailButton>
    </div>
  );
};
