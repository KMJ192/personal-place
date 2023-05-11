import React from 'react';

import type { OVERRIDABLE_PROPS } from '@lib/ui/types/types';

import classNames from 'classnames/bind';
import style from './HamburgerMenu.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  type?: 'type-1' | 'type-2' | 'type-3' | 'type-4';
  active?: boolean;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends React.ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function HamburgerMenu<
  T extends React.ElementType = typeof DEFAULT_COMPONENT_ELEMENT,
>(
  { type = 'type-1', active = false, as, ...props }: Props<T>,
  ref: React.Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element
      ref={ref}
      className={cx('hamburger', active && 'active', type)}
      {...props}
    >
      <span></span>
      <span></span>
      <span></span>
    </Element>
  );
}

export default React.forwardRef(HamburgerMenu) as typeof HamburgerMenu;
