import { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import type { OVERRIDABLE_PROPS } from '@src/lib/ui/types/types';

import Header from '@lib/ui/Header';
import Footer from '@lib/ui/Footer';
import GNB from '@lib/ui/GNB';

import type { GNBItem } from '@lib/ui/GNB/types';

import classNames from 'classnames/bind';
import style from './PageTemplate.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children: ReactNode;
  options?: {
    show: Set<string | number>;
    selected: string | number;
  };
  contents?: Array<GNBItem>;
  onClickItem?: (key: string | number) => void;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function PageTemplate<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  {
    as,
    children,
    options,
    contents,
    className,
    onClickItem,
    ...props
  }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element {...props} ref={ref} className={cx('template', className)}>
      <Header.Container>
        <Header.LeftSection>Left</Header.LeftSection>
        <Header.RightSection>Right</Header.RightSection>
      </Header.Container>
      <div className={cx('nav-page')}>
        <GNB.NextTemplate
          contents={contents}
          options={options}
          onClickItem={onClickItem}
        />
        <div className={cx('contents')}>
          <div className={cx('page')}>{children}</div>
          <Footer.Container>
            <Footer.LeftSection>Left</Footer.LeftSection>
            <Footer.RightSection>Right</Footer.RightSection>
          </Footer.Container>
        </div>
      </div>
    </Element>
  );
}

export default forwardRef(PageTemplate) as typeof PageTemplate;
