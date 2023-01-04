import { useRef, useState } from "react";
import { Select } from ".";
import { decorators } from "../../storybook/decorators";
import { SelectInput } from "../select-input";
import { SelectList } from "../select-list";
import { SelectItem } from "../select-item";
import { Stack } from "../stack";
import { Tag } from "../tag";
import { TagLabel } from "../tag-label";
import { Text } from "../text";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/SelectTeste",
  component: Select,
  decorators,
};

export const Primary = ({ ...args }) => {
  const [options, setItems] = useState<string[]>([]);
  const ref = useRef();
  return (
    <Stack direction="column">
      <Select
        value={options}
        onChooseItem={(option) =>
          setItems((currentItems) => [...currentItems, option])
        }
        onRemoveChooseItem={(option) =>
          setItems((currentItems) => [...currentItems, option])
        }
      >
        <SelectInput id="teste" />
        <SelectList containerRef={ref}>
          <SelectItem value="1">
            <Text>Value 1</Text>
          </SelectItem>
          <SelectItem value="2">
            <Text>Value 2</Text>
          </SelectItem>
          <SelectItem value="3">
            <Text>Value 3</Text>
          </SelectItem>
          <SelectItem value="4">
            <Text>Value 4</Text>
          </SelectItem>
          <SelectItem value="5">
            <Text>Value 5</Text>
          </SelectItem>
          <SelectItem value="6">
            <Text>Value 6</Text>
          </SelectItem>
        </SelectList>
      </Select>
      <Stack>
        {options?.map((option) => (
          <Tag>
            <TagLabel>{option}</TagLabel>
          </Tag>
        ))}
      </Stack>
    </Stack>
  );
};
