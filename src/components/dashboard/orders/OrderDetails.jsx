import * as React from "react";
import {
  Divider,
  Stack,
  Typography,
  Box,
  Modal,
  Chip,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import OrderDetailsMeals from "./OrderDetailsMeals";
import DetailItem from "./DetailItem";

// Define the possible order statuses with their corresponding colors
// Component to display detailed information about a specific order
const OrderDetails = ({ order, open, handleClose, statusColors }) => {
  console.log("order status", order?.status);

  // Format the order creation date
  const date = order?.createdAt.toDate().toLocaleString("en-US");

  // If no order is provided, display a message
  if (!order)
    return (
      <Modal open={open} onClose={handleClose}>
        <Box component={"div"} sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            color="var(--secondary-text)"
            width="100%"
            margin={"auto"}
          >
            No Order Details
          </Typography>
        </Box>
      </Modal>
    );

  // Render the order details
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: { xs: "90%", md: "65%", lg: "50%" },
            mx: "auto",
            my: 6,
            p: { xs: 3, md: 4 },
            backgroundColor: "background.default",
            borderRadius: 4,
            boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
            outline: "none",
            overflowY: "auto",
            maxHeight: "85vh",
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" fontFamily="var(--font)" fontWeight={600}>
              Order #{order.id.slice(0, 5).toUpperCase()}
            </Typography>

            <Chip
              label={order.status}
              sx={{
                backgroundColor: statusColors.find(
                  (s) => s.label === order.status
                )?.color,
                color: "#fff",
                fontWeight: 600,
                textTransform: "capitalize",
                fontFamily: "var(--font)",
              }}
            />
          </Stack>
          <Divider />

          {/* Details */}
          <Typography
            variant="subtitle1"
            sx={{ mt: 3, mb: 2, fontWeight: 600, fontFamily: "var(--font)" }}
          >
            Customer Details
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
            }}
          >
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <DetailItem
                icon={<PersonIcon />}
                label="Customer"
                value={order.name}
              />
              <DetailItem
                icon={<PhoneIcon />}
                label="Mobile"
                value={order.phone}
              />
              <DetailItem
                icon={<EmailIcon />}
                label="Email"
                value={order.email}
              />
              <DetailItem
                icon={<PaymentIcon />}
                label="Payment"
                value={order.payment}
              />
              <DetailItem
                icon={<CalendarMonthIcon />}
                label="Order Date"
                value={date}
              />
              <DetailItem
                icon={<LocationOnIcon />}
                label="City"
                value={order.city}
              />
              <DetailItem
                icon={<HomeIcon />}
                label="Address"
                value={order.address}
              />
            </Stack>
          </Paper>

          {/* Meals Section */}
          <Typography
            variant="subtitle1"
            sx={{ mt: 4, mb: 2, fontWeight: 600, fontFamily: "var(--font)" }}
          >
            Ordered Meals
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >
            <OrderDetailsMeals order={order} orderStatus={statusColors} />
          </Paper>

          {/* Footer buttons */}
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontFamily: "var(--font)",
              }}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default OrderDetails;
