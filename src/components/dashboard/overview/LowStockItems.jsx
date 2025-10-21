import React from "react";
import Loading from "../../Loading";
import { useInventory } from "../../../hooks/useInventory";
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
  LinearProgress,
} from "@mui/material";

const LowStockItems = () => {
  const { data: inventory, isLoading } = useInventory(); // Custom hook to fetch inventory data
  if (isLoading) return <Loading />;

  /**
   * Filters inventory items to get only those with "low" status
   * @type {Array}
   */
  const lowStockItems =
    inventory?.filter((item) => item.status === "low") || [];

  return (
    <>
      <Box sx={{ width: "100%", height: 400 }}>
        <Typography
          variant="h4"
          align="left"
          fontFamily="var(--font)"
          fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
        >
          Low Stock Items
        </Typography>
        <Typography variant="body1"
          gutterBottom
          align="left"
          color="var(--secondary-text)"
          fontFamily="var(--font)"
          fontSize={{ xs: "0.7=8rem", md: "1rem" }}
        >
          Track your items to restock before they impact your service
        </Typography>
        <Box
          sx={{
            overflowY: "auto",
            height: 350,
            p: 1,
          }}
          flexGrow={1}
        >
          {lowStockItems.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 4 }}
            >
              All items are sufficiently stocked
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 400 }} aria-label="low stock table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Unit</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lowStockItems.map((row) => (
                    <TableRow
                      key={row.item}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.item}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "var(--font)", textTransform: "capitalize" }}>{row.category}</TableCell>
                      <TableCell align="center">
                        <Stack spacing={0.5}>
                          <Typography>{row.quantity}</Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(row.quantity / row.maxQuantity) * 100}
                            color="error"
                            sx={{
                              height: 6,
                              borderRadius: 5,
                              width: "100%",
                            }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell align="center" sx={{ fontFamily: "var(--font)", textTransform: "capitalize" }}>{row.unit}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status}
                          color={
                            row.status === "low"
                              ? "error"
                              : row.status === "moderate"
                                ? "warning"
                                : "success"
                          }
                          size="small"
                          sx={{ textTransform: "capitalize" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LowStockItems;
