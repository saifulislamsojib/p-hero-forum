import "server-only";

import { AxiosRequestHeaders } from "axios";
import { cookies } from "next/headers";
import getHttpService from "./httpService";

const serverHttpService = getHttpService();

serverHttpService.instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: cookies().get("jwtToken")?.value,
  } as AxiosRequestHeaders,
}));

export const serverRequests = serverHttpService.requests;
