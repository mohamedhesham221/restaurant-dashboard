import * as React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Typography } from "@mui/material";

// Data for the PieChart representing Income, Expense, and Balance
const data = [
  { name: "Income", value: 6000 },
  { name: "Expense", value: 4000 },
  { name: "Balance", value: 8000 },
];
const COLORS = ["#A23E48", "#2A9D8F", "#264653"];

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--secondary-text)"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`$${data[index].value.toLocaleString()}`}
    </text>
  );
};

// Component to display the Total Balance PieChart
const TotalBalance = () => {
  return (
    <>
      <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
        {/* Title for the Total Balance section */}
        <Typography variant="h4" gutterBottom align="left" fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }} fontFamily="var(--font)">
          Total Balance
        </Typography>
        {/* Responsive container for the PieChart */}
        <ResponsiveContainer width="100%" height={250}>
          <PieChart width={500} height={300}>
            {/* Pie chart displaying Income, Expense, and Balance */}
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={true}
              label={renderCustomizedLabel}
            >
              {/* Map through data to assign colors to each segment */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* Tooltip to display value on hover */}
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            {/* Legend to describe the chart segments */}
            <Legend verticalAlign="bottom" height={10} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default TotalBalance;
