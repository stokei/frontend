import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Box,
  Button,
  Card,
  CardBody,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Stack,
  Text,
  Title,
} from "../..";
import { useTranslations } from "../../../hooks";

export interface FormUpdateOwnPasswordProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

export const FormUpdateOwnPassword: FC<FormUpdateOwnPasswordProps> = ({
  isLoading,
  onSubmit,
}) => {
  const translate = useTranslations();

  return (
    <Card background="background.50">
      <CardBody>
        <Stack spacing="4">
          <Box width="full" flexDirection="column">
            <Title size="lg" marginBottom="2" lineHeight="shorter">
              {translate.formatMessage({ id: "updatePassword" })}
            </Title>
            <Text>
              {translate.formatMessage({
                id: "youWillGetAnEmailWithAResetLink",
              })}
            </Text>
          </Box>

          <Box width="full">
            <Button
              width={["full", "full", "fit-content", "fit-content"]}
              isLoading={isLoading}
              onClick={onSubmit}
            >
              {translate.formatMessage({ id: "requestReset" })}
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
