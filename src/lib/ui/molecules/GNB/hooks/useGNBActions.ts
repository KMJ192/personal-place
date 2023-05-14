import _ from 'lodash';

import { GNBStates } from './useGNBStates';

type Props = Pick<GNBStates, 'setOptions' | 'isFoldGNB' | 'setIsFoldGNB'>;

function useGNBActions({ setOptions, isFoldGNB, setIsFoldGNB }: Props) {
  const onClickItem = (key: string | number) => {
    setOptions((options) => {
      const newOptions = _.cloneDeep(options);
      if (newOptions.show.has(key)) {
        newOptions.show.delete(key);
      } else {
        newOptions.show.add(key);
      }
      newOptions.selected = key;

      return newOptions;
    });
  };

  const onClickFoldMenu = () => {
    setIsFoldGNB(!isFoldGNB);
  };

  return {
    onClickItem,
    onClickFoldMenu,
  };
}

export default useGNBActions;
