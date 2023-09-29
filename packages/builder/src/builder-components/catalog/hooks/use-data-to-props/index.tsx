export const useDataToProps = ({ data }: { data: any }) => {
  return {
    direction: data?.direction || "column",
    spacing: data?.gap || "5",
  };
};
