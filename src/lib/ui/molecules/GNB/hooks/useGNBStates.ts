import { useState } from 'react';
import type { SetStateAction } from 'react';
import type { GNBTemplateOptions } from '../types';

type States = {
  options: GNBTemplateOptions;
  isFoldGNB: boolean;
  setOptions: (newState: SetStateAction<GNBTemplateOptions>) => void;
  setIsFoldGNB: (newState: SetStateAction<boolean>) => void;
};

function useGNBStates(): States {
  const [options, setOptions] = useState<GNBTemplateOptions>({
    show: new Set(),
    selected: '',
  });
  const [isFoldGNB, setIsFoldGNB] = useState(false);

  const setOp = (newState: SetStateAction<GNBTemplateOptions>) => {
    setOptions(newState);
  };

  const setIsF = (newState: SetStateAction<boolean>) => {
    setIsFoldGNB(newState);
  };

  return {
    isFoldGNB,
    options,
    setOptions: setOp,
    setIsFoldGNB: setIsF,
  };
}

export type { States as GNBStates };
export default useGNBStates;
