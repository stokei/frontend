import { SelectMembers } from "@/components/select-members";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack, Title } from "@stokei/ui";
import { FC } from "react";

interface StudentStepProps {
  student?: AppAccountFragment;
  onChooseStudent: (value?: AppAccountFragment) => void;
  onNextStep: () => void;
}

export const StudentStep: FC<StudentStepProps> = ({
  student,
  onNextStep,
  onChooseStudent,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="lg">
        {translate.formatMessage({
          id: "chooseType",
        })}
      </Title>

      <SelectMembers
        hasCurrentAccount={false}
        currentMembers={student ? [student] : []}
        onChooseCurrentMember={onChooseStudent}
        onRemoveChooseCurrentMember={() => onChooseStudent(undefined)}
      />

      <ButtonGroup width="full" justifyContent="flex-end" isDisabled={!student}>
        <Button onClick={onNextStep} isDisabled={!student}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
