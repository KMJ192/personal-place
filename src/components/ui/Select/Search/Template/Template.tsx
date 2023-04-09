import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { v4 as uuid } from 'uuid';

import { ClickAwayListener } from '@jonathan/react-utils';

import Select from '../../';

import type { Size, ListElement } from '../../types';

type Props = {
  show: boolean;
  size: Size;
  list: Array<ListElement>;
  value: string;
  placeholder: string;
  properties?: {
    box?: HTMLAttributes<HTMLDivElement>;
    list?: HTMLAttributes<HTMLDivElement>;
    listItem?: HTMLAttributes<HTMLDivElement>;
  };
  onClickBox: (e: React.MouseEvent) => void;
  onSelect: (option: ListElement) => void;
  onClickAway: (e: Event) => void;
  onChangeValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
      onChangeValue,
    },
    ref,
  ) => {
    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Select.Container show={show} ref={ref}>
          <Select.Search.Box
            {...properties.box}
            value={value}
            placeholder={placeholder}
            onClick={onClickBox}
            onChange={onChangeValue}
          />
          <Select.Search.OptionGroup {...properties.list}>
            {list.map((option) => {
              return (
                <Select.Search.Option
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
                </Select.Search.Option>
              );
            })}
          </Select.Search.OptionGroup>
        </Select.Container>
      </ClickAwayListener>
    );
  },
);

export default Template;
