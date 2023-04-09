import React, { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';

import Text from '@lib/components/atom/Text';

import type { Size } from '../../types';

import classNames from 'classnames/bind';
import style from './Option.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  hover?: boolean;
  selected?: boolean;
  size?: Size;
  children?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Option<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  {
    hover = false,
    selected = false,
    size = 'md',
    children,
    className,
    as,
    ...props
  }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(
        'select-option',
        size,
        hover && 'hover',
        selected && 'selected',
        className,
      )}
    >
      <Text typo='p1' weight='r'>
        {children}
      </Text>
    </Element>
  );
}

export default forwardRef(Option) as typeof Option;
