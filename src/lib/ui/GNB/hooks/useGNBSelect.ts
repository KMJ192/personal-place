import { useState } from 'react';
import _ from 'lodash';

function useGNBSelect() {
  const [options, setOptions] = useState<{
    show: Set<string | number>;
    selected: string | number;
  }>({
    show: new Set(),
    selected: '',
  });

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

  return {
    options,
    onClickItem,
  };
}

export default useGNBSelect;
