'use client';

import { useRouter } from 'next/navigation';
import PageTemplate from '@src/components/PageTemplate/PageTemplate';
import { GNBItem } from '@src/components/ui/GNB/types';

import classNames from 'classnames/bind';
import style from './page.module.scss';
const cx = classNames.bind(style);

const contents: Array<GNBItem> = [
  {
    key: 'components',
    contents: 'Components',
    child: [
      {
        key: 'ifComponent',
        contents: 'IfComponent',
      },
      {
        key: 'clickAwayListener',
        contents: 'ClickAwayListener',
      },
      {
        key: 'infiniteScroll',
        contents: 'InfiniteScroll',
      },
      {
        key: 'virtualList',
        contents: 'VirtualList',
      },
    ],
  },
  {
    key: 'utils',
    contents: 'Utils',
  },
];

const paths: { [key: string]: string } = {
  ifComponent: '/components/if-component',
  clickAwayListener: '/components/click-away-listener',
  infiniteScroll: '/components/infinite-scroll',
  virtualList: '/components/virtual-list',
};

function Home() {
  const router = useRouter();

  const onClickNav = (key: string | number) => {
    const p = paths[String(key)];
    if (p) {
      router.push(p);
    }
  };

  return (
    <main className={cx('main')}>
      <PageTemplate contents={contents} onClickNav={onClickNav}>
        <div>page</div>
      </PageTemplate>
    </main>
  );
}

export default Home;
