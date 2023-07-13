import { DomainDNS, SubdomainDNS } from "@/constants/dns";
import { STOKEI_CONTACT_EMAIL } from "@/constants/stokei-info";
import { useTranslations } from "@/hooks";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@stokei/ui";
import { FC } from "react";

interface HowConfigureDomainModalProps {
  isOpenModal?: boolean;
  onCloseModal: () => void;
}

export const HowConfigureDomainModal: FC<HowConfigureDomainModalProps> = ({
  isOpenModal,
  onCloseModal,
}) => {
  const translate = useTranslations();

  return (
    <Modal isOpen={!!isOpenModal} onClose={onCloseModal}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "howConfigureADomain" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="5">
          <Text>
            {translate.formatMessage({
              id: "toAddTheDomainToYourApplicationYouNeedToAddTheFollowingDataToTheDomainsDns",
            })}
          </Text>
          <Title fontSize="md">
            {translate.formatMessage({
              id: "domain",
            })}
          </Title>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  {translate.formatMessage({
                    id: "type",
                  })}
                </TableHeaderCell>
                <TableHeaderCell>
                  {translate.formatMessage({
                    id: "value",
                  })}
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{DomainDNS.type}</TableCell>
                <TableCell>{DomainDNS.value}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Title fontSize="md">
            {translate.formatMessage({
              id: "subdomain",
            })}
          </Title>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  {translate.formatMessage({
                    id: "type",
                  })}
                </TableHeaderCell>
                <TableHeaderCell>
                  {translate.formatMessage({
                    id: "value",
                  })}
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{SubdomainDNS.type}</TableCell>
                <TableCell>{SubdomainDNS.value}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Text>
            {translate.formatMessage(
              {
                id: "dontKnowHowToDoThisContactSupportViaEmail",
              },
              {
                email: STOKEI_CONTACT_EMAIL,
              }
            )}
          </Text>
        </Stack>
      </ModalBody>
    </Modal>
  );
};
