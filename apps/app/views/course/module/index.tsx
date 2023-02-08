import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Box,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC, memo } from "react";

import { CoursePageModuleFragment } from "./module.fragment.graphql.generated";

export interface ModuleProps {
  readonly module: CoursePageModuleFragment;
}

export const Module: FC<ModuleProps> = memo(({ module }) => {
  // VERIFICAR PORQUE QUANDO CHAMA O video.file DA ERRO

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionLabel>{module.name}</AccordionLabel>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        {module?.videos?.items?.map((video) => (
          <Stack>
            <Text>{video.name}</Text>
          </Stack>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
});
