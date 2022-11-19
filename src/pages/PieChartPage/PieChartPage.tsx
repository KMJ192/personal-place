function PieChart() {
  import('@wasm/pkg').then(async (wasm) => {
    await wasm.default();
    wasm.pie_chart('pie-chart');
  });

  return <canvas id='pie-chart' />;
}

export default PieChart;
