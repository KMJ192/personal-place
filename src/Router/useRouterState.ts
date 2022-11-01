import { useState } from 'react';

import type { PermissionType } from './types';

function useRouterState(
  initPermission: Array<PermissionType>,
): [Array<PermissionType>, (newPermission: Array<PermissionType>) => void] {
  const [permission, setPermission] = useState(initPermission);

  const setPermissionState = (newPermission: Array<PermissionType>) => {
    setPermission(newPermission);
  };

  return [permission, setPermissionState];
}

export default useRouterState;
