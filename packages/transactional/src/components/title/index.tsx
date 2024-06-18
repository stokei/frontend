import { PropsWithChildren, CSSProperties } from "react";

import { Heading as ReactEmailTitle } from "@react-email/components";

interface TitleProps {
  level?: "h1" | "h2" | "h3" | "h4" | "h5";
  color?: CSSProperties["color"];
  textAlign?: CSSProperties["textAlign"];
}

export const Title = ({
  children,
  level,
  textAlign,
  color = "#143937",
}: PropsWithChildren<TitleProps>) => {
  return (
    <ReactEmailTitle
      as={level}
      style={{
        color: color || "#143937",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
        margin: "0",
        textAlign,
        boxSizing: "border-box",
      }}
    >
      {children}
    </ReactEmailTitle>
  );
};
