import React from 'react';

import type { OVERRIDABLE_PROPS } from '../../types/utilityTypes';

import classNames from 'classnames/bind';
import style from './Button.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children?: React.ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'button';

type Props<T extends React.ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Button<T extends React.ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { children, as, className, ...props }: Props<T>,
  ref: React.Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element {...props} ref={ref} className={cx('button', className)}>
      {children}
    </Element>
  );
}

export default React.forwardRef(Button) as typeof Button;
