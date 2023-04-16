import './globals.css';

import classNames from 'classnames/bind';
import style from './layout.module.scss';
const cx = classNames.bind(style);

export const metadata = {
  title: 'React Functions',
  description: 'react utile function project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
