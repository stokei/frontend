import { PropsWithChildren, useMemo } from "react";
import { Box, BoxProps } from "../box";
import { Icon } from "../icon";

export interface RatingProps extends BoxProps {
  readonly rating: number;
  readonly maxRating?: number;
}

export const Rating = ({
  rating,
  maxRating = 5,
  ...props
}: PropsWithChildren<RatingProps>) => {
  const ratingFixed = useMemo(() => rating?.toFixed(1), [rating]);
  const roundedRating = useMemo(() => Math.round(rating * 2) / 2, [rating]);

  return (
    <Box display="flex" alignItems="center">
      {Array(maxRating).map((_, position) => {
        if (roundedRating - position >= 1) {
          return (
            <Icon
              name="starFilled"
              key={position}
              marginLeft="1"
              color={position < rating ? "primary.500" : "text.500"}
            />
          );
        }
        if (roundedRating - position === 0.5) {
          return (
            <Icon
              name="starHalf"
              color="text.500"
              key={position}
              marginLeft="1"
            />
          );
        }
        return (
          <Icon name="star" key={position} color="text.500" marginLeft="1" />
        );
      })}
      <Box as="span" ml="2" color="text.500" fontSize="sm">
        {ratingFixed}
      </Box>
    </Box>
  );
};
