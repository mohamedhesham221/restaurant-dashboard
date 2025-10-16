import * as React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useOrders } from "../../../hooks/useOrders";
import Loading from "../../Loading";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaymentIcon from "@mui/icons-material/Payment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// Component to display a list of orders with their details
// Allows selecting an order to view more details
const OrdersList = ({ setCurrentOrder, handleOpen, statusColors }) => {
  const { data: orders, isLoading } = useOrders();
  const pricesArray = orders?.map((order) => order.orderBag) || [];

  // Show loading spinner while data is being fetched
  if (isLoading) return <Loading />;
  return (
    <>
      <Stack direction={{ xs: "column", lg: "row" }} gap={2} flexWrap="wrap">
        {/* Map through the orders and display each as a card */}
        {orders.map((order, index) => {
          return (
            <Card
              sx={{
                minWidth: { xs: 275, lg: 350 },
                textAlign: "left",
                cursor: "pointer",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: "1px solid #e0e0e0",
                boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                },
              }}
              key={order.id}
            >
              <CardContent sx={{ p: 3, position: "relative" }}>
                <Chip
                  label={order.status}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    fontWeight: "600",
                    fontFamily: "var(--font)",
                    color: statusColors.find((s) => s.label === order.status)
                      ?.color,
                  }}
                />
                <Typography
                  gutterBottom
                  fontFamily="var(--font)"
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    letterSpacing: 0.3,
                  }}
                >
                  Order ID: <b>#{order.id.slice(0, 5).toUpperCase()}</b>
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={600}
                  fontFamily="var(--font)"
                  sx={{ mb: 2, color: "text.primary" }}
                >
                  {order.name}
                </Typography>

                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <RestaurantIcon
                      sx={{ fontSize: 20, color: "var(--highlight-color)" }}
                    />
                    <Typography
                      sx={{ color: "text.secondary" }}
                      fontFamily="var(--font)"
                    >
                      <strong>Meals:</strong> {order.orderBag.length}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <PaymentIcon
                      sx={{ fontSize: 20, color: "var(--highlight-color)" }}
                    />
                    <Typography
                      sx={{ color: "text.secondary" }}
                      fontFamily="var(--font)"
                    >
                      <strong>Payment:</strong> {order.payment}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <AttachMoneyIcon
                      sx={{ fontSize: 20, color: "var(--highlight-color)" }}
                    />
                    <Typography
                      sx={{ color: "text.secondary" }}
                      fontFamily="var(--font)"
                    >
                      <strong>Total:</strong> $
                      {pricesArray[index]
                        ?.reduce((acc, item) => acc + Number(item.price), 0)
                        .toFixed(2) || 0}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>

              <CardActions sx={{ px: 3, pb: 3 }}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--highlight-color)",
                    color: "var(--primary-text)",
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "var(--font)",
                    borderRadius: "12px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "var(--highlight-color-hover, #4caf50)",
                      transform: "scale(1.02)",
                    },
                  }}
                  onClick={() => {
                    setCurrentOrder(order);
                    handleOpen();
                  }}
                >
                  View Details
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
