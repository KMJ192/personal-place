import type { ReactNode } from 'react';

import GNB from '../ui/GNB';
import type { GNBItem } from '../ui/GNB/types';

import classNames from 'classnames/bind';
import style from './PageTemplate.module.scss';
const cx = classNames.bind(style);

type Props = {
  children: ReactNode;
  contents?: Array<GNBItem>;
  onClickNav?: (key: string | number) => void;
};

function PageTemplate({ children, contents, onClickNav }: Props) {
  return (
    <div className={cx('template')}>
      <div className={cx('header')}>header</div>
      <div className={cx('nav-page')}>
        <GNB.Template contents={contents} onClickNav={onClickNav} />
        <div className={cx('contents')}>
          <div className={cx('page')}>{children}</div>
          <footer className={cx('footer')}>footer</footer>
        </div>
      </div>
    </div>
  );
}

export default PageTemplate;
