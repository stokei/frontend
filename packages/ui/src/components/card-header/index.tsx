import React, { ReactNode } from "react";
import { BoxProps, Box } from "../box";
import { Title } from "../title";
import { Text } from "../text";
import { Stack } from "../stack";

export interface CardHeaderProps extends Omit<BoxProps, "title"> {
  readonly image?: string;
  readonly title: string | ReactNode;
  readonly subtitle?: string | ReactNode;
  readonly avatar?: ReactNode;
}
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  avatar,
  ...props
}) => {
  return (
    <Box width="full" padding="5" {...props}>
      <Stack direction="row" spacing="3" align="center">
        {avatar}
        <Stack spacing="1" direction="column">
          {typeof title === "string" ? (
            <Title fontSize="md" lineHeight="short" color="primary.500">
              {title}
            </Title>
          ) : (
            title
          )}

          {typeof subtitle === "string" ? (
            <Text fontSize="xs">{subtitle}</Text>
          ) : (
            subtitle
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
