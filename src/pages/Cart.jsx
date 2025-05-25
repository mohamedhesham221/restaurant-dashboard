import * as React from "react";
import {
	Container,
	Box,
	Typography,
	Button,
	Stack,
	Divider,
	Snackbar,
	Alert,
} from "@mui/material";
import Layout from "../layouts/layout";
import { OrdersTable } from "../components/menu";
import useOrderStore from "../store/useOrderStore";
import { useNavigate } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

// Cart component to display the user's order bag and calculate totals
const Cart = () => {
	const navigate = useNavigate();
	// Retrieve orders and tax from the order store
	const orderBag = useOrderStore((state) => state.orders);
	const tax = useOrderStore((state) => state.tax);
	const handleClick = () => {
		// Clear the orders from the cart after placing the order
			navigate("/customer");
	};

	// const clearBag = useOrderStore((state) => state.clearOrders);

	// Function to calculate the total price of orders
	const calcTotalOrders = () => {
		const total = orderBag.reduce(
			(acc, curr) => acc + curr.price * curr.quantity,
			0
		);
		return Number(total.toFixed(2));
	};

	// Render the Cart component UI
	return (
		<>
		<PageMeta
						title={metaData.cart.title}
						description={metaData.cart.description}
					/>
			<Layout>
				<Container maxWidth="lg" sx={{ padding: "2rem" }}>
					{/* Header section */}
					<Typography
						variant="h1"
						sx={{
							color: "var(--primary-text)",
							fontSize: { xs: "2rem", md: "4rem" },
							 fontFamily: "var(--font)",
						}}
					>
						Orders Bag
					</Typography>
					<Typography
						variant="body"
						sx={{
							color: "var(--secondary-text)",
							fontSize: { xs: "1rem", md: "2rem" },
							fontFamily: "var(--font)",
						}}
					>
						{orderBag.length} meals in your bag !
					</Typography>

					{/* Main content section */}
					<Stack
						direction={{ xs: "column", md: "row" }}
						spacing={"10px"}
						sx={{ my: 5 }}
					>
						{/* Display message if cart is empty */}
						{orderBag.length === 0 ? (
							<Typography
								variant="h5"
								color="var(--secondary-text)"
								width="100%"
								textAlign="center"
								fontFamily= "var(--font)"
							>
								Cart empty! <br /> Add order to your bag
							</Typography>
						) : (
							// Display orders table if there are items in the cart
							<OrdersTable orderBag={orderBag} />
						)}

						{/* Summary section */}
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
								<Stack direction="column" spacing={"8px"}>
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

									{/* Place order button */}
									<Button
										sx={{
											backgroundColor: "var(--highlight-color)",
											color: "var(--primary-text)",
											fontFamily: "var(--font)",
										}}
										onClick={() => handleClick()}
									>
										place order
									</Button>
								</Stack>
							</Box>
						)}
					</Stack>
				</Container>
				
			</Layout>
		</>
	);
};

export default Cart;
