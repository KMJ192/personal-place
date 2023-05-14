import GNB from '../../GNB';
import Child from './Child';

import type { GNBItem } from '../types';

import classNames from 'classnames/bind';
import style from './Template.module.scss';
const cx = classNames.bind(style);

type Props = {
  options?: {
    show: Set<string | number>;
    selected: string | number;
  };
  contents?: Array<GNBItem>;
  onClickItem?: (key: string | number) => void;
};

function Template({
  options = {
    show: new Set(),
    selected: '',
  },
  contents = [],
  onClickItem = () => {},
}: Props) {
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
