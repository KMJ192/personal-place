type TrieDataType = {
  key: string | number;
  label: string;
  options?: { [key: string]: any };
};

type TrieImpl = {
  insert: (inputStr: string, info: TrieDataType) => void;
  initialize: () => void;
  startPrefixList: (prefix: string) => Array<TrieDataType>;
  containList: (inputStr: string) => Array<TrieDataType>;
  isDiff: (newData: Array<TrieDataType>) => boolean;
};

export type { TrieDataType, TrieImpl };
