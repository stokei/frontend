import { useTranslations } from "../../../../hooks";

export interface FormSignUpData {
  title?: string
}

export const useDataToProps = ({ data, props }: { data: FormSignUpData; props: any }) => {
  const translate = useTranslations();
  return {
    title: data?.title || translate.formatMessage({ id: 'signUp' })
  };
};
