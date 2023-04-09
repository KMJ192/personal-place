import React, { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import Checkbox from '@lib/components/atom/Checkbox/Checkbox';

import type { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';
import type { Size } from '../../types';

import classNames from 'classnames/bind';
import style from './Option.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  size?: Size;
  selected?: boolean;
  active?: boolean;
  children?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Option<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { size = 'md', selected, active, children, as, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx('select-option', active && 'active', size, props.className)}
    >
      <Checkbox checked={selected}>{children}</Checkbox>
    </Element>
  );
}

export default forwardRef(Option) as typeof Option;
