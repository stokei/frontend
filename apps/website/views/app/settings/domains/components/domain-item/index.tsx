import { useCurrentApp, useTranslations } from "@/hooks";
import { convertEnumValueToCamelCase } from "@/utils";
import { getDomainStatusColor } from "@/utils/get-domain-status-color";
import {
  Badge,
  ButtonGroup,
  Card,
  CardBody,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { memo } from "react";
import { AppDomainFragment } from "../../graphql/domains.query.graphql.generated";
import { RemoveDomainModal } from "../remove-domain-modal";

interface DomainItemProps {
  domain: AppDomainFragment;
  onDomainRemoved: (domain: AppDomainFragment) => void;
}

export const DomainItem = memo(
  ({ domain, onDomainRemoved }: DomainItemProps) => {
    const { currentApp } = useCurrentApp();
    const translate = useTranslations();
    const {
      isOpen: isOpenRemoveDomainModal,
      onClose: onCloseRemoveDomainModal,
      onOpen: onOpenRemoveDomainModal,
    } = useDisclosure();

    const isFreeDomain = !!domain.free;
    const isDefaultDomain = domain.id === currentApp?.defaultDomain?.id;
    const canRemoveDomain = !isDefaultDomain && !isFreeDomain;

    return (
      <Card key={domain.id} background="background.50">
        <CardBody>
          <RemoveDomainModal
            isOpenModal={isOpenRemoveDomainModal}
            onCloseModal={onCloseRemoveDomainModal}
            domain={domain}
            onSuccessRemoveDomain={(domainRemoved) =>
              onDomainRemoved(domainRemoved)
            }
          />
          <Stack
            direction={["column", "column", "row", "row"]}
            spacing="5"
            align={["flex-start", "flex-start", "center", "center"]}
            justify={[
              "space-between",
              "space-between",
              "flex-start",
              "flex-start",
            ]}
          >
            <Stack direction="column" spacing="2">
              <Link
                width="fit-content"
                href={domain.url || ""}
                fontWeight="bold"
                target="_blank"
              >
                {domain.name}
              </Link>

              {isFreeDomain ? (
                <Badge colorScheme="yellow">
                  {translate.formatMessage({
                    id: "free",
                  })}
                </Badge>
              ) : undefined}
              {isDefaultDomain ? (
                <Badge colorScheme="gray">
                  {translate.formatMessage({
                    id: "default",
                  })}
                </Badge>
              ) : undefined}
            </Stack>

            {canRemoveDomain && (
              <ButtonGroup variant="ghost">
                <IconButton name="trash" onClick={onOpenRemoveDomainModal} />
              </ButtonGroup>
            )}

            <Badge colorScheme={getDomainStatusColor(domain.status)}>
              {translate.formatMessage({
                id: convertEnumValueToCamelCase(domain.status) as any,
              })}
            </Badge>
          </Stack>
        </CardBody>
      </Card>
    );
  }
);

DomainItem.displayName = "DomainItem";
