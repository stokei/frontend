import { Editor } from "@tiptap/react";
import { PropsWithChildren } from "react";
import { ButtonGroup } from "../../../button-group";
import { IconButton } from "../../../icon-button";
import { Stack } from "../../../stack";
import { RichTextEditorSelectText } from "../select-text";

export interface RichTextEditorMenuProps {
  id: string;
  editor: Editor | null;
}

export const RichTextEditorMenu = ({
  id,
  editor,
}: PropsWithChildren<RichTextEditorMenuProps>) => {
  if (!editor) {
    return <></>;
  }

  const addIframe = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setIframe({ src: url }).run();
    }
  };

  return (
    <Stack
      width="full"
      direction="row"
      spacing="1"
      paddingX="2"
      borderBottomWidth="thin"
      sx={{
        "&>*": {
          paddingY: "1",
        },
        "&>* + *": {
          borderLeftWidth: "thin",
          paddingLeft: "2",
          marginLeft: "2",
        }
      }}
    >
      <RichTextEditorSelectText id={id} editor={editor} />
      <ButtonGroup spacing="1" variant="ghost">
        <IconButton
          name="undo"
          onClick={() => editor.chain().focus().undo().run()}
        />
        <IconButton
          name="redo"
          onClick={() => editor.chain().focus().redo().run()}
        />
      </ButtonGroup>
      <ButtonGroup spacing="1" variant="ghost">
        <IconButton
          name="video"
          onClick={addIframe}
        />
      </ButtonGroup>
      <ButtonGroup spacing="1" variant="ghost">
        <IconButton
          name="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "solid" : "ghost"}
        />
        <IconButton
          name="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "solid" : "ghost"}
        />
      </ButtonGroup>
    </Stack>
  );
};
