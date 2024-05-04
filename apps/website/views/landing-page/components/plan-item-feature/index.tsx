import {
  ListIcon,
  ListItem
} from "@stokei/ui";

interface PlanItemFeatureProps {
  readonly name: string;
}

export const PlanItemFeature = ({ name }: PlanItemFeatureProps) => {
  return (
    <ListItem>
      <ListIcon name="check" color="green.500" />
      {name}
    </ListItem>
  );
};
