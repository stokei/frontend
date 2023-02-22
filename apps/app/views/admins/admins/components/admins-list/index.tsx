import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { AppAdminFragment } from "../../graphql/admin.fragment.graphql.generated";
import { AdminItem } from "../admin-item";

interface AdminsListProps {
  appAdmins?: AppAdminFragment[];
}

export const AdminsList: FC<AdminsListProps> = ({ appAdmins }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {appAdmins?.map((appAdmin) => (
        <AdminItem key={appAdmin?.id} appAdmin={appAdmin} />
      ))}
    </SimpleGrid>
  );
};
