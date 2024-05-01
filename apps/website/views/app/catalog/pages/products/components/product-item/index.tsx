import defaultNoImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { getProductAvatarURL } from "@/utils/get-product-avatar-url";
import {
  ButtonGroup,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@stokei/ui";

import { AdminCatalogPageCatalogItemFragment } from "../../graphql/catalog-items.query.graphql.generated";
import { RemoveCatalogItemModal } from "../remove-catalog-item-modal";

interface ProductItemProps {
  catalogItem?: AdminCatalogPageCatalogItemFragment;
  onCatalogItemRemoved: (
    catalogItem: AdminCatalogPageCatalogItemFragment
  ) => void;
}

export const ProductItem = ({
  catalogItem,
  onCatalogItemRemoved,
}: ProductItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const {
    isOpen: isOpenRemoveCatalogItemModal,
    onClose: onCloseRemoveCatalogItemModal,
    onOpen: onOpenRemoveCatalogItemModal,
  } = useDisclosure();

  return (
    <Stack
      key={catalogItem?.id}
      direction={["column", "column", "row", "row"]}
      spacing="5"
      justify="space-between"
    >
      <RemoveCatalogItemModal
        isOpenModal={isOpenRemoveCatalogItemModal}
        onCloseModal={onCloseRemoveCatalogItemModal}
        catalogItem={catalogItem}
        onCatalogItemRemoved={onCatalogItemRemoved}
      />
      <Link
        href={
          websiteRoutes
            .app({ appId: currentApp?.id })
            .product({ product: catalogItem?.product.id || "" }).home
        }
        target="_blank"
      >
        <Stack width="fit-content" direction="row" spacing="4" align="center">
          <Image
            width="10"
            rounded="sm"
            src={getProductAvatarURL({
              productParent: catalogItem?.product?.parent,
              defaultAvatar: catalogItem?.product?.avatar?.file.url || "",
            })}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "product" })}
          />
          <Stack direction="column" spacing="4">
            <Text fontWeight="bold">{catalogItem?.product?.name}</Text>
          </Stack>
        </Stack>
      </Link>

      <ButtonGroup width="fit-content">
        <IconButton
          name="trash"
          onClick={onOpenRemoveCatalogItemModal}
          variant="ghost"
        />
      </ButtonGroup>
    </Stack>
  );
};
