import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { AppMemberFragment } from "../../graphql/member.fragment.graphql.generated";
import { MemberItem } from "../member-item";

interface MembersListProps {
  appMembers?: AppMemberFragment[];
}

export const MembersList: FC<MembersListProps> = ({ appMembers }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {appMembers?.map((appMember) => (
        <MemberItem key={appMember?.id} appMember={appMember} />
      ))}
    </SimpleGrid>
  );
};
