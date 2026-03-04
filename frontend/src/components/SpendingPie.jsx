import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";
import { useState } from "react";
import { PieVariant } from "./PieVariant";
import { RadarVariant } from "./RadarVariant";
import { RadialVariant } from "./RadialVariant";

export const SpendingPie = ({ data = [] }) => {
  const [chartType, setChartType] = useState("pie");

  const onTypeChange = (type) => {
    setChartType(type);
  };

  return (
    <div className="chart-card-modern">
      <div className="chart-header-modern">
        <h3 className="chart-title">Categories</h3>
        <div className="chart-type-selector">
          <div className="chart-type-icon">
            {chartType === "pie" && <PieChart size={16} />}
            {chartType === "radar" && <Radar size={16} />}
            {chartType === "radial" && <Target size={16} />}
          </div>
          <select 
            className="chart-dropdown"
            value={chartType} 
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="pie">Pie chart</option>
            <option value="radar">Radar chart</option>
            <option value="radial">Radial chart</option>
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
            {chartType === "pie" && <PieVariant data={data} />}
            {chartType === "radar" && <RadarVariant data={data} />}
            {chartType === "radial" && <RadialVariant data={data} />}
          </>
        )}
      </div>
    </div>
  );
};

export const SpendingPieLoading = () => {
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
