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
  const [t, setT] = useState('');
  const [ui, setUI] = useUIState();
  const { theme } = ui;

  useIsomorphicLayoutEffect(() => {
    if (!theme) {
      setUI({
        theme: 'light',
      });
      window.localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useIsomorphicLayoutEffect(() => {
    setT(window.localStorage.getItem('theme') ?? 'light');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <UIProvider
          value={{
            theme: t,
          }}
        >
          <PageTemplate>
            <div
              style={{
                height: '1000px',
                width: '3000px',
              }}
            >
              page123978123978129871239871239871238971239801237891297123981298072309178230789718923721930871239821379821379812379817239087123987123891237908213798213798
            </div>
          </PageTemplate>
        </UIProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Template;
