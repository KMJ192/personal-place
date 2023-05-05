use std::any::Any;
use std::collections::HashMap;
use web_sys::console;

union TrieOption {
  k1: String,
  k2: i32,
  options: Box<dyn Any>,
}

struct TrieDataType {
  key: String,
  options: TrieOption,
}

struct TrieNode {
  is_word: bool,
  next: HashMap<char, TrieDataType>,
  info: Option<Vec<TrieDataType>>,
}

impl TrieNode {
  pub fn new() -> Self {

  }
}

struct Trie {

}

pub fn build_trie() {
  console::log_1(&"run trie".into());
}