import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, Button, Icon, Stack, useDisclosure } from "@stokei/ui";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { CourseMaterialFragment } from "../../../materials/graphql/materials.query.graphql.generated";
import { RemoveMaterialModal } from "../remove-material-modal";

interface HeaderProps {
  material?: CourseMaterialFragment;
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

  const courseId = useMemo(
    () => router?.query?.courseId?.toString() || "",
    [router?.query?.courseId]
  );

  const onGoToMaterialsPage = useCallback(() => {
    return router.push(
      routes.app({ appId: currentApp?.id || "" }).course({ course: courseId })
        .materials.home
    );
  }, [courseId, currentApp?.id, router]);

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
