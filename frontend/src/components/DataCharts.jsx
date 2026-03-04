import { Chart, ChartLoading } from "./Chart";
import { SpendingPie, SpendingPieLoading } from "./SpendingPie";

export const DataCharts = ({ salesData, categoryData, loading }) => {
  if (loading) {
    return (
      <div className="data-charts-grid">
        <div className="chart-main">
          <ChartLoading />
        </div>
        <div className="chart-side">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="data-charts-grid">
      <div className="chart-main">
        <Chart data={salesData} />
      </div>
      <div className="chart-side">
        <SpendingPie data={categoryData} />
      </div>
    </div>
  );
};
