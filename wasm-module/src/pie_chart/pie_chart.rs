use super::super::canvas::canvas::Canvas;

#[derive(Debug)]
pub struct PieChart {
  canvas: Canvas,
}

impl PieChart {
  pub fn new(id: String) -> Self {
    PieChart { 
      canvas: Canvas::new(id),
    }
  }

  pub fn run(&mut self) {
    self.canvas.set_canvas();
  }
}