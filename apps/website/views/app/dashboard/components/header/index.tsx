import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { useGetMembersTotalQuery } from "../../graphql/members.query.graphql.generated";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const [{ data: dataGetMembersTotal, fetching: isLoadingGetMembersTotal }] =
    useGetMembersTotalQuery({
      pause: !currentApp,
      variables: {
        page: {
          limit: 1,
        },
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  const totalMembers = useMemo(
    () => dataGetMembersTotal?.accounts?.totalCount || 0,
    [dataGetMembersTotal]
  );

  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      <Card background="background.50">
        <CardBody>
          <Stat>
            <StatLabel>{translate.formatMessage({ id: "members" })}</StatLabel>
            {!isLoadingGetMembersTotal ? (
              <StatNumber>{totalMembers}</StatNumber>
            ) : (
              <Text>{translate.formatMessage({ id: "loading" })}</Text>
            )}
          </Stat>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};
