import { Container, Hero } from "@stokei/ui";

import { BaseComponentReadable } from "../../../types/base-component-readable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps {}

export const Readable = ({
  data,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <Container>
      <Hero {...dataProps} />
    </Container>
  );
};
