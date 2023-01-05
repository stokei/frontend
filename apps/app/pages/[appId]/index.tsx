import { NextPage } from "next";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  SelectTagItem,
  SelectTagList,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Title,
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
    <Container padding="5">
      <Title marginBottom="5">App</Title>
      <Stack direction="row">
        <Card background="background.50">
          <CardBody>
            <FormControl>
              <Label>Escolha seus usuários</Label>
              <Select
                value={multiValue}
                onChooseItem={addMultiItem}
                onRemoveChooseItem={removeMultiItem}
              >
                <SelectInput
                  id="select-multi"
                  placeholder="Escolha seus usuários..."
                  rightIcon="search"
                  onChange={(e) => onChangeQuery(true, e.target.value)}
                />
                {multiValue && (
                  <SelectTagList
                    w="auto"
                    h="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {multiValue?.map((val) => (
                      <SelectTagItem key={val}>
                        <Tag paddingY="2" paddingX="3">
                          <Avatar size="xs" marginRight="2" name={val} />
                          <TagLabel>{val}</TagLabel>
                          <TagCloseButton
                            onClick={() => removeMultiItem(val)}
                          />
                        </Tag>
                      </SelectTagItem>
                    ))}
                  </SelectTagList>
                )}
                <SelectList>
                  {multiOptions?.map((option) => (
                    <SelectItem key={option} value={option}>
                      <Stack direction="row">
                        <Avatar size="xs" marginRight="2" name={option} />
                        <Text>{option}</Text>
                      </Stack>
                    </SelectItem>
                  ))}
                </SelectList>
              </Select>
            </FormControl>
          </CardBody>
        </Card>
        <Card background="background.50">
          <CardBody>
            <FormControl>
              <Label>Escolha seu usuário</Label>
              <Select
                value={singleValue}
                onChooseItem={setSingleValue}
                onRemoveChooseItem={() => setSingleValue("")}
              >
                <SelectInput
                  id="select-single"
                  placeholder="Escolha seu usuário..."
                  onChange={(e) => onChangeQuery(false, e.target.value)}
                />
                {singleValue && (
                  <SelectTagList
                    w="auto"
                    h="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <SelectTagItem>
                      <Tag>
                        <TagLabel>{singleValue}</TagLabel>
                        <TagCloseButton onClick={() => setSingleValue("")} />
                      </Tag>
                    </SelectTagItem>
                  </SelectTagList>
                )}
                <SelectList>
                  {singleOptions?.map((option) => (
                    <SelectItem key={option} value={option}>
                      <Text>{option}</Text>
                    </SelectItem>
                  ))}
                </SelectList>
              </Select>
            </FormControl>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
}
