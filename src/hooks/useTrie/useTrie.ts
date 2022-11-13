import { useEffect, useMemo } from 'react';

import { Hangul } from '@src/utils';

import type { TrieDataType, TrieImpl } from './types';

type TrieObjectType = { [key: string]: TrieNode };

class TrieNode {
  public isWord: boolean;

  public next: TrieObjectType;

  public info: Array<TrieDataType> | null;

  constructor() {
    this.isWord = false;

    this.next = {};

    this.info = null;
  }
}

class Trie implements TrieImpl {
  private root: TrieNode;

  private memo: string;

  private isLetterCase: boolean;

  constructor({ isLetterCase }: { isLetterCase: boolean }) {
    this.root = new TrieNode();

    this.memo = '';

    this.isLetterCase = isLetterCase;
  }

  /**
   * 입력 받은 문자열을 추출하여 배열로 반환
   * @param str
   * @returns
   */
  private extractStr = (str: string): Array<string> => {
    const cur: Array<string> = [];

    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (Hangul.isHangul(c)) {
        const extract = Hangul.extract(c);
        cur.push(...extract.split(''));
      } else {
        cur.push(c);
      }
    }

    return cur;
  };

  /**
   * trie 객체에 문자열 주입
   * @param inputStr 문자열
   * @param info 문자열에 대한 정보
   */
  public insert = (inputStr: string, info: TrieDataType): void => {
    let curNode: TrieNode = this.root;

    for (let i = 0; i < inputStr.length; i++) {
      const c = this.isLetterCase ? inputStr[i] : inputStr[i].toLowerCase();
      // 띄어쓰기 무시
      if (c !== ' ') {
        if (!curNode.next[c]) {
          curNode.next[c] = new TrieNode();
        }
        curNode = curNode.next[c];
      }
    }

    curNode.isWord = true;
    if (curNode.info === null) {
      curNode.info = [info];
    } else {
      curNode.info.push(info);
    }
  };

  /**
   * 접두어 기준 모든 문자열 출력
   * @param prefix
   * @returns Array<TrieDataType>
   */
  public startPrefixList = (prefix: string): Array<TrieDataType> => {
    let curNode: TrieNode = this.root;
    const toPrefix: Array<TrieDataType> = [];
    const keys = new Set<string | number>();

    const findWords = (node: TrieNode) => {
      if (node === undefined) return;

      if (node.isWord && node.info !== null) {
        for (let i = 0; i < node.info.length; i++) {
          const value = node.info[i];
          if (!keys.has(value.key)) {
            toPrefix.push(value);
            keys.add(value.key);
          }
        }
      }

      const nextArr: Array<TrieNode> = Object.values(node.next);
      for (let i = 0; i < nextArr.length; i++) {
        const n: TrieNode = nextArr[i];
        findWords(n);
      }
    };

    const extract = this.extractStr(prefix);

    for (let i = 0; i < extract.length; i++) {
      const text = this.isLetterCase ? extract[i] : extract[i].toLowerCase();
      curNode = curNode.next[text];
      if (curNode === undefined) break;
    }

    if (curNode) {
      findWords(curNode);
    }

    return toPrefix;
  };

  /**
   * 입력된 문자열이 포함된 모든 문자열에 대한 정보 출력
   * @param inputStr
   * @returns Array<TrieDataType>
   */
  public containList = (inputStr: string): Array<TrieDataType> => {
    if (!inputStr || inputStr.length === 0) return [];
    const containList: Array<TrieDataType> = [];
    const extractInputed = this.extractStr(inputStr).join('');
    const keys = new Set<string | number>();

    const findWords = (node: TrieNode) => {
      if (node === undefined) return;
      if (node.isWord && node.info !== null) {
        for (let i = 0; i < node.info.length; i++) {
          const value = node.info[i];
          const extractLabel = this.extractStr(value.label).join('');
          const text = this.isLetterCase
            ? extractInputed
            : extractInputed.toLowerCase();

          if (extractLabel.includes(text) && !keys.has(value.key)) {
            containList.push(value);
            keys.add(value.key);
          }
        }
      }
      const nextArr = Object.values(node.next);
      for (let i = 0; i < nextArr.length; i++) {
        findWords(nextArr[i]);
      }
    };

    findWords(this.root);

    return containList;
  };

  /**
   * trie 초기화
   */
  public initialize = (): void => {
    this.root = new TrieNode();
  };

  /**
   * trie memoization
   * 입력 데이터와 기존 데이터의 일치 여부 반환
   * @param newData
   * @returns boolean
   */
  public isDiff = (newData: Array<TrieDataType>): boolean => {
    const compare = JSON.stringify(
      newData.sort((a, b) => {
        if (a.key < b.key) {
          return -1;
        }
        if (a.key > b.key) {
          return 1;
        }
        return 0;
      }),
    );

    const isChanged = !(this.memo === compare);

    this.memo = compare;

    return isChanged;
  };

  /**
   * 생성된 trie 객체 출력
   */
  get makedTrie() {
    return this;
  }
}

type Props = {
  dictionary: Array<TrieDataType>;
  isBuildTrie: boolean;
  isLetterCase: boolean;
};

/**
 * trie DS hooks
 * @param param0
 * @returns
 */
function useTrie({
  dictionary,
  isBuildTrie = true,
  isLetterCase = true,
}: Props) {
  const trie = useMemo(() => new Trie({ isLetterCase }), [isLetterCase]);

  useEffect(() => {
    if (isBuildTrie && trie.isDiff(dictionary)) {
      trie.initialize();
      for (let i = 0; i < dictionary.length; i++) {
        const val = dictionary[i];
        const extract = Hangul.extract(val.label);
        trie.insert(extract, val);
      }
    }
  }, [trie, dictionary, isBuildTrie]);

  return trie;
}

export default useTrie;
