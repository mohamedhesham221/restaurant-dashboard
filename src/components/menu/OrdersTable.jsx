import * as React from "react";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useOrderStore from "../../store/useOrderStore";
// OrdersTable component displays a table of orders with functionalities to increase, decrease, or remove items.
const OrdersTable = ({ orderBag }) => {
	const removeOrder = useOrderStore((state) => state.removeOrder);
	const decreaseQuantity = useOrderStore((state) => state.decreaseQuantity);
	const increaseQuantity = useOrderStore((state) => state.increaseQuantity);

	// Handles the removal of an order. If the quantity is 1, it removes the order completely.
	const handleRemoveOrder = (order) => {
		if (order.quantity === 1) {
			return removeOrder(order.id)
		}
		decreaseQuantity(order.id)
	}
	
	return (
		<>
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
								sx={{ fontSize: "1.5rem", color: "var(--primary-text)",fontFamily: "var(--font)" }}
							>
								Meal
							</TableCell>
							<TableCell
								sx={{ fontSize: "1.5rem", color: "var(--primary-text)",fontFamily: "var(--font)" }}
								align="center"
							>
								Price
							</TableCell>
							<TableCell
								sx={{ fontSize: "1.5rem", color: "var(--primary-text)",fontFamily: "var(--font)" }}
								align="center"
							>
								Quantity
							</TableCell>
							<TableCell
								sx={{ fontSize: "1.5rem", color: "var(--primary-text)",fontFamily: "var(--font)" }}
								align="center"
							>
								Total
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* Iterate over the orderBag array to display each order */}
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
									{/* Display the meal image and name */}
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
									{/* Display the price of the meal */}
									${order.price}
								</TableCell>
								<TableCell align="center">
									{/* Controls to increase or decrease the quantity */}
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="center"
									>
										<Button onClick={() => handleRemoveOrder(order)}>
											<RemoveCircleIcon
												sx={{
													color: "var(--secondary-text)",
												}}
											/>
										</Button>
										<Typography
											variant="body1"
											sx={{
												color: "var(--secondary-text)",
												fontFamily: "var(--font)"
											}}
										>
											{order.quantity}
										</Typography>
										<Button onClick={() => increaseQuantity(order.id)}>
											<AddCircleOutlineIcon
												sx={{
													color: "var(--secondary-text)",
												}}
											/>
										</Button>
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
									{/* Display the total cost for the meal */}
									${(order.quantity * order.price).toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default OrdersTable;
