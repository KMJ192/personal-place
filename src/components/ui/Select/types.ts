import type { ReactNode } from 'react';

type Size = 'lg' | 'md' | 'sm' | 'xs';

type ListElement = {
  key: string;
  index: number;
  contents: string | ReactNode;
  selected: boolean;
  data?: {
    [key: string]: any;
  };
};

export type { Size, ListElement };
