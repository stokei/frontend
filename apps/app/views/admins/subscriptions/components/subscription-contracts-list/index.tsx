import { useTranslations } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@stokei/ui";
import { FC } from "react";
import { AppSubscriptionContractFragment } from "../../graphql/subscription-contracts.query.graphql.generated";
import { SubscriptionContractItem } from "../subscription-contract-item";

interface SubscriptionContractsListProps {
  invoices?: AppSubscriptionContractFragment[];
}

/*
  - ARRUMAR PAGINA DE LISTAGEM DE ASSINATURAS
  - FAZER A PÁGINA DE UMA ASSINATURA PARA TER CANCELAMENTO
*/

export const SubscriptionContractsList: FC<SubscriptionContractsListProps> = ({
  invoices,
}) => {
  const translate = useTranslations();
  return (
    <Card width="full" background="background.50">
      <CardBody overflow="hidden" alignItems="center">
        {!invoices?.length ? (
          <NotFound>
            <NotFoundIcon name="invoice" />
            <NotFoundSubtitle>
              {translate.formatMessage({ id: "invoicesNotFound" })}
            </NotFoundSubtitle>
          </NotFound>
        ) : (
          <Box width="full" flexDirection="column" overflow="hidden">
            <Box width="full" flexDirection="column" overflowX="auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>
                      {translate.formatMessage({ id: "product" })}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {translate.formatMessage({ id: "student" })}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {translate.formatMessage({ id: "total" })}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {translate.formatMessage({ id: "status" })}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {translate.formatMessage({ id: "creationDate" })}
                    </TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices?.map((invoice) => (
                    <SubscriptionContractItem
                      key={invoice?.id}
                      invoice={invoice}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}
      </CardBody>
    </Card>
  );
};
