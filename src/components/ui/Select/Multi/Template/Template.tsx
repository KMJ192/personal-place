import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { v4 as uuid } from 'uuid';

import { ClickAwayListener } from '@jonathan/react-utils';

import Select from '../../';

import type { Size } from '../../types';
import type { List } from '../types';
import type { ListElement } from '../../types';

type Props = {
  show: boolean;
  size: Size;
  placeholder: string;
  list: Array<ListElement>;
  value: List;
  properties?: {
    box?: HTMLAttributes<HTMLDivElement>;
    list?: HTMLAttributes<HTMLDivElement>;
    listItem?: HTMLAttributes<HTMLDivElement>;
  };
  onDelete: (element: ListElement) => void;
  onClickBox: (e: React.MouseEvent) => void;
  onSelect: (option: ListElement) => void;
  onClickAway: (e: Event) => void;
};

const Template = forwardRef<HTMLDivElement, Props>(
  (
    {
      show,
      placeholder,
      size,
      list,
      value,
      properties = {
        box: {} as HTMLAttributes<HTMLDivElement>,
        list: {} as HTMLAttributes<HTMLDivElement>,
        listItem: {} as HTMLAttributes<HTMLDivElement>,
      },
      onDelete,
      onSelect,
      onClickBox,
      onClickAway,
    },
    ref,
  ) => {
    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Select.Container show={show} ref={ref}>
          <Select.Multi.Box
            {...properties.box}
            size={size}
            placeholder={placeholder}
            value={value}
            onDelete={onDelete}
            onClick={onClickBox}
          />
          <Select.Multi.OptionGroup {...properties.list}>
            {list.map((option) => {
              return (
                <Select.Multi.Option
                  {...properties.listItem}
                  size={size}
                  key={uuid()}
                  selected={option.selected}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onSelect(option);
                  }}
                >
                  {option.contents}
                </Select.Multi.Option>
              );
            })}
          </Select.Multi.OptionGroup>
        </Select.Container>
      </ClickAwayListener>
    );
  },
);

export default Template;
