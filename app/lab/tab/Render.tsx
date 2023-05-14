'use client';

import React, { useState } from 'react';
import Tab from '@src/lib/ui/atoms/Tab/Tab';

const options = [
  {
    contents: 'test test',
  },
  {
    contents: 'test test test',
  },
  {
    contents: 'test123',
  },
];

function Render() {
  const [select, setSelect] = useState(0);

  const onSelect = (idx: number) => {
    setSelect(idx);
  };

  return <Tab options={options} select={select} onSelect={onSelect} />;
}

export default Render;
