import { forwardRef } from 'react';
import type { ReactNode, ElementType, Ref } from 'react';

import type { OVERRIDABLE_PROPS } from '@lib/ui/types/utilityTypes';

import Header from '@lib/ui/Header';
import Footer from '@lib/ui/Footer';
import GNB from '@lib/ui/GNB';

import type { GNBItem } from '@lib/ui/GNB/types';

import classNames from 'classnames/bind';
import style from './PageTemplate.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children: ReactNode;
  contents?: Array<GNBItem>;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends ElementType> = OVERRIDABLE_PROPS<T, BaseProps>;

function PageTemplate<T extends ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  { as, children, contents, className, ...props }: Props<T>,
  ref: Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;

  return (
    <Element {...props} ref={ref} className={cx('template', className)}>
      <Header.Container>
        <Header.LogoSection>Logo</Header.LogoSection>
        <Header.LeftSection>Left</Header.LeftSection>
        <Header.RightSection>Right</Header.RightSection>
      </Header.Container>
      <div className={cx('nav-page')}>
        <GNB.NextTemplate contents={contents} />
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

// import type { ReactNode } from 'react';

// import Header from '@lib/ui/Header';
// import Footer from '@lib/ui/Footer';
// import GNB from '@lib/ui/GNB';

// import type { GNBItem } from '@lib/ui/GNB/types';

// import classNames from 'classnames/bind';
// import style from './PageTemplate.module.scss';
// const cx = classNames.bind(style);

// type BaseProps = {
//   children: ReactNode;
//   contents?: Array<GNBItem>;
// };

// function PageTemplate({ children, contents }: BaseProps) {
//   return (
//     <div className={cx('template')}>
//       <Header.Container>
//         <Header.LogoSection>Logo</Header.LogoSection>
//         <Header.LeftSection>Left</Header.LeftSection>
//         <Header.RightSection>Right</Header.RightSection>
//       </Header.Container>
//       <div className={cx('nav-page')}>
//         <GNB.NextTemplate contents={contents} />
//         <div className={cx('contents')}>
//           <div className={cx('page')}>{children}</div>
//           <Footer.Container>
//             <Footer.LeftSection>Left</Footer.LeftSection>
//             <Footer.RightSection>Right</Footer.RightSection>
//           </Footer.Container>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PageTemplate;
