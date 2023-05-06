import axios, {
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
  RawAxiosResponseHeaders,
} from 'axios';
import { ApiObj, HttpResponse } from './types';

const API_URL = 'http://localhost:8080/api';
const JSON_HEADER = { 'Content-type': 'application/json' };
const FORM_HEADER = { 'Content-type': 'multipart/form-data' };

const DEFAULT_COOKIE = 'key=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

const DEFAULT_HEADER = {
  ...JSON_HEADER,
};

const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';
const PUT = 'PUT';
const METHOD = { GET, POST, DELETE, PUT };

const apiObj = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

const HTTP_REQUEST = async ({
  url,
  method,
  headers,
  params,
  data,
}: AxiosRequestConfig): Promise<HttpResponse> => {
  const response = await apiObj({
    url,
    method,
    headers,
    params,
    data,
  }).then((res) => {
    const {
      data: { code, message, result },
      status,
    } = res;

    return {
      status,
      code: code ?? '',
      message: message ?? '',
      result: result ?? '',
    };
  });

  return response;
};

const api: ApiObj = {
  HTTP_REQUEST,
};

const QUERY = (params: AxiosRequestConfig) => (): Promise<HttpResponse> => {
  let headers: RawAxiosResponseHeaders = params.headers ?? DEFAULT_HEADER;
  const token = document.cookie;

  if (!headers.token) {
    headers = {
      ...headers,
      token,
    };
  }

  return api.HTTP_REQUEST({
    ...params,
    headers,
  });
};

const MUT =
  <T>(params: AxiosRequestConfig) =>
  (data: T) => {
    let headers: RawAxiosRequestHeaders = params.headers ?? DEFAULT_HEADER;
    const token = document.cookie;

    if (!headers.token) {
      headers = {
        ...headers,
        token,
      };
    }

    return api.HTTP_REQUEST({
      ...params,
      headers,
      data: data ?? {},
    });
  };

const fetcher = { QUERY, MUT };

export { api, fetcher, METHOD, JSON_HEADER, FORM_HEADER, DEFAULT_COOKIE };
