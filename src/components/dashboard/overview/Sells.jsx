import * as React from "react";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";
import {Typography, Box} from "@mui/material";
// Sample data for daily sales
const data = [
  { day: "Sat", total: 550 },
  { day: "Sun", total: 480 },
  { day: "Mon", total: 420 },
  { day: "Tue", total: 640 },
  { day: "Wed", total: 720 },
  { day: "Thu", total: 685 },
  { day: "Fri", total: 880 },
];

// Component to display a bar chart of daily sales data
const Sells = () => { 
	return (
		<>
		<Box sx={{ width: "100%", maxWidth: "550px"}} flexGrow={1}>
		<Typography
			variant="h4"
			gutterBottom
			align="left"
			fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
			fontFamily="var(--font)"
		>
			Daily Sales Overview
		</Typography>

		{/* Responsive container for the bar chart */}
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
		</Box>
		</>
	);
};

export default Sells;
