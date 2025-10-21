import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";



const AreaOverview = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis
          label={{ value: "Meals", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total"
          stroke="var(--highlight-color)"
          fill="var(--highlight-color)"
          fillOpacity={0.25}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaOverview