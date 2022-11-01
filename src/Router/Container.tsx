import { Children, isValidElement, useEffect } from 'react';

import useRouterState from './useRouterState';

import type { PermissionType } from './types';

type Props = {
  children: JSX.Element;
  permission: Array<PermissionType>;
};

function Container({ permission, children }: Props) {
  const [permis, setPermis] = useRouterState([]);

  useEffect(() => {
    setPermis(permission);
    console.log(permis);
  }, [permis]);

  Children.forEach(children, (child) => {});

  return null;
}

export default Container;
