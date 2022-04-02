import { Options } from "ky";

export const defaultOptions: Options = {
  prefixUrl: process.env.NEXT_PUBLIC_API_SERVER_URL,
};
