import * as React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import {Typography} from "@mui/material";

const data = [
	{ name: "Sat", customers: 200 },
	{ name: "Sun", customers: 170 },
	{ name: "Mon", customers: 120 },
	{ name: "Tue", customers: 95 },
	{ name: "Wed", customers: 130 },
	{ name: "Thu", customers: 80 },
	{ name: "Fri", customers: 150 },
];
// Component to display a chart of daily customer counts
const CustomersCount = () => {
  return (
    <>
      <div style={{ width: "100%", maxWidth: "550px",margin: "0 auto" }}>
        {/* Title for the chart */}
        <Typography variant="h4" gutterBottom align="left" fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }} fontFamily= "var(--font)"> 
          Daily Customers
        </Typography>
        {/* Responsive container for the chart */}
        <ResponsiveContainer width="100%" aspect={1.5}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {/* Grid lines for the chart */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* X-axis displaying days */}
            <XAxis dataKey="name" />
            {/* Y-axis displaying customer count */}
            <YAxis />
            {/* Tooltip to show data on hover */}
            <Tooltip />
            {/* Area chart representing customer data */}
            <Area
              type="monotone"
              dataKey="customers"
              stroke="#8884d8"
              fill="var(--highlight-color)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CustomersCount;
