import * as React from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";
// OrdersTable component manages the display of orders and their details
const statusColors = [
  {
    label: "new",
    color: "#2196f3",
  },
  {
    label: "confirmed",
    color: "#3f51b5",
  },
  {
    label: "preparing",
    color: "#ff9800",
  },
  {
    label: "ready",
    color: "#4caf50",
  },
  {
    label: "delivered",
    color: "#388e3c",
  },
  {
    label: "cancelled",
    color: "#f44336",
  },
];

const OrdersTable = () => {
  const [currentOrder, setCurrentOrder] = React.useState(null); // State to track the currently selected order
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container>
        <Typography variant="h2" align="left" fontFamily="var(--font)">
          Orders
        </Typography>
        {/* OrdersList displays the list of orders and allows selecting an order */}
        <OrdersList setCurrentOrder={setCurrentOrder} handleOpen={handleOpen} statusColors={statusColors} />
        {/* OrderDetails displays details of the selected order */}
        <OrderDetails
          order={currentOrder}
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          statusColors={statusColors}
        />
      </Container>
    </>
  );
};

export default OrdersTable;
