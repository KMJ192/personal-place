'use client';

import { ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UIProvider, useUIState } from 'any-react-ui';

import { useIsomorphicLayoutEffect } from '@src/lib';
import PageTemplate from '@src/components/PageTemplate/PageTemplate';

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
  // const [t, setT] = useState('');
  // const [ui, setUI] = useUIState();
  // const { theme } = ui;

  // useIsomorphicLayoutEffect(() => {
  //   if (!theme) {
  //     setUI({
  //       theme: 'dark',
  //     });
  //     window.localStorage.setItem('theme', 'dark');
  //   }
  // }, [theme]);

  // useIsomorphicLayoutEffect(() => {
  //   setT(window.localStorage.getItem('theme') ?? 'dark');
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <UIProvider
          value={{
            theme: 'dark',
          }}
        >
          <PageTemplate>{children}</PageTemplate>
        </UIProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Template;
