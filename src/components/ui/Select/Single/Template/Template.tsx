import React, { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';

import { v4 as uuid } from 'uuid';

import { ClickAwayListener } from '@jonathan/react-utils';

import Select from '../../';
import type { Size, ListElement } from '../../types';

type Props = {
  show: boolean;
  size: Size;
  list: Array<ListElement>;
  value: ReactNode;
  placeholder: string;
  properties?: {
    box?: HTMLAttributes<HTMLDivElement>;
    list?: HTMLAttributes<HTMLDivElement>;
    listItem?: HTMLAttributes<HTMLDivElement>;
  };
  onClickBox: (e: React.MouseEvent) => void;
  onSelect: (option: ListElement) => void;
  onClickAway: (e: Event) => void;
};

const Template = forwardRef<HTMLDivElement, Props>(
  (
    {
      show,
      size,
      list,
      value,
      placeholder,
      properties = {
        box: {} as HTMLAttributes<HTMLDivElement>,
        list: {} as HTMLAttributes<HTMLDivElement>,
        listItem: {} as HTMLAttributes<HTMLDivElement>,
      },
      onClickBox,
      onSelect,
      onClickAway,
    },
    ref,
  ) => {
    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Select.Container show={show} ref={ref}>
          <Select.Single.Box
            {...properties.box}
            placeholder={placeholder}
            value={value}
            size={size}
            onClick={onClickBox}
          />
          <Select.Single.OptionGroup {...properties.list}>
            {list.map((option) => {
              return (
                <Select.Single.Option
                  {...properties.listItem}
                  key={uuid()}
                  selected={option.selected}
                  size={size}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onSelect(option);
                  }}
                >
                  {option.contents}
                </Select.Single.Option>
              );
            })}
          </Select.Single.OptionGroup>
        </Select.Container>
      </ClickAwayListener>
    );
  },
);

export default Template;
