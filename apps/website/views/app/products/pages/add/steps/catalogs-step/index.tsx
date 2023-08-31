import {
  SelectCatalogs,
  SelectCatalogValue,
} from "@/components/select-catalogs";
import { useTranslations } from "@/hooks";
import {
  Box,
  Button,
  ButtonGroup,
  Description,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC } from "react";

interface CatalogsStepProps {
  catalogs: SelectCatalogValue[];
  onChooseCatalog: (value: SelectCatalogValue) => void;
  onRemoveCatalog: (value: SelectCatalogValue) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const CatalogsStep: FC<CatalogsStepProps> = ({
  catalogs,
  onChooseCatalog,
  onRemoveCatalog,
  onNextStep,
  onPreviousStep,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Box flexDirection="column">
        <Stack direction="row" spacing="2" align="center">
          <Title fontSize="lg" lineHeight="shorter">
            {translate.formatMessage({
              id: "catalogs",
            })}
          </Title>
          <Text>
            {"- "}
            {translate.formatMessage({
              id: "optional",
            })}
          </Text>
        </Stack>
        <Description>
          {translate.formatMessage({
            id: "chooseYourCatalogsForYourProduct",
          })}
        </Description>
      </Box>

      <SelectCatalogs
        catalogs={catalogs}
        onChooseCatalog={onChooseCatalog}
        onRemoveCatalog={onRemoveCatalog}
      />
      <ButtonGroup width="full" justifyContent="space-between">
        <Button variant="ghost" onClick={onPreviousStep}>
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
