import { usePhoneCodesQuery } from "./graphql/phone-codes.query.graphql.generated";

export const usePhoneCodes = () => {
  const [{ fetching: isLoading, data: phoneCodes }] = usePhoneCodesQuery();

  return {
    isLoading,
    phoneCodes: phoneCodes?.phoneCodes || [],
  };
};
