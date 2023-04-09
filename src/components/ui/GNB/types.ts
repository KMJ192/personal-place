import React from 'react';

type GNBItem = {
  key: string | number;
  contents: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  child?: Array<GNBItem>;
  roll?: 'top' | 'mid' | 'bottom';
  onClick?: (e: React.MouseEvent) => void;
};

export type { GNBItem };
