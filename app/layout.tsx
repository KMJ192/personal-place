import './styles/globals.css';
import './styles/theme.scss';

// import classNames from 'classnames/bind';
// import style from './layout.module.scss';
// const cx = classNames.bind(style);

export const metadata = {
  title: 'play ground',
  description: '아무거나 다 넣는 곳',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
