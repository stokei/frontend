import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { Box, Button, Icon, Stack, useDisclosure } from "@stokei/ui";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AppMaterialFragment } from "../../../home/graphql/materials.query.graphql.generated";
import { RemoveMaterialModal } from "../remove-material-modal";

interface HeaderProps {
  material?: AppMaterialFragment;
}

export const Header = ({ material }: HeaderProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const {
    isOpen: isOpenRemoveMaterialModal,
    onOpen: onOpenRemoveMaterialModal,
    onClose: onCloseRemoveMaterialModal,
  } = useDisclosure();

  const onGoToMaterialsPage = useCallback(() => {
    return router.push(
      websiteRoutes.app({ appId: currentApp?.id || "" }).materials.home
    );
  }, [currentApp?.id, router]);

  return (
    <Stack
      justify={["flex-start", "flex-start", "space-between", "space-between"]}
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <RemoveMaterialModal
        material={material}
        isOpenModal={isOpenRemoveMaterialModal}
        onCloseModal={onCloseRemoveMaterialModal}
      />
      <Box>
        <Button
          size="sm"
          variant="link"
          leftIcon={<Icon name="back" />}
          onClick={onGoToMaterialsPage}
        >
          {translate.formatMessage({ id: "back" })}
        </Button>
      </Box>
      <Button
        variant="link"
        colorScheme="red"
        onClick={onOpenRemoveMaterialModal}
      >
        {translate.formatMessage({ id: "removeMaterial" })}
      </Button>
    </Stack>
  );
};
