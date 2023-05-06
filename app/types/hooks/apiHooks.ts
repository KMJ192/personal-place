type ApiProps<T> = {
  state?: T;
  getter?: () => void;
  setter?: () => void;
};

export type { ApiProps };
