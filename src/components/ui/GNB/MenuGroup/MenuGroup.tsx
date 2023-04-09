import { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';

import classNames from 'classnames/bind';
import style from './MenuGroup.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  show?: boolean;
  depth?: number;
  children?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function MenuGroup<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { show = false, depth = 0, children, as, className, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(
        'menu-group',
        depth === 0 && 'first-depth',
        depth === 1 && 'second-depth',
        depth === 2 && 'last-depth',
        show ? 'show' : 'collapse',
        className,
      )}
    >
      {children}
    </Element>
  );
}

export default forwardRef(MenuGroup) as typeof MenuGroup;
