import React from 'react';

import classNames from 'classnames/bind';
import style from './HamburgerMenu.module.scss';
const cx = classNames.bind(style);

type Props = {
  type?: 'type-1' | 'type-2' | 'type-3' | 'type-4';
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function HamburgerMenu({ type = 'type-1', active = false, onClick }: Props) {
  return (
    <div
      className={cx('hamburger', type, active && 'active')}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default HamburgerMenu;
