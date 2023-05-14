import React, { useEffect, useRef, useState } from 'react';

import type { OVER_RIDABLE_PROPS } from '@lib/ui/types/types';

import classNames from 'classnames/bind';
import style from './Tab.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  options?: Array<{
    contents?: React.ReactNode;
  }>;
  direction?: 'vertical' | 'horizontal';
  select?: number;
  onSelect?: (idx: number) => void;
};

const DEFAULT_COMPONENT_ELEMENT = 'div';

type Props<T extends React.ElementType> = OVER_RIDABLE_PROPS<T, BaseProps>;

function Tab<T extends React.ElementType = typeof DEFAULT_COMPONENT_ELEMENT>(
  {
    select = 0,
    options = [],
    direction = 'horizontal',
    as,
    className,
    onSelect = () => {},
    ...props
  }: Props<T>,
  ref: React.Ref<any>,
) {
  const Element = as ?? DEFAULT_COMPONENT_ELEMENT;
  const optionsRef = useRef<HTMLDivElement>(null);
  const [sizeInfo, setSizeInfo] = useState<{
    optionsInfo: {
      width: number;
      height: number;
    };
    optionInfo: Array<{
      width: number;
      height: number;
      left: number;
    }>;
  }>({
    optionsInfo: {
      width: 0,
      height: 0,
    },
    optionInfo: [],
  });
  const [tabLineStyle, setTabLineStyle] = useState({
    left: '0',
    width: '0',
  });

  useEffect(() => {
    if (optionsRef.current) {
      const options = optionsRef.current;
      const info = [];
      const len = options.children.length;
      const { width: totalWidth, height: totalHeight } =
        options.getBoundingClientRect();
      let left = 0;
      for (let i = 0; i < len; i++) {
        const option = options.children[i];
        const { width, height } = option.getBoundingClientRect();
        info[i] = {
          width,
          height,
          left,
        };
        left += width;
      }

      setSizeInfo({
        optionsInfo: {
          width: totalWidth,
          height: totalHeight,
        },
        optionInfo: info,
      });
    }
  }, [options]);

  useEffect(() => {
    if (sizeInfo.optionInfo.length > 0) {
      const left = `${sizeInfo.optionInfo[select].left}px`;
      const width = `${sizeInfo.optionInfo[select].width}px`;
      setTabLineStyle({
        left,
        width,
      });
    }
  }, [sizeInfo, select]);

  return (
    <Element {...props} ref={ref} className={cx('tab', direction, className)}>
      <div
        className={cx(
          'tab-line',
          select === 0 && 'first',
          select === options.length - 1 && 'last',
        )}
        style={tabLineStyle}
      ></div>
      <div className={cx('options')} ref={optionsRef}>
        {options.map(({ contents }, idx: number) => {
          return (
            <span
              className={cx('option')}
              key={idx}
              onClick={() => {
                onSelect(idx);
              }}
            >
              {contents}
            </span>
          );
        })}
      </div>
    </Element>
  );
}

export default React.forwardRef(Tab) as typeof Tab;
