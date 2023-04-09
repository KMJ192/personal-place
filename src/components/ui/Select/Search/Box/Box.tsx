import React, { forwardRef, useContext } from 'react';
import type { ElementType, Ref } from 'react';

import type { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';
import type { Size } from '../../types';

import Input from '@src/lib/components/atom/Input';

import ExpandIcon from '@src/lib/assets/Icons/ExpandIcon';

import Store from '../../context/context';

import classNames from 'classnames/bind';
import style from './Box.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  size?: Size;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const DEFAULT_COMPONENT_ELEMENT = 'input';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Box<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { size = 'md', className, onClick, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const { show } = useContext(Store);

  return (
    <div className={cx('search-box')} onClick={onClick}>
      <Input.Text
        {...props}
        ref={ref}
        size={size}
        className={cx('input', className)}
        rightIcon={
          <div className={cx('icon', show && 'show')}>
            <ExpandIcon />
          </div>
        }
      />
    </div>
  );
}

export default forwardRef(Box) as typeof Box;
