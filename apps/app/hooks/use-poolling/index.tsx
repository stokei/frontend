import { useEffect } from "react";

export interface UsePoollingParams {
  interval?: number;
  onPoolling: () => void;
}

export const usePoolling = ({ onPoolling, interval }: UsePoollingParams) => {
  useEffect(() => {
    const intervalCounter = setInterval(() => onPoolling?.(), interval || 5000);
    return () => {
      clearInterval(intervalCounter);
    };
  }, [interval, onPoolling]);
};
