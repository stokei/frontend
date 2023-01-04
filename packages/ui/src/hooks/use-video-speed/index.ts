import { useCallback, useState } from "react";

const DEFAULT_INITIAL_SPEED = 1;
const MIN_SPEED = 0.5;
const MAX_SPEED = 2;

export const useVideoSpeed = () => {
  const [speed, setSpeed] = useState<number>(DEFAULT_INITIAL_SPEED);

  const onChangeSpeed = useCallback(() => {
    setSpeed((currentSpeed) =>
      currentSpeed >= MAX_SPEED ? MIN_SPEED : currentSpeed + 0.5
    );
  }, []);

  return {
    speed,
    onChangeSpeed,
  };
};
