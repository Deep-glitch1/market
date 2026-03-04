import {
  AreaChart,
  BarChart3,
  FileSearch,
  LineChart,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { AreaVariant } from "./AreaVariant";
import { BarVariant } from "./BarVariant";
import { LineVariant } from "./LineVariant";

export const Chart = ({ data = [] }) => {
  const [chartType, setChartType] = useState("area");

  const onTypeChange = (type) => {
    setChartType(type);
  };

  return (
    <div className="chart-card-modern">
      <div className="chart-header-modern">
        <h3 className="chart-title">Transactions</h3>
        <div className="chart-type-selector">
          <div className="chart-type-icon">
            {chartType === "area" && <AreaChart size={16} />}
            {chartType === "line" && <LineChart size={16} />}
            {chartType === "bar" && <BarChart3 size={16} />}
          </div>
          <select 
            className="chart-dropdown"
            value={chartType} 
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="area">Area chart</option>
            <option value="line">Line chart</option>
            <option value="bar">Bar chart</option>
          </select>
        </div>
      </div>

      <div className="chart-content-modern">
        {data.length === 0 ? (
          <div className="chart-empty-modern">
            <FileSearch size={48} color="#d1d5db" />
            <p>No data for this period.</p>
          </div>
        ) : (
          <>
            {chartType === "area" && <AreaVariant data={data} />}
            {chartType === "bar" && <BarVariant data={data} />}
            {chartType === "line" && <LineVariant data={data} />}
          </>
        )}
      </div>
    </div>
  );
};

export const ChartLoading = () => {
  return (
    <div className="chart-card-modern">
      <div className="chart-header-modern">
        <div className="skeleton skeleton-title-modern"></div>
        <div className="skeleton skeleton-select-modern"></div>
      </div>
      <div className="chart-content-modern chart-loading-modern">
        <Loader2 className="spinner-modern" size={48} />
      </div>
    </div>
  );
};
