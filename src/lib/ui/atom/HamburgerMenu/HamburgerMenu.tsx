import React, { useEffect, useRef } from 'react';

import type { OVER_RIDABLE_PROPS } from '@lib/ui/types/types';

import classNames from 'classnames/bind';
import style from './HamburgerMenu.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  type?: 'type-1' | 'type-2' | 'type-3' | 'type-4';
  active?: boolean;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends React.ElementType> = OVER_RIDABLE_PROPS<T, BaseProps>;

function HamburgerMenu<
  T extends React.ElementType = typeof DEFAULT_COMPONENT_ELEMENT,
>(
  { type = 'type-1', active = false, as, ...props }: Props<T>,
  ref: React.Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;
  const pres = useRef(active);
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);
  const bar3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar1 = bar1Ref.current;
    const bar2 = bar2Ref.current;
    const bar3 = bar3Ref.current;
    if (bar1 && bar2 && bar3 && pres.current !== active) {
      bar1.className = '';
      bar2.className = '';
      bar3.className = '';
      pres.current = active;
    }
  }, [active]);

  return (
    <Element
      ref={ref}
      className={cx('hamburger', active && 'active', type)}
      {...props}
    >
      <span ref={bar1Ref} className={cx('pause')}></span>
      <span ref={bar2Ref} className={cx('pause')}></span>
      <span ref={bar3Ref} className={cx('pause')}></span>
    </Element>
  );
}

export default React.forwardRef(HamburgerMenu) as typeof HamburgerMenu;
