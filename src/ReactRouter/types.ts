type PageTypes =
  | 'wrongAccessPage'
  | 'notFoundPage'
  | string
  | ReadonlyArray<string>;

type ReactRouterMapType = {
  auth: string | ReadonlyArray<string> | 'common';
  path: string;
  page: JSX.Element;
};

export type { ReactRouterMapType, PageTypes };
