import { atom } from 'recoil';

export type GNBRecoilState = {
  options: {
    show: Set<string | number>;
    selected: string | number;
  };
};

export const gnbState = atom<GNBRecoilState>({
  key: '@ui/gnb',
  default: {
    options: {
      show: new Set(),
      selected: '',
    },
  },
});
