'use client';

import { ReactNode, useRef } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { GNBItem } from '@lib/ui/GNB/types';
import PageTemplate from '@src/lib/ui/template/PageTemplate/PageTemplate';
import useGNBSelect from '@src/lib/ui/GNB/hooks/useGNBSelect';

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
  const contents = useRef<Array<GNBItem>>([
    {
      key: 'components',
      contents: 'Components',
      child: [
        {
          key: 'ifComponent',
          contents: 'IfComponent',
          path: '/components/if-component',
        },
        {
          key: 'clickAwayListener',
          contents: 'ClickAwayListener',
          path: '/components/click-away-listener',
        },
        {
          key: 'infiniteScroll',
          contents: 'InfiniteScroll',
          path: '/components/infinite-scroll',
        },
        {
          key: 'virtualList',
          contents: 'VirtualList',
          path: '/components/virtual-list',
        },
      ],
    },
    {
      key: 'utils',
      contents: 'Utils',
      child: [
        {
          key: 'customHooks',
          contents: 'CustomHooks',
          child: [
            {
              key: 'useTrie',
              contents: 'useTrie',
              path: '/utils/use-trie',
            },
            {
              key: 'useIntersectionObserver',
              contents: 'useIntersectionObserver',
              path: '/utils/use-intersection-observer',
            },
            {
              key: 'useDebounce',
              contents: 'useDebounce',
              path: '/utils/use-debounce',
            },
            {
              key: 'useResizeObserver',
              contents: 'useResizeObserver',
              path: '/utils/use-resize-observer',
            },
            {
              key: 'useDetectElement',
              contents: 'useDetectElement',
              path: '/utils/use-detect-element',
            },
          ],
        },
      ],
    },
    {
      key: 'Libraries',
      contents: 'Libraries',
      child: [
        {
          key: 'react-hook-form',
          contents: 'react-hook-form',
          path: '/libraries/react-hook-form',
        },
      ],
    },
    {
      key: 'Lab',
      contents: 'Lab',
      child: [
        {
          key: 'File',
          contents: 'File',
          path: '/lab/file',
        },
        {
          key: 'JWT',
          contents: 'JWT',
          path: '/lab/jwt',
        },
      ],
    },
  ]);

  const { options, onClickItem } = useGNBSelect();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <main className={cx('main')}>
          <PageTemplate
            contents={contents.current}
            options={options}
            onClickItem={onClickItem}
            className={cx('page-template')}
          >
            <section className={cx('page')}>{children}</section>
          </PageTemplate>
        </main>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Template;
