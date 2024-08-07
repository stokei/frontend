import { SelectMembers } from "@/components/select-members";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack, Title } from "@stokei/ui";

interface StudentStepProps {
  student?: AppAccountFragment;
  onChooseStudent: (value?: AppAccountFragment) => void;
  onNextStep: () => void;
}

export const StudentStep = ({
  student,
  onNextStep,
  onChooseStudent,
}: StudentStepProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="lg">
        {translate.formatMessage({
          id: "chooseStudent",
        })}
      </Title>

      <SelectMembers
        hasCurrentAccount={false}
        currentMembers={student ? [student] : []}
        onChange={onChooseStudent}
      />

      <ButtonGroup width="full" justifyContent="flex-end" isDisabled={!student}>
        <Button onClick={onNextStep} isDisabled={!student}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
