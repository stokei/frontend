import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PropsWithChildren, useState } from "react";
import { Box } from "../box";
import { Skeleton } from "../skeleton";
import { RichTextEditorMenu } from "./menu";

export interface RichTextEditorProps {
  id: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const RichTextEditor: React.FC<
  PropsWithChildren<RichTextEditorProps>
> = ({ id, onChange, defaultValue, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const editor = useEditor({
    extensions: [StarterKit],
    onCreate: () => setIsLoading(false),
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
    content: defaultValue,
  });

  const editorContentProps = {
    editor,
  };

  return (
    <Box width="full" flexDirection="column" borderWidth="thin" rounded="md">
      {isLoading ? (
        <Skeleton height="16" />
      ) : (
        <>
          {editor && <RichTextEditorMenu id={id} editor={editor} />}
          <Box
            id={id}
            as={EditorContent}
            width="full"
            flexDirection="column"
            sx={{
              ">*": {
                padding: "3",
              },
              ">*:focus": {
                borderColor: "primary.500",
                outlineColor: "primary.500",
              },
            }}
            {...editorContentProps}
          />
        </>
      )}
    </Box>
  );
};
