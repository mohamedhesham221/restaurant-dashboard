import React from "react";
import Loading from "../../Loading";
import { useOrders } from "../../../hooks/useOrders";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";

// Map of order status labels to colors used for Chip styling
const statusColors = [
  { label: "new", color: "#2196f3" }, // blue
  { label: "confirmed", color: "#3f51b5" }, // indigo
  { label: "preparing", color: "#ff9800" }, // orange
  { label: "ready", color: "#4caf50" }, // green
  { label: "delivered", color: "#388e3c" }, // dark green
  { label: "cancelled", color: "#f44336" }, // red
];

const RecentOrder = () => {
  const { data: orders, isLoading } = useOrders(); // Custom hook to fetch orders data

  if (isLoading) return <Loading />;
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "550px",
        overflowY: "scroll",
        height: "400px",
      }}
      flexGrow={1}
    >
      {/* Title for recent orders section */}
      <Typography
        variant="h4"
        gutterBottom
        align="left"
        fontFamily="var(--font)"
      >
        Recent Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="recent orders table">
          <TableHead>
            <TableRow>
              {/* Table headers */}
              <TableCell sx={{ fontFamily: "var(--font)" }}>Name</TableCell>
              <TableCell align="" sx={{ fontFamily: "var(--font)" }}>
                Orders
              </TableCell>
              <TableCell sx={{ fontFamily: "var(--font)" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Filter meals with a rating greater than 4 and map them to table rows */}
            {orders.slice(0, 4).map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Meal details with image and name */}
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font)",
                  }}
                >
                  {order.name}
                </TableCell>
                <TableCell>
                  <Stack
                    direction="column"
                    spacing={1}
                    sx={{ fontFamily: "var(--font)" }}
                  >
                    {order.orderBag.map((o) => {
                      return (
                        <Typography
                        key={o.name}
                          variant="body2"
                          color="var(--highlight-color)"
                        >
                          {o.name} @{o.quantity}
                        </Typography>
                      );
                    })}
                  </Stack>
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", fontFamily: "var(--font)" }}>
                  <Chip
                    label={order.status}
                    sx={{
                      color: statusColors.find((s) => s.label === order.status)
                        ?.color,
                      backgroundColor:
                        statusColors.find((s) => s.label === order.status)
                          ?.color + "28",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentOrder;
