import { PropsWithChildren, CSSProperties } from "react";

import { Text as ReactEmailText } from "@react-email/components";

interface TextProps {
  color?: "gray" | "black";
  margin?: CSSProperties["margin"];
  textAlign?: CSSProperties["textAlign"];
  fontWeight?: CSSProperties["fontWeight"];
  textDecoration?: CSSProperties["textDecoration"];
}

export const Text = ({
  children,
  color = "black",
  margin,
  textAlign,
  fontWeight,
  textDecoration,
}: PropsWithChildren<TextProps>) => {
  return (
    <ReactEmailText
      style={{
        color: color === "gray" ? "#666" : "#1A202C",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
        fontSize: "14px",
        margin: margin || "4px 0",
        textAlign,
        fontWeight,
        textDecoration,
        boxSizing: "border-box",
      }}
    >
      {children}
    </ReactEmailText>
  );
};
