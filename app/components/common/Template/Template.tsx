'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type Props = {
  children: ReactNode;
};

const queryClient: QueryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 0,
  },
});

function Template({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <main className={cx('main')}>{children}</main>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Template;
