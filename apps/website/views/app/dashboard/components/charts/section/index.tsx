import {
  Card,
  CardBody,
  CardProps,
  Skeleton,
  Title
} from "@stokei/ui";
import { PropsWithChildren } from "react";
import { ChartEmptyState } from "../empty-state";

interface SectionProps extends CardProps {
  title: string;
  isLoading: boolean;
  isEmpty: boolean;
}
export const Section = ({
  title,
  isLoading,
  isEmpty,
  children,
  ...props
}: PropsWithChildren<SectionProps>) => {
  return (
    <Card background="background.50" {...props}>
      <CardBody>
        <Title marginBottom="5" fontSize="lg">{title}</Title>

        {isLoading ? (
          <Skeleton height="40" />
        ) : (
          <>
            {!isEmpty ? children : (
              <ChartEmptyState />
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};
