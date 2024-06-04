import { Editor } from "@tiptap/react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useTranslations } from "../../../hooks";
import { Box } from "../../box";
import {
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions
} from "../../selects";
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

export const RichTextEditorSelectText = ({
  id,
  editor,
  ...props
}: PropsWithChildren<RichTextEditorSelectTextProps>) => {
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
      <SingleSelect
        id={id}
        value={value}
        onChange={onChangeValue}
      >
        <SingleSelectButton
          placeholder={translate.formatMessage({ id: "font" })}
          item={(item) => <>{getComponentValue(item)}</>}
        />
        <SingleSelectCombobox>
          <SingleSelectOptions>
            <SingleSelectOption value={RichTextEditorSelectTextValue.PARAGRAPH}>
              <Text>{translate.formatMessage({ id: "paragraph" })}</Text>
            </SingleSelectOption>
            <SingleSelectOption value={RichTextEditorSelectTextValue.HEADING_1}>
              <Title fontSize="2xl">
                {translate.formatMessage({ id: "title" })} 1
              </Title>
            </SingleSelectOption>
            <SingleSelectOption value={RichTextEditorSelectTextValue.HEADING_2}>
              <Title fontSize="xl">
                {translate.formatMessage({ id: "title" })} 2
              </Title>
            </SingleSelectOption>
            <SingleSelectOption value={RichTextEditorSelectTextValue.HEADING_3}>
              <Title fontSize="lg">
                {translate.formatMessage({ id: "title" })} 3
              </Title>
            </SingleSelectOption>
            <SingleSelectOption value={RichTextEditorSelectTextValue.HEADING_4}>
              <Title fontSize="md">
                {translate.formatMessage({ id: "title" })} 4
              </Title>
            </SingleSelectOption>
            <SingleSelectOption value={RichTextEditorSelectTextValue.HEADING_5}>
              <Title fontSize="sm">
                {translate.formatMessage({ id: "title" })} 5
              </Title>
            </SingleSelectOption>
            <SingleSelectOption value={RichTextEditorSelectTextValue.HEADING_6}>
              <Title fontSize="xs">
                {translate.formatMessage({ id: "title" })} 6
              </Title>
            </SingleSelectOption>
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </Box>
  );
};
