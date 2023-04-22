'use client';

import type { ReactNode } from 'react';

import type { GNBItem } from '@src/components/ui/GNB/types';
import PageTemplate from '@src/components/PageTemplate/PageTemplate';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

const contents: Array<GNBItem> = [
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
          },
          {
            key: 'useDebounce',
            contents: 'useDebounce',
          },
          {
            key: 'useResizeObserver',
            contents: 'useResizeObserver',
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
];

type Props = {
  children: ReactNode;
};

function Template({ children }: Props) {
  return (
    <main className={cx('main')}>
      <PageTemplate contents={contents}>{children}</PageTemplate>
    </main>
  );
}

export default Template;
