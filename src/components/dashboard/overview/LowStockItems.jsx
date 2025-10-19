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
  const { data: inventory, isLoading } = useInventory();
  if (isLoading) return <Loading />;

/**
 * Filters inventory items to get only those with "low" status
 * @type {Array}
 */
  const lowStockItems =
    inventory?.filter((item) => item.status === "low") || [];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "650px",
        overflowY: "auto",
        height: "400px",
        p: 1,
      }}
      flexGrow={1}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="left"
        fontFamily="var(--font)"
      >
        Low Stock Items
      </Typography>

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
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="center">
                    <Stack spacing={0.5}>
                      <Typography>{row.quantity}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(row.quantity * 5, 100)}
                        color="error"
                        sx={{
                          height: 6,
                          borderRadius: 5,
                          width: "100%",
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">{row.unit}</TableCell>
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
  );
};

export default LowStockItems;
