import * as React from "react";
import {
  Typography,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
} from "@mui/material";
import BarOverview from "./charts/BarOverview";
import AreaOverview from "./charts/AreaOverview";
import LineOverview from "./charts/LineOverview";
// Component to display a bar chart of daily sales data
const Sells = () => {
  const [chart, setChart] = React.useState("bar");
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
  // Chart type options
  const charts = [
    {
      label: "Bar",
      value: "bar",
    },
    {
      label: "Area",
      value: "area",
    },
    {
      label: "Line",
      value: "line",
    },
  ];
  // Handle chart type selection
  const handleSelect = (e) => {
    setChart(e.target.value);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          height: { xs: 300, sm: 400, md: 500 },
          marginX: "auto",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          gutter={2}
          mb={3}
        >
          <Stack direction="column">
            <Typography
              variant="h4"
              align="left"
              fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
              fontFamily="var(--font)"
            >
              Weakly Sales
            </Typography>
            <Typography
              variant="body1"
              align="left"
              color="var(--secondary-text)"
              fontFamily="var(--font)"
              fontSize={{ xs: "0.8rem", sm: "1rem" }}
            >
              track your sales performance at a glance
            </Typography>
          </Stack>
          {/** Chart Type Selector */}
          <Box component={"form"}>
            <FormControl  sx={{ minWidth: 120 }} size="small">
              <InputLabel id="chart-select-label">Chart Type</InputLabel>
              <Select
                labelId="chart-select-label"
                id="chart-select"
                label="Chart Type"
                value={chart}
                onChange={handleSelect}
              >
                {charts.map((chart) => (
                  <MenuItem
                    name={chart.label}
                    id={chart.label}
                    key={chart.label}
                    value={chart.value}
                    sx={{ fontFamily: "var(--font)" }}
                  >
                    {chart.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>

        {/* Responsive container for the bar chart */}
        {chart === "bar" && <BarOverview data={data} />}
        {chart === "area" && <AreaOverview data={data} />}
        {chart === "line" && <LineOverview data={data} />}
      </Box>
    </>
  );
};

export default Sells;
