import { Editor } from "@tiptap/react";
import { PropsWithChildren, useState, useCallback, useEffect } from "react";
import { useTranslations } from "../../../hooks";
import { Box } from "../../box";
import { Select } from "../../select";
import { SelectInput } from "../../select-input";
import { SelectItem } from "../../select-item";
import { SelectList } from "../../select-list";
import { Text } from "../../text";
import { Title } from "../../title";

export enum RichTextEditorSelectTextValue {
  PARAGRAPH = "paragraph",
  HEADING_1 = "heading1",
  HEADING_2 = "heading2",
  HEADING_3 = "heading3",
  HEADING_4 = "heading4",
  HEADING_5 = "heading5",
  HEADING_6 = "heading6",
}

export interface RichTextEditorSelectTextProps {
  id: string;
  editor: Editor;
}

export const RichTextEditorSelectText: React.FC<
  PropsWithChildren<RichTextEditorSelectTextProps>
> = ({ id, editor, ...props }) => {
  const translate = useTranslations();
  const [value, setValue] = useState<RichTextEditorSelectTextValue>(
    RichTextEditorSelectTextValue.PARAGRAPH
  );

  const getComponentValue = useCallback(
    (currentValue: RichTextEditorSelectTextValue) => {
      const title = translate.formatMessage({ id: "title" });
      const texts: Record<RichTextEditorSelectTextValue, any> = {
        [RichTextEditorSelectTextValue.PARAGRAPH]: (
          <Text>{translate.formatMessage({ id: "paragraph" })}</Text>
        ),
        [RichTextEditorSelectTextValue.HEADING_1]: (
          <Title fontSize="2xl">{title} 1</Title>
        ),
        [RichTextEditorSelectTextValue.HEADING_2]: (
          <Title fontSize="xl">{title} 2</Title>
        ),
        [RichTextEditorSelectTextValue.HEADING_3]: (
          <Title fontSize="lg">{title} 3</Title>
        ),
        [RichTextEditorSelectTextValue.HEADING_4]: (
          <Title fontSize="md">{title} 4</Title>
        ),
        [RichTextEditorSelectTextValue.HEADING_5]: (
          <Title fontSize="sm">{title} 5</Title>
        ),
        [RichTextEditorSelectTextValue.HEADING_6]: (
          <Title fontSize="xs">{title} 6</Title>
        ),
      };

      return texts[currentValue || RichTextEditorSelectTextValue.PARAGRAPH];
    },
    [translate]
  );

  const onChangeValue = useCallback(
    (currentValue: RichTextEditorSelectTextValue) => {
      const handleFunction = {
        [RichTextEditorSelectTextValue.PARAGRAPH]: () =>
          editor.chain().focus().setParagraph().run(),
        [RichTextEditorSelectTextValue.HEADING_1]: () =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
        [RichTextEditorSelectTextValue.HEADING_2]: () =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
        [RichTextEditorSelectTextValue.HEADING_3]: () =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
        [RichTextEditorSelectTextValue.HEADING_4]: () =>
          editor.chain().focus().toggleHeading({ level: 4 }).run(),
        [RichTextEditorSelectTextValue.HEADING_5]: () =>
          editor.chain().focus().toggleHeading({ level: 5 }).run(),
        [RichTextEditorSelectTextValue.HEADING_6]: () =>
          editor.chain().focus().toggleHeading({ level: 6 }).run(),
      };
      handleFunction?.[currentValue]?.();
      setValue(currentValue);
    },
    [editor]
  );

  useEffect(() => {
    editor.on("selectionUpdate", ({ editor: currentEditor }) => {
      if (currentEditor.isActive("paragraph")) {
        setValue(RichTextEditorSelectTextValue.PARAGRAPH);
        return;
      }
      if (currentEditor.isActive("heading", { level: 1 })) {
        setValue(RichTextEditorSelectTextValue.HEADING_1);
        return;
      }
      if (currentEditor.isActive("heading", { level: 2 })) {
        setValue(RichTextEditorSelectTextValue.HEADING_2);
        return;
      }
      if (currentEditor.isActive("heading", { level: 3 })) {
        setValue(RichTextEditorSelectTextValue.HEADING_3);
        return;
      }
      if (currentEditor.isActive("heading", { level: 4 })) {
        setValue(RichTextEditorSelectTextValue.HEADING_4);
        return;
      }
      if (currentEditor.isActive("heading", { level: 5 })) {
        setValue(RichTextEditorSelectTextValue.HEADING_5);
        return;
      }
      if (currentEditor.isActive("heading", { level: 6 })) {
        setValue(RichTextEditorSelectTextValue.HEADING_6);
        return;
      }
    });
    return () => {
      editor.off("selectionUpdate");
    };
  }, [editor]);

  if (!editor) {
    return <></>;
  }

  return (
    <Box width="40">
      <Select
        value={value}
        onChooseItem={onChangeValue}
        onRemoveChooseItem={onChangeValue}
      >
        <SelectInput
          id={`${id}-input`}
          item={(item) => <>{getComponentValue(item)}</>}
        />
        <SelectList>
          <SelectItem value={RichTextEditorSelectTextValue.PARAGRAPH}>
            <Text>{translate.formatMessage({ id: "paragraph" })}</Text>
          </SelectItem>
          <SelectItem value={RichTextEditorSelectTextValue.HEADING_1}>
            <Title fontSize="2xl">
              {translate.formatMessage({ id: "title" })} 1
            </Title>
          </SelectItem>
          <SelectItem value={RichTextEditorSelectTextValue.HEADING_2}>
            <Title fontSize="xl">
              {translate.formatMessage({ id: "title" })} 2
            </Title>
          </SelectItem>
          <SelectItem value={RichTextEditorSelectTextValue.HEADING_3}>
            <Title fontSize="lg">
              {translate.formatMessage({ id: "title" })} 3
            </Title>
          </SelectItem>
          <SelectItem value={RichTextEditorSelectTextValue.HEADING_4}>
            <Title fontSize="md">
              {translate.formatMessage({ id: "title" })} 4
            </Title>
          </SelectItem>
          <SelectItem value={RichTextEditorSelectTextValue.HEADING_5}>
            <Title fontSize="sm">
              {translate.formatMessage({ id: "title" })} 5
            </Title>
          </SelectItem>
          <SelectItem value={RichTextEditorSelectTextValue.HEADING_6}>
            <Title fontSize="xs">
              {translate.formatMessage({ id: "title" })} 6
            </Title>
          </SelectItem>
        </SelectList>
      </Select>
    </Box>
  );
};
