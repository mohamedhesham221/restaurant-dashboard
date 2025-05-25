import * as React from "react";
import {
	Table,
	TableBody,
	TableContainer,
	TableCell,
	TableRow,
	TableHead,
	Paper,
	Box,
	Stack,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrders, deleteOrder } from "../../firebase/ordersDB";

// Component to display order details and allow status updates or deletion
const OrderDetailsMeals = ({ order, orderStatus, status, setOrderStatus }) => {
  const queryClient = useQueryClient();

  // Mutation to update order status
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateOrders({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // Mutation to delete an order
  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: "orders" }),
  });

  // Handle delete action
  const onDelete = () => {
    deleteMutation.mutate(order.id);
  };

  // Handle status change
  const handleChange = (e) => {
    const newStatus = e.target.value;
    setOrderStatus(newStatus);
    const data = { status: newStatus };
    updateMutation.mutate({ id: order.id, data });
  };

  return (
    <>
      {/* Table to display order details */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "unset",
          width: { xs: "100%" },
          marginTop: "50px",
        }}
      >
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1.5rem", fontFamily: "var(--font)" }}>Meal</TableCell>
              <TableCell sx={{ fontSize: "1.5rem", fontFamily: "var(--font)" }} align="center">
                Quantity
              </TableCell>
              <TableCell sx={{ fontSize: "1.5rem", fontFamily: "var(--font)" }} align="center">
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through orders and display each order */}
            {order.orderBag.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "10px",
                    fontSize: "1rem",
                    color: "var(--highlight-color)",
                    fontFamily: "var(--font)"
                  }}
                >
                  {/* Display meal image and name */}
                  <Box
                    component="img"
                    src={order.img}
                    alt={order.name}
                    sx={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  ></Box>
                  {order.name}
                </TableCell>
                <TableCell align="center">
                  {/* Display quantity */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "var(--secondary-text)",
                        fontFamily: "var(--font)"
                      }}
                    >
                      {order.quantity}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.5rem",
                    color: "var(--highlight-color)",
                    fontFamily: "var(--font)"
                  }}
                >
                  {/* Display total cost for the order */}
                  ${(order.quantity * order.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Controls for updating status and deleting order */}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={2} mt={4}>
        <FormControl
          sx={{ marginTop: "50px", width: { xs: "100%", lg: "70%" } }}
        >
          <InputLabel id="demo-simple-select-label" sx={{fontFamily: "var(--font)"}}>Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={handleChange}
          >
            {/* Map through available statuses */}
            {orderStatus.map((status, index) => {
              return (
                <MenuItem key={index} value={status.label} sx={{fontFamily: "var(--font)"}}>
                  {status.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          size="small"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          sx={{
            backgroundColor: "#E55050",
            fontWeight: "500",
            color: "var(--primary-text)",
            textTransform: "none",
            width: { xs: "100%", lg: "30%" },
            fontFamily: "var(--font)"
          }}
        >
          Delete Order
        </Button>
      </Stack>
    </>
  );
};

export default OrderDetailsMeals;
