import './styles/globals.css';

import Template from '@common/Template/Template';

// import classNames from 'classnames/bind';
// import style from './layout.module.scss';
// const cx = classNames.bind(style);

export const metadata = {
  title: 'My repository',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <Template>{children}</Template>
      </body>
    </html>
  );
}
