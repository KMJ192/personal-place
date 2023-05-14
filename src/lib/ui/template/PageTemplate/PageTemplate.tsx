import { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import type { OVER_RIDABLE_PROPS } from '@src/lib/ui/types/types';

import Header from '@lib/ui/molecules/Header';
import Footer from '@lib/ui/molecules/Footer';
import GNB from '@lib/ui/molecules/GNB';

import type { GNBItem } from '@lib/ui/molecules/GNB/types';

import classNames from 'classnames/bind';
import style from './PageTemplate.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children: ReactNode;
  options?: {
    show: Set<string | number>;
    selected: string | number;
  };
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
  contents?: Array<GNBItem>;
  onClickItem?: (key: string | number) => void;
  onClickFoldMenu?: () => void;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVER_RIDABLE_PROPS<T, BaseProps>;

function PageTemplate<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  {
    as,
    children,
    options,
    headerLeft,
    headerRight,
    footerLeft,
    footerRight,
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
        <Header.LeftSection>{headerLeft}</Header.LeftSection>
        <Header.RightSection>{headerRight}</Header.RightSection>
      </Header.Container>
      <div className={cx('nav-page')}>
        <div className={cx('gnb')}>
          <GNB.NextTemplate
            contents={contents}
            options={options}
            onClickItem={onClickItem}
          />
        </div>
        <div className={cx('contents')}>
          <div className={cx('page')}>{children}</div>
          <div className={cx('footer')}>
            <Footer.Container>
              <Footer.LeftSection>{footerLeft}</Footer.LeftSection>
              <Footer.RightSection>{footerRight}</Footer.RightSection>
            </Footer.Container>
          </div>
        </div>
      </div>
    </Element>
  );
}

export default forwardRef(PageTemplate) as typeof PageTemplate;
