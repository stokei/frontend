import { useTranslations } from "../../../../hooks";

export interface FormLoginData {
  title?: string
}

export const useDataToProps = ({ data, props }: { data: FormLoginData; props: any }) => {
  const translate = useTranslations();
  return {
    title: data?.title || translate.formatMessage({ id: 'signInToYourAccount' })
  };
};
