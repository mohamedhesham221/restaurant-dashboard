import * as React from "react";
import { Container, Box, Stack, Typography, FormControl, TextField } from "@mui/material";
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
    const [query, setQuery] = React.useState(""); // State to manage search query
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const handleSearch = (e) => {
    setQuery(e.target.value); // Update search query on input change
  };

  return (
    <>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginBottom={4}
        >
        <Typography
          variant="h2"
          align="left"
          fontFamily="var(--font)"
          >
          Orders
        </Typography>
        <Box component={"form"}>
            <FormControl>
              <TextField
                label="Search"
                variant="standard"
                placeholder="Type Order ID"
                size="small"
                sx={{ width: { xs: "100%", lg: "300px" } }}
                value={query}
                onChange={handleSearch}
              />
            </FormControl>
            </Box>
          </Stack>
        {/* OrdersList displays the list of orders and allows selecting an order */}
        <OrdersList
          setCurrentOrder={setCurrentOrder}
          handleOpen={handleOpen}
          statusColors={statusColors}
          query={query}
        />
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
