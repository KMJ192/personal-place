import type { RouterMap } from './types';

type PageURL = {
  readonly [key: string]: string;
};

const pageUrl: PageURL = {
  ROOT: '/',
};

const routerMap: Array<RouterMap> = [
  {
    name: 'Home',
    auth: 'common',
    path: pageUrl.ROOT,
    page: <div>Root</div>,
  },
];

export type { PageURL };
export { routerMap, pageUrl };
