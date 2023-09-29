interface Data {
  text?: string;
}

export const useDataToProps = ({ data }: { data: Data }) => {
  return {
    children: data?.text || "Button",
  };
};
