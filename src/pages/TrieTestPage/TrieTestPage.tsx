import { useState } from 'react';

import type { TrieDataType } from '@src/hooks/useTrie/types';
import { useTrie } from '@src/hooks';

const value: Array<TrieDataType> = [
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
  {
    key: 6,
    label: 'twitter',
  },
  {
    key: 7,
    label: 'twitch',
  },
];

function TrieTestPage() {
  const trie = useTrie({
    dictionary: value,
    isBuildTrie: true,
    isLetterCase: false,
  });

  const [inputed, setInputed] = useState('');
  const [containList, setContainList] = useState('');
  const [prefixList, setPrefixList] = useState('');

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
            const contain = trie.containList(e.target.value);
            let cur = '';
            for (let i = 0; i < contain.length; i++) {
              cur = i === 0 ? contain[i].label : `${cur}, ${contain[i].label}`;
            }
            setContainList(cur);

            const prefix = trie.startPrefixList(e.target.value);
            cur = '';
            for (let i = 0; i < prefix.length; i++) {
              cur = i === 0 ? prefix[i].label : `${cur}, ${prefix[i].label}`;
            }
            setPrefixList(cur);
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
        {value.map((data, key) => (
          <div key={key}>{data.label}</div>
        ))}
      </div>
      <div>접두어 : {prefixList}</div>
      <div>포함 : {containList}</div>
    </div>
  );
}

export default TrieTestPage;
