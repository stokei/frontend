import { useTranslations } from "@/hooks";
import { I18nKey } from "@/interfaces/i18n-key";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Container,
  Text,
  Title,
} from "@stokei/ui";

const questionsAndAwnsers: { question: I18nKey; answer: I18nKey }[] = [
  {
    question: "doINeedToHaveACreditCard",
    answer: "doINeedToHaveACreditCardAnswer",
  },
  {
    question: "whenAreMyPlansBilled",
    answer: "whenAreMyPlansBilledAnswer",
  },
  {
    question: "whenIsMyApplicationInvoiceDue",
    answer: "whenIsMyApplicationInvoiceDueAnswer",
  },
];

export const CommonQuestions = () => {
  const translate = useTranslations();
  return (
    <Container paddingY="16" align="center" justify="center">
      <Title size="lg" marginBottom="10">
        {translate.formatMessage({ id: "commonQuestions" })}
      </Title>
      <Accordion width={["full", "full", "50%", "50%"]}>
        {questionsAndAwnsers.map(({ question, answer }) => (
          <AccordionItem key={question}>
            <AccordionButton>
              <AccordionLabel>
                {translate.formatMessage({ id: question })}
              </AccordionLabel>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>{translate.formatMessage({ id: answer })}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
