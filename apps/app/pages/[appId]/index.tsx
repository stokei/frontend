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
import { useMemo, useState } from "react";

const defaultOptions = Array.from(
  { length: 15 },
  (_, value) => `Valor ${value}`
);
export default function Home() {
  const [singleQuery, setSingleQuery] = useState<string>("");
  const [multiQuery, setMultiQuery] = useState<string>("");

  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const addMultiItem = (value: string) => {
    setMultiValue((oldValues) => {
      if (oldValues.includes(value)) {
        return oldValues;
      }
      return [...oldValues, value];
    });
    setMultiQuery("");
  };
  const removeMultiItem = (value: string) => {
    setMultiValue((oldValues) => {
      if (!oldValues.includes(value)) {
        return oldValues;
      }
      return oldValues.filter((filteredValue) => filteredValue !== value);
    });
    setMultiQuery("");
  };

  const multiOptions = useMemo(() => {
    if (!multiQuery) {
      return defaultOptions;
    }
    return defaultOptions.filter((option) =>
      option.match(new RegExp(multiQuery, "i"))
    );
  }, [multiQuery]);

  const singleOptions = useMemo(() => {
    if (!singleQuery) {
      return defaultOptions;
    }
    return defaultOptions.filter((option) =>
      option.match(new RegExp(singleQuery, "i"))
    );
  }, [singleQuery]);

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
                  value={multiQuery}
                  onChange={(e) => setMultiQuery(e.target.value)}
                >
                  {multiValue && (
                    <SelectTagList>
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
                </SelectInput>

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
                {singleValue ? (
                  <SelectTagList>
                    <SelectTagItem>
                      <Tag>
                        <TagLabel>{singleValue}</TagLabel>
                        <TagCloseButton onClick={() => setSingleValue("")} />
                      </Tag>
                    </SelectTagItem>
                  </SelectTagList>
                ) : (
                  <SelectInput
                    id="select-single"
                    placeholder="Escolha seu usuário..."
                    value={singleQuery}
                    onChange={(e) => setSingleQuery(e.target.value)}
                  />
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
