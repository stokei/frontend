import { BASE_URL_HEADER_NAME } from "@/constants/base-url-header-name";
import { ServerResponse } from "http";

export const getBaseURLOfTheServerSide = (response: ServerResponse) => {
  return response?.getHeaders?.()?.[BASE_URL_HEADER_NAME];
};
