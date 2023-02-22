import { useCurrentApp } from "@/hooks";
import { useGetAppInstructorsQuery } from "./graphql/instructors.query.graphql.generated";
import { AdminLayout } from "@/views/admins/layout";
import { Box, Container } from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { InstructorsList } from "./components/instructors-list";
import { Navbar } from "./components/navbar";
import { AppInstructorFragment } from "./graphql/instructor.fragment.graphql.generated";
import { Loading } from "./loading";

interface InstructorsPageProps {}

export const InstructorsPage: FC<InstructorsPageProps> = () => {
  const [instructors, setInstructors] = useState<AppInstructorFragment[]>([]);

  const { currentApp } = useCurrentApp();

  const [{ data: dataGetInstructors, fetching: isLoading }] =
    useGetAppInstructorsQuery({
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
    if (!!dataGetInstructors?.appInstructors?.items?.length) {
      setInstructors(dataGetInstructors?.appInstructors?.items);
    }
  }, [dataGetInstructors]);

  return (
    <AdminLayout>
      <Navbar />
      <Box width="full" flexDirection="row">
        {isLoading ? (
          <Loading />
        ) : (
          <Container paddingY="5">
            <InstructorsList appInstructors={instructors} />
          </Container>
        )}
      </Box>
    </AdminLayout>
  );
};
