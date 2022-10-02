use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn console() {
  // let array = js_sys::Array::new();
  // array.push(&"Hello Console Log".into());
  // web_sys::console::log_1(&array);
  console::log_1(&"test".into());
}
