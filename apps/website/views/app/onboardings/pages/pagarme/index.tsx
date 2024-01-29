import { Bank, SelectBank } from "@/components/select-bank";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  PagarmeAccountType,
  PagarmeBankAccountType,
} from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  DocumentType,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputDocument,
  InputGroup,
  Label,
  Radio,
  RadioGroup,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { getOnlyNumbers } from "@stokei/utils";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navbar } from "./components/navbar";
import { Section } from "./components/section";
import { SectionContent } from "./components/section-content";
import { SectionInformation } from "./components/section-information";
import { useCreateAppPagarmeAccountMutation } from "./graphql/create-app-pagarme-account.mutation.graphql.generated";

interface OnboardingPagarmePageProps {}

export const OnboardingPagarmePage: FC<OnboardingPagarmePageProps> = () => {
  const [documentType, setDocumentType] = useState<DocumentType>(
    DocumentType.Cpf
  );
  const [bankAccountType, setBankAccountType] =
    useState<PagarmeBankAccountType>(PagarmeBankAccountType.Checking);
  const [bank, setBank] = useState<Bank>();
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [
    { fetching: isLoadingCreateAppPagarmeAccount },
    onExecuteCreateAppPagarmeAccount,
  ] = useCreateAppPagarmeAccountMutation();

  const validationSchema = z.object({
    document: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    defaultBankAccount: z.object({
      accountCheckDigit: z.string().min(1, {
        message: translate.formatMessage({ id: "required" }),
      }),
      accountNumber: z.string().min(1, {
        message: translate.formatMessage({ id: "required" }),
      }),
      branchNumber: z.string().min(1, {
        message: translate.formatMessage({ id: "required" }),
      }),
      branchCheckDigit: z.string(),
      holderName: z.string().min(1, {
        message: translate.formatMessage({ id: "required" }),
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });
  const document = watch("document");

  useEffect(() => {
    register("document", { value: "" });
  }, [register]);

  const onSubmit = async ({
    document,
    defaultBankAccount,
  }: z.infer<typeof validationSchema>) => {
    try {
      const pagarmeAccountType =
        documentType === DocumentType.Cpf
          ? PagarmeAccountType.Individual
          : PagarmeAccountType.Company;
      const bankCode =
        bank?.code && !isNaN(parseInt(bank?.code))
          ? parseInt(bank?.code) + ""
          : "";
      const response = await onExecuteCreateAppPagarmeAccount({
        input: {
          document,
          documentType: pagarmeAccountType,
          defaultBankAccount: {
            bankAccountType,
            accountCheckDigit: defaultBankAccount?.accountCheckDigit,
            accountNumber: defaultBankAccount?.accountNumber,
            bank: bankCode,
            branchCheckDigit: defaultBankAccount?.branchCheckDigit,
            branchNumber: defaultBankAccount?.branchNumber,
            holderDocument: document,
            holderName: defaultBankAccount?.holderName,
            holderType: pagarmeAccountType,
          },
        },
      });
      if (!!response?.data?.createAppPagarmeAccount) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });

        return router.push(
          routes.app({ appId: currentApp?.id }).onboardings.pagarme.callback
        );
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <Card background="background.50">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing="5">
                  <Section>
                    <SectionInformation>
                      <Title fontSize="xl">
                        {translate.formatMessage({ id: "document" })}
                      </Title>
                    </SectionInformation>
                    <SectionContent>
                      <FormControl>
                        <Label htmlFor="documentType">
                          {translate.formatMessage({
                            id: "document",
                          })}
                        </Label>
                        <InputDocument
                          id="documentType"
                          document={document}
                          documentType={documentType}
                          onChangeDocumentType={setDocumentType}
                          onChangeDocument={(value) =>
                            setValue("document", value)
                          }
                        />
                      </FormControl>
                    </SectionContent>
                  </Section>
                  <Section>
                    <SectionInformation>
                      <Title fontSize="xl">
                        {translate.formatMessage({ id: "bankAccount" })}
                      </Title>
                    </SectionInformation>
                    <SectionContent>
                      <FormControl isInvalid={!bankAccountType}>
                        <Label htmlFor="bankAccountType">
                          {translate.formatMessage({ id: "bankAccountType" })}
                        </Label>
                        <RadioGroup
                          onChange={(value) => setBankAccountType(value as any)}
                        >
                          <Stack direction="column" spacing="2">
                            <Radio
                              id={PagarmeBankAccountType.Checking}
                              value={PagarmeBankAccountType.Checking}
                            >
                              {translate.formatMessage({
                                id: "accountChecking",
                              })}
                            </Radio>
                            <Radio
                              id={PagarmeBankAccountType.Savings}
                              value={PagarmeBankAccountType.Savings}
                            >
                              {translate.formatMessage({
                                id: "accountSavings",
                              })}
                            </Radio>
                            <Radio
                              id={PagarmeBankAccountType.ConjunctChecking}
                              value={PagarmeBankAccountType.ConjunctChecking}
                            >
                              {translate.formatMessage({
                                id: "accountConjunctChecking",
                              })}
                            </Radio>
                            <Radio
                              id={PagarmeBankAccountType.ConjunctSavings}
                              value={PagarmeBankAccountType.ConjunctSavings}
                            >
                              {translate.formatMessage({
                                id: "accountConjunctSavings",
                              })}
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                      <FormControl isInvalid={!bank}>
                        <SelectBank
                          label={translate.formatMessage({ id: "bankCode" })}
                          bank={bank}
                          onRemoveChooseBank={setBank}
                          onChooseBank={setBank}
                        />
                      </FormControl>

                      <Stack direction="row" spacing="5">
                        <FormControl
                          isInvalid={!!errors?.defaultBankAccount?.branchNumber}
                        >
                          <Label htmlFor="branchNumber">
                            {translate.formatMessage({ id: "branchNumber" })}
                          </Label>
                          <InputGroup>
                            <Input
                              id="branchNumber"
                              maxLength={4}
                              pattern="\d*"
                              placeholder={translate.formatMessage({
                                id: "branchNumber",
                              })}
                              {...register("defaultBankAccount.branchNumber", {
                                onChange(event) {
                                  event.target.value = getOnlyNumbers(
                                    event.target.value
                                  );
                                },
                              })}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {errors?.defaultBankAccount?.branchNumber?.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          width="14"
                          isInvalid={
                            !!errors?.defaultBankAccount?.branchCheckDigit
                          }
                        >
                          <Label htmlFor="branchCheckDigit">
                            {translate.formatMessage({ id: "digit" })}
                          </Label>
                          <InputGroup>
                            <Input
                              id="branchCheckDigit"
                              maxLength={1}
                              pattern="\d*"
                              {...register(
                                "defaultBankAccount.branchCheckDigit",
                                {
                                  onChange(event) {
                                    event.target.value = getOnlyNumbers(
                                      event.target.value
                                    );
                                  },
                                }
                              )}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {
                              errors?.defaultBankAccount?.branchCheckDigit
                                ?.message
                            }
                          </FormErrorMessage>
                        </FormControl>
                      </Stack>
                      <Stack direction="row" spacing="5">
                        <FormControl
                          isInvalid={
                            !!errors?.defaultBankAccount?.accountNumber
                          }
                        >
                          <Label htmlFor="accountNumber">
                            {translate.formatMessage({ id: "accountNumber" })}
                          </Label>
                          <InputGroup>
                            <Input
                              id="accountNumber"
                              maxLength={13}
                              pattern="\d*"
                              placeholder={translate.formatMessage({
                                id: "accountNumber",
                              })}
                              {...register("defaultBankAccount.accountNumber", {
                                onChange(event) {
                                  event.target.value = getOnlyNumbers(
                                    event.target.value
                                  );
                                },
                              })}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {errors?.defaultBankAccount?.accountNumber?.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          width="14"
                          isInvalid={
                            !!errors?.defaultBankAccount?.accountCheckDigit
                          }
                        >
                          <Label htmlFor="accountCheckDigit">
                            {translate.formatMessage({ id: "digit" })}
                          </Label>
                          <InputGroup>
                            <Input
                              id="accountCheckDigit"
                              maxLength={2}
                              pattern="\d*"
                              {...register(
                                "defaultBankAccount.accountCheckDigit",
                                {
                                  onChange(event) {
                                    event.target.value = getOnlyNumbers(
                                      event.target.value
                                    );
                                  },
                                }
                              )}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {
                              errors?.defaultBankAccount?.accountCheckDigit
                                ?.message
                            }
                          </FormErrorMessage>
                        </FormControl>
                      </Stack>
                      <FormControl
                        isInvalid={!!errors?.defaultBankAccount?.holderName}
                      >
                        <Label htmlFor="holderName">
                          {translate.formatMessage({ id: "holderName" })}
                        </Label>
                        <InputGroup>
                          <Input
                            id="holderName"
                            maxLength={30}
                            placeholder={translate.formatMessage({
                              id: "holderName",
                            })}
                            {...register("defaultBankAccount.holderName")}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors?.defaultBankAccount?.holderName?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </SectionContent>
                  </Section>
                  <ButtonGroup>
                    <Button
                      type="submit"
                      isLoading={isLoadingCreateAppPagarmeAccount}
                      isDisabled={!isValid}
                    >
                      {translate.formatMessage({ id: "save" })}
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </Stack>
    </AppLayout>
  );
};
