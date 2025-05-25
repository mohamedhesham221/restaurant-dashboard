import * as React from "react";
import {
	Typography,
	Card,
	CardActions,
	CardContent,
	Button,
	Stack,
} from "@mui/material";
import { useOrders } from "../../hooks/useOrders";
import Loading from "../../components/Loading";

// Component to display a list of orders with their details
// Allows selecting an order to view more details
const OrdersList = ({setCurrentOrder}) => { 
  const { data: orders, isLoading } = useOrders();

  // Show loading spinner while data is being fetched
  if (isLoading) return <Loading />;
  return (
    <>
      <Stack direction={"column"} spacing={2}>
        {/* Map through the orders and display each as a card */}
        {orders.map((order) => {
          return (
            <Card
              sx={{
                minWidth: {xs:275, lg: 400},
                textAlign: "left",
                cursor: "pointer",
                borderBottom: "4px solid var(--highlight-color)",
                "&:hover": {
                  backgroundColor: "#797b781b",
                },
              }}
              key={order.id}
            >
              <CardContent>
                {/* Display order ID and name */}
                <Typography
                  gutterBottom
                  fontFamily="var(--font)"
                  sx={{ color: "text.secondary", fontSize: 20 }}
                >
                  Order ID: #{order.id.slice(0, 5).toUpperCase()}
                </Typography>
                <Typography variant="h5" component="div" fontFamily="var(--font)">
                  {order.name}
                </Typography>
                {/* Display order details such as number of meals and payment method */}
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography sx={{ color: "text.secondary" }} fontFamily="var(--font)">
                    Meals <br /> {order.orderBag.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary",fontFamily:"var(--font)", }}>
                    Payment Method <br />
                    <Typography variant="body2" component={"span"} display={"flex"} justifyContent={"space-evenly"} fontFamily="var(--font)">
                     
                      {order.payment}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }} fontFamily="var(--font)">
                    Price <br /> ${order.orderBag.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                {/* Button to view order details */}
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--highlight-color)",
                    fontWeight: "500",
                    color: "var(--primary-text)",
                    textTransform: "none",
                    fontFamily:"var(--font)",
                  }}
                  onClick={() => setCurrentOrder(order)}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    </>
  );
};

export default OrdersList;
