import { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import type { OVER_RIDABLE_PROPS } from '@src/lib/ui/types/types';

import classNames from 'classnames/bind';
import style from './MenuGroup.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  show?: boolean;
  depth?: number;
  children?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVER_RIDABLE_PROPS<T, BaseProps>;

function MenuGroup<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  {
    show = false,
    depth = 0,
    children,
    as,
    className,
    style,
    ...props
  }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx('menu-group', show ? 'show' : 'collapse', className)}
      style={{
        ...style,
        marginLeft: `${16 * depth}px`,
      }}
    >
      {children}
    </Element>
  );
}

export default forwardRef(MenuGroup) as typeof MenuGroup;
