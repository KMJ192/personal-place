import React, { forwardRef, useContext } from 'react';
import { ReactNode, ElementType, Ref } from 'react';

import { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';

import Store from '../../context/context';

import Dropdown from '@src/lib/components/atom/Dropdown/Dropdown';

import classNames from 'classnames/bind';
import style from './OptionGroup.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children?: ReactNode;
};

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

const DEFAULT_COMPONENT_ELEMENT = 'div';

function OptionGroup<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { children, className, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const { show } = useContext(Store);

  return (
    <Dropdown
      {...props}
      ref={ref}
      className={cx('option-group', className)}
      show={show}
    >
      <div className={cx('list-contents')}>{children}</div>
    </Dropdown>
  );
}

export default forwardRef(OptionGroup) as typeof OptionGroup;
