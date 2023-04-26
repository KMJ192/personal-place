import type { ReactNode } from 'react';

import Header from '@lib/ui/Header';
import Footer from '@lib/ui/Footer';
import GNB from '@lib/ui/GNB';
import type { GNBItem } from '@lib/ui/GNB/types';

import classNames from 'classnames/bind';
import style from './PageTemplate.module.scss';
const cx = classNames.bind(style);

type Props = {
  children: ReactNode;
  contents?: Array<GNBItem>;
};

function PageTemplate({ children, contents }: Props) {
  return (
    <div className={cx('template')}>
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
    </div>
  );
}

export default PageTemplate;
