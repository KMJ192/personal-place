import type { ReactNode } from 'react';

type Auth = 'admin' | 'user' | 'common' | 'none';

type RouterMap = {
  name: string;
  auth: Auth | ReadonlyArray<Auth>;
  path: string;
  page: ReactNode;
};

export type { Auth, RouterMap };
