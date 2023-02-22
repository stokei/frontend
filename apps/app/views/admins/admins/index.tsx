import { useCurrentApp } from "@/hooks";
import { AdminLayout } from "@/views/admins/layout";
import { Box, Container } from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { AdminsList } from "./components/admins-list";
import { Navbar } from "./components/navbar";
import { AppAdminFragment } from "./graphql/admin.fragment.graphql.generated";
import { useGetAppAdminsQuery } from "./graphql/admins.query.graphql.generated";
import { Loading } from "./loading";

interface AdminsPageProps {}

export const AdminsPage: FC<AdminsPageProps> = () => {
  const [admins, setAdmins] = useState<AppAdminFragment[]>([]);

  const { currentApp } = useCurrentApp();

  const [{ data: dataGetAdmins, fetching: isLoading }] = useGetAppAdminsQuery({
    pause: !currentApp,
    variables: {
      where: {
        AND: {
          app: {
            equals: currentApp?.id,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (!!dataGetAdmins?.appAdmins?.items?.length) {
      setAdmins(dataGetAdmins?.appAdmins?.items);
    }
  }, [dataGetAdmins]);

  return (
    <AdminLayout>
      <Navbar />
      <Box width="full" flexDirection="row">
        {isLoading ? (
          <Loading />
        ) : (
          <Container paddingY="5">
            <AdminsList appAdmins={admins} />
          </Container>
        )}
      </Box>
    </AdminLayout>
  );
};
