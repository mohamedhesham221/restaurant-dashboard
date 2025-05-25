import * as React from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";
// OrdersTable component manages the display of orders and their details
const OrdersTable = () => { 
  const [currentOrder, setCurrentOrder] = React.useState(null); // State to track the currently selected order

  return (
    <>
      <Container>
								
        <Typography variant="h2" align="left" fontFamily="var(--font)">Orders</Typography>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={8}>
          {/* OrdersList displays the list of orders and allows selecting an order */}
          <OrdersList setCurrentOrder={setCurrentOrder} />
          <Divider orientation="vertical" flexItem />
          {/* OrderDetails displays details of the selected order */}
          <OrderDetails order={currentOrder} />
        </Stack>
      </Container>
    </>
  );
};

export default OrdersTable;
