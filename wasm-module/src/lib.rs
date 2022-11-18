use wasm_bindgen::prelude::*;
use web_sys::console;

// pub mod trie;
// use trie::trie::build_trie;

#[wasm_bindgen]
pub fn console() {
  // let array = js_sys::Array::new();
  // array.push(&"Hello Console Log".into());
  // web_sys::console::log_1(&array);
  // build_trie();
  console::log_1(&"test".into());
}

#[wasm_bindgen]
pub fn get_data(recive_data: String) {
  console::log_1(&format!("{:#?}", recive_data.replace("\\", "")).into());
  let data = serde_json::from_str(&recive_data);
  let result = match data {
    Ok(r) => r,
    Err(e) => format!("{e:?}")
  };
  console::log_1(&format!("{:#?}", result).into());
}
