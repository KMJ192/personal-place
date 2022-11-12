import { useState } from 'react';

import type { TrieDataType } from '@src/hooks/useTrie/types';
import useTrie from '@src/hooks/useTrie';

const value = [
  {
    key: 0,
    label: '한글',
  },
  {
    key: 1,
    label: '한자',
  },
  {
    key: 2,
    label: 'app',
  },
  {
    key: 3,
    label: 'append',
  },
  {
    key: 4,
    label: 'apple',
  },
  {
    key: 5,
    label: 'application',
  },
];

function TrieTestPage() {
  const trie = useTrie(value, true, false);

  const [inputed, setInputed] = useState('');
  const [result, setResult] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div>
        <label>Input Data : </label>
        <input
          value={inputed}
          onChange={(e) => {
            setInputed(e.target.value);
            const result = trie.containList(e.target.value);
            let cur = '';
            for (let i = 0; i < result.length; i++) {
              cur = i === 0 ? result[i].label : `${cur}, ${result[i].label}`;
            }
            setResult(cur);
          }}
        />
      </div>
      <div>검색어 DB</div>
      <div
        style={{
          border: '1px solid white',
          display: 'flex',
          flexDirection: 'column',
          width: '140px',
        }}
      >
        {value.map((data) => (
          <div>{data.label}</div>
        ))}
      </div>
      <div>자동완성 결과 : {result}</div>
    </div>
  );
}

export default TrieTestPage;
