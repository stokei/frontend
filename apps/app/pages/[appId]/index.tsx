import { NextPage } from "next";
import {
  Button,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  Text,
} from "@stokei/ui";
import { useState } from "react";

const defaultOptions = ["Valor 1", "Valor 2", "Valor 3"];
export default function Home() {
  const [singleOptions, setSingleOptions] = useState<string[]>(defaultOptions);
  const [multiOptions, setMultiOptions] = useState<string[]>(defaultOptions);

  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const addMultiItem = (value: string) => {
    setMultiValue((oldValues) => {
      if (oldValues.includes(value)) {
        return oldValues;
      }
      return [...oldValues, value];
    });
  };
  const removeMultiItem = (value: string) => {
    setMultiValue((oldValues) => {
      if (!oldValues.includes(value)) {
        return oldValues;
      }
      return oldValues.filter((filteredValue) => filteredValue !== value);
    });
  };

  const onChangeQuery = (isMulti: boolean, value: string) => {
    const set = isMulti ? setMultiOptions : setSingleOptions;
    set((oldOptions) => {
      if (!value) {
        return defaultOptions;
      }
      return oldOptions.filter((option) =>
        option.match(new RegExp(value, "i"))
      );
    });
  };

  return (
    <div>
      <h1>App</h1>
      <Select
        value={multiValue}
        onChooseItem={addMultiItem}
        onRemoveChooseItem={removeMultiItem}
      >
        <SelectInput
          id="select-multi"
          onChange={(e) => onChangeQuery(true, e.target.value)}
        />
        <SelectList>
          {multiOptions?.map((option) => (
            <SelectItem value={option}>
              <Text>{option}</Text>
            </SelectItem>
          ))}
        </SelectList>
      </Select>
      <Select
        value={singleValue}
        onChooseItem={setSingleValue}
        onRemoveChooseItem={() => setSingleValue("")}
      >
        <SelectInput
          id="select-single"
          onChange={(e) => onChangeQuery(false, e.target.value)}
        />
        <SelectList>
          {singleOptions?.map((option) => (
            <SelectItem value={option}>
              <Text>{option}</Text>
            </SelectItem>
          ))}
        </SelectList>
      </Select>
    </div>
  );
}
