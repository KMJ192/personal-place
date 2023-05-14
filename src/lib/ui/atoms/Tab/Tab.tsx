import React from 'react';

import type { OVER_RIDABLE_PROPS } from '@lib/ui/types/types';

import classNames from 'classnames/bind';
import style from './Tab.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children?: React.ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'span';

type Props<T extends React.ElementType> = OVER_RIDABLE_PROPS<T, BaseProps>;

function Tab<T extends React.ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { children, as, className, ...props }: Props<T>,
  ref: React.Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element {...props} ref={ref} className={cx('tab', className)}>
      {children}
    </Element>
  );
}

export default React.forwardRef(Tab) as typeof Tab;
