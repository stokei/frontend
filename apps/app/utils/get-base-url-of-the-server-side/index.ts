import { BASE_URL_HEADER_NAME } from "@/constants/base-url-header-name";

export const getBaseURLOfTheServerSide = (response: any) => {
  return (
    response?.getHeaders?.()?.[BASE_URL_HEADER_NAME] ||
    response?.headers?.get?.(BASE_URL_HEADER_NAME)
  );
};
