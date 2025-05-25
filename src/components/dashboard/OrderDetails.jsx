import * as React from "react";
import { Divider, Stack, Typography, Box } from "@mui/material";
import OrderDetailsMeals from "./OrderDetailsMeals";
const orderStatus = [
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
// Component to display detailed information about a specific order
const OrderDetails = ({ order }) => { 
  const [status, setOrderStatus] = React.useState("");

  // Log the order object for debugging purposes
  console.log(order);

  // Format the order creation date
  const date = order?.createdAt.toDate().toLocaleString("en-US");

  // If no order is provided, display a message
  if (!order)
    return (
      <Typography
        variant="h5"
        color="var(--secondary-text)"
        width="100%"
        margin={"auto"}
      >
        No Order Details
      </Typography>
    );

  // Render the order details
  return (
    <>
      <Box component={"div"} sx={{ width: "100%" }}>
        {/* Header section with order ID and status */}
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="h2"
            fontFamily={"var(--font)"}
            fontSize={{ xs: "1rem", lg: "1.5rem" }}
            gutterBottom
          >
            Order #{order.id.slice(0, 5).toUpperCase()}
          </Typography>
          <Typography
            variant="body1"
            color={
              !status
                ? orderStatus.find((item) => item.label === order.status)
                : orderStatus.find((item) => item.label === status)
            }
            fontFamily={"var(--font)"}
            textTransform={"capitalize"}
            fontSize={{ xs: "0.8rem", lg: "1.2rem" }}
            fontWeight={600}
          >
            {!status ? order.status : status}
          </Typography>
        </Stack>
        <Divider />

        {/* Section for order details */}
        <Typography
          variant="body1"
          fontFamily={"var(--font)"}
          fontSize={{ xs: "0.8rem", lg: "1.2rem" }}
          fontWeight={600}
          align="left"
          mt={4}
        >
          Details
        </Typography>

        {/* Customer and order information */}
        <Stack direction={"row"} justifyContent={"space-evenly"} mt={4}>
          <Stack direction={"column"}>
            <Typography
              variant="body1"
              color="var(--secondary-text)"
              fontFamily={"var(--font)"}
              fontWeight={600}
            >
              Customer
            </Typography>
            <Typography variant="body2" fontFamily={"var(--font)"}>
              {order.name}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              variant="body1"
              color="var(--secondary-text)"
              fontFamily={"var(--font)"}
              fontWeight={600}
            >
              Mobile
            </Typography>
            <Typography variant="body2" fontFamily={"var(--font)"}>
              {order.phone}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              variant="body1"
              color="var(--secondary-text)"
              fontFamily={"var(--font)"}
              fontWeight={600}
            >
              City
            </Typography>
            <Typography variant="body2" fontFamily={"var(--font)"}>
              {order.city}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              variant="body1"
              color="var(--secondary-text)"
              fontFamily={"var(--font)"}
              fontWeight={600}
            >
              Payment
            </Typography>
            <Typography variant="body2" fontFamily={"var(--font)"}>
              {order.payment}
            </Typography>
          </Stack>
        </Stack>

        {/* Additional order details */}
        <Stack direction={"row"} justifyContent={"space-evenly"}  mt={4}>
          <Stack direction={"column"}>
            <Typography
              variant="body1"
              color="var(--secondary-text)"
              fontFamily={"var(--font)"}
              fontWeight={600}
            >
              Email Address
            </Typography>
            <Typography variant="body2" fontFamily={"var(--font)"}>
              {order.email}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              variant="body1"
              color="var(--secondary-text)"
              fontFamily={"var(--font)"}
              fontWeight={600}
            >
              Address
            </Typography>
            <Typography variant="body2" fontFamily={"var(--font)"}>
              {order.address}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              variant="body1"
              color="var(--secondary-text)"
              fontFamily={"var(--font)"}
              fontWeight={600}
            >
              Order Date
            </Typography>
            <Typography variant="body2" fontFamily={"var(--font)"}>
              {date}
            </Typography>
          </Stack>
        </Stack>

        {/* Meals and status update section */}
        <OrderDetailsMeals
          order={order}
          orderStatus={orderStatus}
          status={status}
          setOrderStatus={setOrderStatus}
        />
      </Box>
    </>
  );
};

export default OrderDetails;
