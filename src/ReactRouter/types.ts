type PageTypes = 'wrongAccessPage' | 'notFoundPage' | string;

type ReactRouterMapType = {
  auth: string | 'common';
  path: string;
  page: JSX.Element;
};

export type { ReactRouterMapType, PageTypes };
