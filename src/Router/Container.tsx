import { createContext, Children, isValidElement, useEffect, useMemo } from 'react';
import { Routes } from 'react-router-dom';

import type { PermissionType } from './types';

const RouterContext: React.Context<{ [key: string]: any }> = createContext({});

type Props = {
  children?: JSX.Element;
  permission: Array<PermissionType>;
};

function Container({ permission, children }: Props) {
  const permissionInfo = useMemo(() => {
    const test = new Set();
    permission.forEach((p) => {
      const { auth } = p;
      test.add(auth);
    });
  }, []);

  return (
    <RouterContext.Provider value={{ permission }}>
      <Routes>
        <>{children}</>
      </Routes>
    </RouterContext.Provider>
  );
}

export type { Props as ContainerProps };
export default Container;
