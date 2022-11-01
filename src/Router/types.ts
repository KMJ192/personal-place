type PermissionType = {
  auth: string;
};

type ContainerType = {
  children: JSX.Element;
  permission: Array<PermissionType>;
};

export type { ContainerType, PermissionType };
