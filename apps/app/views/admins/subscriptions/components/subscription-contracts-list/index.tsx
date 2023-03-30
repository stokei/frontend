import { useTranslations } from "@/hooks";
import {
  Box,
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
  subscriptionContracts?: AppSubscriptionContractFragment[];
}

export const SubscriptionContractsList: FC<SubscriptionContractsListProps> = ({
  subscriptionContracts,
}) => {
  const translate = useTranslations();
  return (
    <>
      {!subscriptionContracts?.length ? (
        <NotFound>
          <NotFoundIcon name="subscription" />
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "subscriptionContractsNotFound" })}
          </NotFoundSubtitle>
        </NotFound>
      ) : (
        <Box width="full" flexDirection="column" overflow="hidden">
          <Box width="full" flexDirection="column" overflowX="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "student" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "product" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "status" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "period" })}
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionContracts?.map((subscriptionContract) => (
                  <SubscriptionContractItem
                    key={subscriptionContract?.id}
                    subscriptionContract={subscriptionContract}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
};
