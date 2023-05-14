'use client';

import { ReactNode, useRef } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PageTemplate from '@src/lib/ui/template/PageTemplate/PageTemplate';

import HamburgerMenu from '@src/lib/ui/atoms/HamburgerMenu/HamburgerMenu';
import type { GNBItem } from '@lib/ui/molecules/GNB/types';
import { useGNBHooks } from '@src/lib/ui/molecules/GNB';

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
      key: 'playground',
      contents: 'Playground',
      child: [
        {
          key: 'atom',
          contents: 'Atom',
          child: [
            {
              key: 'button',
              contents: 'Button',
              path: '/playground/atom/button',
            },
            {
              key: 'hamburger',
              contents: 'HamburgerMenu',
              path: '/playground/atom/hamburger-menu',
            },
          ],
        },
      ],
    },
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
        {
          key: 'Tab',
          contents: 'Tab',
          path: '/lab/tab',
        },
      ],
    },
  ]);

  const { options, isFoldGNB, setOptions, setIsFoldGNB } =
    useGNBHooks.useGNBStates();
  const { onClickItem, onClickFoldMenu } = useGNBHooks.useGNBActions({
    isFoldGNB,
    setOptions,
    setIsFoldGNB,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <main className={cx('main')}>
          <PageTemplate
            contents={contents.current}
            options={options}
            headerLeft={
              <HamburgerMenu
                active={isFoldGNB}
                onClick={onClickFoldMenu}
                type='type-4'
              />
            }
            className={cx('page-template')}
            onClickItem={onClickItem}
          >
            <section className={cx('page')}>{children}</section>
          </PageTemplate>
        </main>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Template;
