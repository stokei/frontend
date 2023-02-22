import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { AppInstructorFragment } from "../../graphql/instructor.fragment.graphql.generated";
import { InstructorItem } from "../instructor-item";

interface InstructorsListProps {
  appInstructors?: AppInstructorFragment[];
}

export const InstructorsList: FC<InstructorsListProps> = ({
  appInstructors,
}) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {appInstructors?.map((appInstructor) => (
        <InstructorItem key={appInstructor?.id} appInstructor={appInstructor} />
      ))}
    </SimpleGrid>
  );
};
