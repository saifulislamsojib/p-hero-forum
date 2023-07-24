import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const getHttpService = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 150000,
  });

  const responseBody = <T extends object>(response: AxiosResponse<T>) =>
    response.data;

  const requests = {
    get: <T extends object>(url: string): Promise<T> =>
      instance.get(url).then(responseBody),
    post: <T extends object>(
      url: string,
      body: object,
      config?: AxiosRequestConfig<object>
    ): Promise<T> => instance.post(url, body, config).then(responseBody),
    patch: <T extends object>(url: string, body: object): Promise<T> =>
      instance.patch(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
  };

  return { instance, requests };
};

const { requests, instance } = getHttpService();
export const { requests: simpleRequest } = getHttpService();

instance.interceptors.request.use((config) => ({
  ...config,
  withCredentials: true,
}));

export { requests };

export default getHttpService;
