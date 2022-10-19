import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Chart = ({ data }) => {
  const chartConfigs = {
    type: "bar3d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Forked",
        theme: "fusion",
        yAxisName: "Repos",
        xAxisName: "Forks",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px"
      },
      data
    }
  };
  return <ReactFC {...chartConfigs} />;
};

export default Chart;
