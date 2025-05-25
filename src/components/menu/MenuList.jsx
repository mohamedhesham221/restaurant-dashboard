import * as React from "react";
import {
	Container,
	Card,
	CardContent,
	Typography,
	CardMedia,
	CardActions,
	CardActionArea,
	Button,
	Grid,
	Stack,
	Divider,
} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { useMeals } from "../../hooks/useMeals";
import Loading from "../../components/Loading";
import useOrderStore from "../../store/useOrderStore";

// MenuList component displays a list of meals fetched from the useMeals hook.
// It allows users to add meals to their orders and handles the logic for increasing
// the quantity of an existing order or adding a new order.
const MenuList = () => {
	const { data: meals, isLoading } = useMeals(); // Fetch meals data and loading state
	const orders = useOrderStore((state) => state.orders); // Get current orders from the store
	const addOrder = useOrderStore((state) => state.addOrder); // Function to add a new order
	const increaseQuantity = useOrderStore((state) => state.increaseQuantity); // Function to increase quantity of an existing order

	// Handles adding a meal to the order
	const handleAddOrder = (meal) => {
		const existingOrder = orders.find((order) => order.id === meal.id); // Check if the meal is already in the orders
		console.log(existingOrder);

		if (existingOrder) {
			// If meal exists in orders, increase its quantity
			return increaseQuantity(meal.id);
		}
		// Otherwise, add the meal as a new order
		addOrder({
			id: meal.id,
			name: meal.name,
			img: meal.img,
			price: meal.price,
			quantity: 1,
		});
	};

	// Show loading spinner while meals are being fetched
	if (isLoading) return <Loading />;

	// Show a message if no meals are found
	if (!meals || meals.length === 0)
		return (
			<Typography
				variant="h2"
				component={"h1"}
				color="#fff"
				textAlign={"center"}
			>
				No Meals found
			</Typography>
		);

	// Render the list of meals
	return (
		<>
			<Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
				<Grid container spacing={2} justifyContent={"center"}>
					{meals.map((meal) => {
						return (
							<Card
								sx={{ maxWidth: 345, width: {xs: "100%",lg: "25%"},backgroundColor: "unset" }}
								key={meal.id}
							>
								<CardActionArea>
									<CardMedia
										component="img"
										height="140"
										image={meal.img}
										alt={meal.name}
									/>
									<CardContent sx={{ backgroundColor: "var(--card-bg-color)" }}>
										<Typography
											gutterBottom
											variant="h5"
											component="div"
											sx={{ color: "var(--highlight-color)", fontFamily: "var(--font)", }}
										>
											{meal.name}
										</Typography>

										<Stack
											direction={"row"}
											spacing={"6px"}
											alignmeals={"center"}
											sx={{ color: "var(--secondary-text)",fontFamily: "var(--font)", }}
										>
											<AccessAlarmsIcon />
											<Typography variant="body2"  fontFamily= "var(--font)">{meal.time} mins</Typography>
											<Divider
												orientation="vertical"
												variant="middle"
												flexmeal
												sx={{ backgroundColor: "var(--secondary-text)", }}
											/>
											{meal.serves > 1 ? <GroupIcon /> : <PersonIcon />}
											<Typography variant="body2" fontFamily= "var(--font)">
												{meal.serves} {meal.serves > 1 ? "persons" : "person"}
											</Typography>
										</Stack>

										<Typography
											variant="body2"
											sx={{
												color: "var(--highlight-color)",
												fontSize: "1.5rem",
												fontFamily: "var(--font)",
											}}
										>
											${meal.price}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions sx={{ backgroundColor: "var(--card-bg-color)" }}>
									<Button
										variant="contained"
										sx={{
											backgroundColor: "var(--highlight-color)",
											color: "var(--primary-text)",
											fontSize: { xs: "0.8rem" },
											padding: "0.5rem ",
											borderRadius: "4px",
											fontFamily: "var(--font)",
											"&:hover": {
												transform: "scale(1.05)",
											},
											marginX: 0,
										}}
										onClick={() => handleAddOrder(meal)}
									>
										Order Now
									</Button>
								</CardActions>
							</Card>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};

export default MenuList;
