import axios, { AxiosRequestConfig } from 'axios';
import { ApiObj, HttpResponse } from './types';

const API_URL = 'http://localhost:8080/api';
const JSON_HEADER = { 'Content-type': 'application/json' };
const FORM_HEADER = { 'Content-type': 'multipart/form-data' };

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
      data: { code, message },
      status,
    } = res;

    return {
      status,
      code,
      message,
    };
  });

  return response;
};

const api: ApiObj = {
  HTTP_REQUEST,
};

const query = (param: AxiosRequestConfig) => (): Promise<HttpResponse> => {
  let headers = param.headers ?? DEFAULT_HEADER;
};
