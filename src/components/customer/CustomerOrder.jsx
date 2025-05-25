import * as React from "react";
import useOrderStore from "../../store/useOrderStore";
import {
	Container,
	Box,
	Typography,
	Button,
	Stack,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableContainer,
	TableRow,
	Paper,
} from "@mui/material";

// Component to display customer orders and their details
const CustomerOrder = () => { 
  // Retrieve orders and tax from the store
  const orderBag = useOrderStore((state) => state.orders);
  const tax = useOrderStore((state) => state.tax);

  // Function to calculate the total cost of orders
  const calcTotalOrders = () => {
    const total = orderBag.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return Number(total.toFixed(2));
  };

  return (
    <>
      {/* Layout for the customer order details */}
      <Stack direction={{xs: "column", lg: "row"}} spacing={4}>
        {/* Table to display order details */}
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "unset", width: { xs: "100%", md: "70%" } }}
        >
          <Table
            sx={{ minWidth: 650, backgroundColor: "var(--card-bg-color)" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontSize: "1.5rem", color: "var(--primary-text)", fontFamily: "var(--font)" }}
                >
                  Meal
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.5rem", color: "var(--primary-text)", fontFamily: "var(--font)" }}
                  align="center"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.5rem", color: "var(--primary-text)", fontFamily: "var(--font)" }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.5rem", color: "var(--primary-text)", fontFamily: "var(--font)" }}
                  align="center"
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Map through orders and display each order */}
              {orderBag.map((order) => (
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
                      fontSize: "1.5rem",
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
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    ></Box>
                    {order.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "1.5rem",
                      color: "var(--highlight-color)",
                      fontFamily: "var(--font)"
                    }}
                  >
                    {/* Display price */}
                    ${order.price}
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

        {/* Display summary box if there are orders */}
        {orderBag.length > 0 && (
          <Box
            component={"div"}
            sx={{
              width: { xs: "100%", md: "30%" },
              height: "fit-content",
              borderRadius: "4px",
              padding: "2rem",
              backgroundColor: "var(--card-bg-color)",
            }}
          >
            <Stack direction="column" spacing={"8px"}></Stack>
              {/* Subtotal */}
              <Stack
                direction="row"
                spacing={"8px"}
                justifyContent={"space-between"}
                sx={{
                  color: "var(--primary-text)",
                }}
              >
                <Typography variant="body1" fontSize="1.5rem" fontFamily= "var(--font)">
                  subtotal
                </Typography>
                <Typography variant="body1" fontSize="1.5rem" fontFamily= "var(--font)">
                  ${calcTotalOrders()}
                </Typography>
              </Stack>

              {/* Tax */}
              <Stack
                direction="row"
                spacing={"8px"}
                justifyContent={"space-between"}
                sx={{
                  color: "var(--secondary-text)",
                }}
              >
                <Typography variant="body1" fontSize="1rem" fontFamily= "var(--font)">
                  tax
                </Typography>
                <Typography variant="body1" fontSize="1rem" fontFamily= "var(--font)">
                  ${tax.toFixed(2)}
                </Typography>
              </Stack>

              {/* Divider */}
              <Divider
                orientation="horizontal"
                sx={{
                  marginTop: "2rem",
                  width: "100%",
                  borderBottom: "4px dashed var(--bg-color)",
                  backgroundColor: "transparent",
                  height: "4px",
                }}
              />

              {/* Total */}
              <Stack
                direction="row"
                spacing={"8px"}
                justifyContent={"space-between"}
                sx={{
                  color: "var(--primary-text)",
                }}
              >
                <Typography variant="body1" fontSize="1.5rem" fontFamily= "var(--font)">
                  total
                </Typography>
                <Typography variant="body1" fontSize="1.5rem" fontFamily= "var(--font)">
                  ${calcTotalOrders() + Number(tax.toFixed(2))}
                </Typography>
            </Stack>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default CustomerOrder;
