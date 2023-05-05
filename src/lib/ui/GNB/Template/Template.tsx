import { useState } from 'react';
import _ from 'lodash';

import GNB from '../../GNB';
import Child from './Child';

import type { GNBItem } from '../types';

import classNames from 'classnames/bind';
import style from './Template.module.scss';
const cx = classNames.bind(style);

type Props = {
  contents?: Array<GNBItem>;
  onClickNav?: (key: string | number) => void;
};

function Template({ contents, onClickNav }: Props) {
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
    if (onClickNav) {
      onClickNav(key);
    }
  };

  return (
    <GNB.Container className={cx('gnb-container')}>
      <GNB.MenuGroup show depth={0} className={cx('menu-group')}>
        {Array.isArray(contents) &&
          contents.length > 0 &&
          contents.map((component: GNBItem) => {
            if (component.roll === 'top') {
              return <div>{component.contents}</div>;
            }

            if (component.roll === 'bottom') {
              return <div className={cx('bottom')}>{component.contents}</div>;
            }

            return (
              <Child
                options={options}
                item={component}
                depth={0}
                key={component.key}
                onClickItem={onClickItem}
              />
            );
          })}
      </GNB.MenuGroup>
    </GNB.Container>
  );
}

export default Template;
