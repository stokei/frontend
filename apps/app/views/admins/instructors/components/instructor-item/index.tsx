import { Avatar, Card, CardHeader, Stack, Text, Title } from "@stokei/ui";
import { FC, memo } from "react";

import { useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { AppInstructorFragment } from "../../graphql/instructor.fragment.graphql.generated";

export interface InstructorItemProps {
  readonly appInstructor?: AppInstructorFragment;
}

export const InstructorItem: FC<InstructorItemProps> = memo(
  ({ appInstructor }) => {
    const router = useRouter();
    const translate = useTranslations();

    return (
      <Card background="background.50" overflow="hidden">
        <CardHeader>
          <Stack direction="column" spacing="5" align="center" justify="center">
            <Avatar
              size="lg"
              name={appInstructor?.instructor?.fullname}
              src={appInstructor?.instructor?.avatar?.file?.url || ""}
            />
            <Stack width="auto" flex="1" direction="column" spacing="1">
              <Title size="md" textAlign="center">
                {appInstructor?.instructor?.fullname}
              </Title>
              <Text justifyContent="center">
                {appInstructor?.instructor?.email}
              </Text>
            </Stack>
          </Stack>
        </CardHeader>
      </Card>
    );
  }
);
