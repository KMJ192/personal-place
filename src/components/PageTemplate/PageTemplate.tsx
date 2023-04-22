import type { ReactNode } from 'react';

import GNB from '../ui/GNB';
import type { GNBItem } from '../ui/GNB/types';

import classNames from 'classnames/bind';
import style from './PageTemplate.module.scss';
const cx = classNames.bind(style);

type Props = {
  children: ReactNode;
  contents?: Array<GNBItem>;
};

function PageTemplate({ children, contents }: Props) {
  return (
    <div className={cx('template')}>
      <div className={cx('header')}>header</div>
      <div className={cx('nav-page')}>
        <GNB.NextTemplate contents={contents} />
        <div className={cx('contents')}>
          <div className={cx('page')}>{children}</div>
          <footer className={cx('footer')}>footer</footer>
        </div>
      </div>
    </div>
  );
}

export default PageTemplate;
