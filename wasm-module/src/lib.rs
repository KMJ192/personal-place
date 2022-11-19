use wasm_bindgen::prelude::*;
use web_sys::console;

// pub mod trie;
// use trie::trie::build_trie;

#[wasm_bindgen]
pub fn console() {
  console::log_1(&"test".into());
}

pub mod canvas;
pub mod pie_chart;
#[wasm_bindgen]
pub fn pie_chart(id: String) {
  use pie_chart::pie_chart::PieChart;

  let mut p_chart = PieChart::new(id);
  p_chart.run();
  console::log_1(&format!("{:#?}", p_chart).into());
}
