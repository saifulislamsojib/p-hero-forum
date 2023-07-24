import "server-only";

import { cookies } from "next/headers";
import getHttpService from "./httpService";

const serverHttpService = getHttpService();

serverHttpService.instance.interceptors.request.use((config) => {
  config.headers.Cookie = cookies().toString();
  return config;
});

export const serverRequests = serverHttpService.requests;
