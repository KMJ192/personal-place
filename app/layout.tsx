import './styles/globals.css';

import Template from '@common/Template/Template';

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
