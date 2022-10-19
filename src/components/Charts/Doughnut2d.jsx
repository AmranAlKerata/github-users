import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Chart = ({ data }) => {
  const chartConfigs = {
    type: "doughnut3D",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        numberSuffix: "",
        theme: "fusion",
        decimals: 0,
        doughnutRadius: "50%",
        showPrecentValues: 0
      },
      data
    }
  };
  return <ReactFC {...chartConfigs} />;
};

export default Chart;
