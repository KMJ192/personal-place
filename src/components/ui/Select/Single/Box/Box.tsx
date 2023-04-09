import React, { forwardRef, useContext } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import { Switch, Case, Default } from '@jonathan/react-utils';

import type { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';

import ExpandIcon from '@src/lib/assets/Icons/ExpandIcon';

import { Size } from '../../types';
import Text from '@lib/components/atom/Text';

import Store from '../../context/context';

import classNames from 'classnames/bind';
import style from './Box.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  size?: Size;
  value?: ReactNode;
  placeholder?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Box<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { size = 'md', placeholder = '', value, as, className, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  const { show } = useContext(Store);

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(
        'single-box',
        'static-size',
        size,
        show && 'active',
        className,
      )}
    >
      <div className={cx('contents')}>
        <Switch>
          <Case condition={!value}>
            <div className={cx('placeholder')}>
              <Text typo='p1' weight='r'>
                {placeholder}
              </Text>
            </div>
          </Case>
          <Default>
            <Text typo='p1' weight='r'>
              {value}
            </Text>
          </Default>
        </Switch>
      </div>
      <div className={cx('icon', show && 'show', size)}>
        <ExpandIcon />
      </div>
    </Element>
  );
}

export default forwardRef(Box) as typeof Box;
