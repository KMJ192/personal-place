import { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import { OVERRIDABLE_PROPS } from '@lib/types/utilityTypes/utilityTypes';

import Store from '../context/context';

import classNames from 'classnames/bind';
import style from './Container.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  show?: boolean;
  children?: ReactNode;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function Container<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { show, children, as, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Store.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        show,
      }}
    >
      <Element
        {...props}
        ref={ref}
        className={cx('select-container', props.className)}
      >
        {children}
      </Element>
    </Store.Provider>
  );
}

export default forwardRef(Container) as typeof Container;
