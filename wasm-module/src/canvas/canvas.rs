use wasm_bindgen::JsCast;
use web_sys::{window, HtmlCanvasElement};


#[derive(Debug)]
pub struct Canvas {
  id: String,
  canvas: Option<HtmlCanvasElement>,
}

impl Canvas {
  pub fn new(id: String) -> Self {
    Canvas {
      id,
      canvas: None,
    }
  }

  pub fn set_canvas(&mut self) {
    let document = window().unwrap().document().unwrap();
    
    let canvas_element = document.get_element_by_id(&self.id).unwrap();

    self.canvas = 
      Some(canvas_element
        .dyn_into::<HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap());
  }
}