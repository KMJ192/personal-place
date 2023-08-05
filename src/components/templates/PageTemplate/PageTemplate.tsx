import React from 'react';

type Props = {
  children: React.ReactNode;
};

function PageTemplate({ children }: Props) {
  return <div>{children}</div>;
}

export default PageTemplate;
