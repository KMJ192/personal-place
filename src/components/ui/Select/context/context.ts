import { createContext } from 'react';

type Type = {
  show?: boolean;
};

const INIT: Type = {
  show: false,
};

const context = createContext(INIT);

export type { Type as SelectContextType };
export default context;
