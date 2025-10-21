import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const BarOverview = ({data}) => {
  return (
    <ResponsiveContainer width="100%" aspect={1.5}>
      <BarChart data={data}>
        {/* Grid lines for the chart */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X-axis displaying days */}
        <XAxis dataKey="day" />

        {/* Y-axis displaying total meals with a label */}
        <YAxis label={{ value: "Meals", angle: -90, position: "insideLeft" }} />

        {/* Tooltip to show data on hover */}
        <Tooltip />

        {/* Bar representing total sales */}
        <Bar dataKey="total" fill="var(--highlight-color)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarOverview;
