import { useMemo } from "react";
import reactHtmlParser from "react-html-parser";
import { Box, BoxProps } from "../box";

export interface MarkdownProps extends BoxProps {
  text: string;
}

export const Markdown = ({ text, ...props }: MarkdownProps) => {
  const content = useMemo(() => reactHtmlParser(text), [text]);
  return (
    <Box flexDirection="column" {...props}>
      {content}
    </Box>
  );
};
