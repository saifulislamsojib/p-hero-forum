import axios, { AxiosResponse } from "axios";

const getHttpService = () => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 150000,
  });

  const responseBody = <T extends object>(response: AxiosResponse<T>) =>
    response.data;

  const requests = {
    get: <T extends object>(url: string): Promise<T> =>
      instance.get(url).then(responseBody),
    post: <T extends object>(url: string, body: object): Promise<T> =>
      instance.post(url, body).then(responseBody),
    patch: <T extends object>(url: string, body: object): Promise<T> =>
      instance.patch(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
  };

  return { instance, requests };
};

export default getHttpService;

export const { requests } = getHttpService();
