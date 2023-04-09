import React, { forwardRef, useContext, useMemo } from 'react';

import type { ReactNode, ElementType, Ref } from 'react';
import { v4 as uuid } from 'uuid';

import { Switch, Case, Default } from '@jonathan/react-utils';

import type { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';
import type { Size } from '../../types';
import type { List } from '../types';
import type { ListElement } from '../../types';

import Chip from '@lib/components/atom/Chip';
import Text from '@lib/components/atom/Text';

import Store from '../../context/context';

import ExpandIcon from '@src/lib/assets/Icons/ExpandIcon';

import classNames from 'classnames/bind';
import style from './Box.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  size?: Size;
  placeholder?: ReactNode;
  value?: List;
  onDelete?: (element: ListElement) => void;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Box<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  {
    size = 'md',
    value = {},
    placeholder = '',
    className,
    as,
    onDelete,
    ...props
  }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;
  const isData = useMemo(() => Object.keys(value).length > 0, [value]);
  const { show } = useContext(Store);

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(
        'multi-box',
        'dynamic-size',
        show && 'active',
        size,
        isData && 'inner',
        className,
      )}
    >
      <Switch>
        <Case condition={!isData}>
          <div className={cx('placeholder', size)}>
            <Text typo='p1' weight='r'>
              {placeholder}
            </Text>
          </div>
        </Case>
        <Default>
          <div className={cx('contents')}>
            {Object.keys(value).map((key) => {
              return (
                <Chip.Action
                  key={uuid()}
                  deletable
                  className={cx('select-chip', size)}
                  onDelete={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (typeof onDelete === 'function') {
                      onDelete(value[key]);
                    }
                  }}
                >
                  <Text typo='p1' weight='r'>
                    {value[key].contents}
                  </Text>
                </Chip.Action>
              );
            })}
          </div>
        </Default>
      </Switch>
      <div className={cx('icon', show && 'show', size, 'dynamic-size')}>
        <ExpandIcon />
      </div>
    </Element>
  );
}

export default forwardRef(Box) as typeof Box;
