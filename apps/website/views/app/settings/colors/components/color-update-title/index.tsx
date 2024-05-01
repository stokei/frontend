import {
  Title
} from "@stokei/ui";

interface ColorUpdateTitleProps {
  title: string;
}
export const ColorUpdateTitle = ({ title }: ColorUpdateTitleProps) => {
  return (
    <Title fontSize="lg">
      {title}
    </Title>
  );
};
