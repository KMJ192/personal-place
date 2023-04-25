import { forwardRef, isValidElement } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import type { OVERRIDABLE_PROPS } from '@src/components/ui/types/utilityTypes/utilityTypes';

import classNames from 'classnames/bind';
import style from './Menu.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  selected?: boolean;
  depth?: number;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Menu<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  {
    selected = false,
    depth = 0,
    left,
    right,
    children,
    as,
    className,
    ...props
  }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element {...props} ref={ref} className={cx('menu', className)}>
      <div className={cx('item', selected && 'select')}>
        <div className={cx('left')}>
          {isValidElement(left) && <div className={cx('icon')}>{left}</div>}
          <div className={cx('contents')}>{children}</div>
        </div>
        {isValidElement(right) && <div className={cx('right')}>{right}</div>}
      </div>
    </Element>
  );
}

export default forwardRef(Menu) as typeof Menu;
