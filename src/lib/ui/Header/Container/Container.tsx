import { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import type { OVERRIDABLE_PROPS } from '@src/lib/ui/types/types';

import classNames from 'classnames/bind';
import style from './Container.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'header';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Container<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { children, as, className, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element {...props} ref={ref} className={cx('container', className)}>
      {children}
    </Element>
  );
}

export default forwardRef(Container) as typeof Container;
