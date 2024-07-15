import { Box, Card, CardBody, Icon, IconName, Stack, Text, Title } from "@stokei/ui";

export interface FunctionalityItemProps {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}
export const FunctionalityItem = ({ icon, title, description }: FunctionalityItemProps) => {
  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          <Box
            width="fit-content"
            height="fit-content"
            padding="5"
            background="primary.500"
            color="white.500"
            rounded="full"
            margin="auto"
          >
            <Icon
              name={icon}
              fontSize="xl"
            />
          </Box>
          <Title fontSize="2xl" color="primary.500" textAlign="center">{title}</Title>
          <Text textAlign="center">{description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
