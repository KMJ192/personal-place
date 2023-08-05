'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageTemplate from '@src/components/templates/PageTemplate/PageTemplate';

// import PageTemplate from '@src/components/PageTemplate/PageTemplate';

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
        <PageTemplate>{children}</PageTemplate>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Template;
