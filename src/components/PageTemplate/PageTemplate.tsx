import React from 'react';

import {
  Flex,
  Footer,
  Header,
  SideNavTemplate,
  useValueUIState,
} from 'any-react-ui';
import type { SideNavItem } from 'any-react-ui';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type Props = {
  children: React.ReactNode;
};

function PageTemplate({ children }: Props) {
  const { theme } = useValueUIState();

  const navItem = React.useRef<Array<SideNavItem>>([
    {
      key: 'nav1',
      contents: 'Nav1',
      children: [
        {
          key: 'nav1-1',
          contents: 'Nav1-1',
        },
        {
          key: 'nav1-2',
          contents: 'Nav1-2',
        },
        {
          key: 'nav1-3',
          contents: 'Nav1-3',
        },
      ],
    },
    {
      key: 'nav2',
      contents: 'Nav2',
      children: [
        {
          key: 'nav2-1',
          contents: 'Nav2-1',
        },
        {
          key: 'nav2-2',
          contents: 'Nav2-2',
        },
      ],
    },
    {
      key: 'nav3',
      contents: 'Nav3',
      children: [
        {
          key: 'nav3-1',
          contents: 'Nav3-1',
        },
        {
          key: 'nav3-2',
          contents: 'Nav3-2',
        },
        {
          key: 'nav3-3',
          contents: 'Nav3-3',
        },
      ],
    },
  ]);

  return (
    <Flex as='main' className={cx('page-template', theme)}>
      <SideNavTemplate className={cx('gnb')} navItem={navItem.current} />
      <Header className={cx('header')}>header</Header>
      <div className={cx('contents')}>
        <section className={cx('page')}>{children}</section>
        <Footer className={cx('footer')}>footer</Footer>
      </div>
    </Flex>
  );
}

export default PageTemplate;
