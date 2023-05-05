import React from 'react';

import GNB from '../../GNB';
import type { GNBItem } from '../types';

import classNames from 'classnames/bind';
import style from './Child.module.scss';
const cx = classNames.bind(style);

type Props = {
  item: GNBItem;
  depth: number;
  options: {
    show: Set<string | number>;
    selected: string | number;
  };
  onClickItem: (key: string | number) => void;
};

function Child({ item, depth, options, onClickItem }: Props) {
  return (
    <>
      <GNB.Menu
        left={item.leftIcon}
        right={
          <div
            className={cx('right-icon', options.show.has(item.key) && 'show')}
          >
            {item.rightIcon}
          </div>
        }
        selected={options.selected === item.key}
        onClick={(e: React.MouseEvent) => {
          onClickItem(item.key);
          if (item.onClick) {
            item.onClick(e);
          }
        }}
      >
        {item.contents}
      </GNB.Menu>
      {Array.isArray(item.child) && item.child.length > 0 && (
        <GNB.MenuGroup depth={depth + 1} show={options.show.has(item.key)}>
          {item.child.map((component: GNBItem) => {
            return (
              <Child
                depth={depth + 1}
                options={options}
                item={component}
                key={component.key}
                onClickItem={onClickItem}
              />
            );
          })}
        </GNB.MenuGroup>
      )}
    </>
  );
}

export default Child;
