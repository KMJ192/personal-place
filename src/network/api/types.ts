import type { AxiosRequestConfig } from 'axios';

type HttpResponse = {
  status: number;
  code: string;
  message: string;
};

type ApiObj = {
  readonly HTTP_REQUEST: (param: AxiosRequestConfig) => Promise<HttpResponse>;
};

export type { ApiObj, HttpResponse };
