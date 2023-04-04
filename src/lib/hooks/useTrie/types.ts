type TrieDataType = {
  label: string;
  key: string | number;
  options?: { [key: string]: any };
  checked?: boolean;
};

type ITrie = {
  insert: (inputStr: string, word: TrieDataType) => void;
  initialize: () => void;
  startPrefixList: (prefix: string) => TrieDataType[];
  containList: (inputed: string) => TrieDataType[];
  isDiff: (newData: TrieDataType[]) => boolean;
};

export type { ITrie, TrieDataType };
