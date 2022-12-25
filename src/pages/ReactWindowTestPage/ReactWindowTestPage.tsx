import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps as ListProps } from 'react-window';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

const Column = (props: ListProps) => {
  // props의 구조는 { data, style, index, isScrolling }으로 되어있다.
  return (
    <div
      // className={props.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
      className={cx('item')}
      style={props.style}
    >
      Column {props.data[props.index % 2]}
    </div>
  );
};

function ReactWindowTestPage() {
  const dataList = ['hello', 'world'];
  return (
    <div className={cx('container')}>
      <List
        // class 이름
        className={cx('list')}
        // 아이템이 보이는 곳의 크기
        height={694}
        // 아이템 보이는 곳의 넓이
        width={350}
        // 아이템 개수
        itemCount={1000}
        // 아이템 높이
        itemSize={75}
        // 아이템 데이터 (배열로 줘서 component에서 indexing 해주자)
        itemData={dataList}
      >
        {Column}
      </List>
    </div>
  );
}

export default ReactWindowTestPage;
