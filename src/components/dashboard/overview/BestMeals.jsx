import * as React from "react";
import { useMeals } from "../../../hooks/useMeals";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Box,
	Stack
} from "@mui/material";
// Component to display the best meals based on their rating and orders
const BestMeals = () => {
	const { data: meals, isLoading } = useMeals(); // Custom hook to fetch meals data

	// Show loading message while data is being fetched
	if (isLoading) return <p>Loading . . .</p>;

	return (
		<>
			<Box sx={{ width: "100%", maxWidth: "550px", overflowY: "scroll", height: "400px" }} flexGrow={1}>
				{/* Title for the Best Dishes section */}
				<Typography variant="h4" gutterBottom align="left" fontFamily="var(--font)">
					Best Dishes
				</Typography>

				{/* Table to display meals */}
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 400 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								{/* Table headers */}
								<TableCell sx={{ fontFamily: "var(--font)" }}>Meal</TableCell>
								<TableCell align="right" sx={{ fontFamily: "var(--font)" }}>
									Orders
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* Filter meals with a rating greater than 4 and map them to table rows */}
							{meals
								.filter((meal) => meal.rate >= 4.5)
								.map((meal) => (
									<TableRow
										key={meal.name}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										{/* Meal details with image and name */}
										<TableCell
											component="th"
											scope="row"
											sx={{
												display: "flex",
												alignItems: "center",
												gap: "10px",
												fontFamily: "var(--font)",
											}}
										>
											<Box
												component="img"
												src={meal.img}
												alt={meal.name}
												sx={{
													width: "60px",
													height: "60px",
													borderRadius: "10px",
													objectFit: "cover",
												}}
											></Box>
											<Stack
												direction="column"
												spacing={1}
												sx={{ fontFamily: "var(--font)" }}
											>
												{/* Meal name */}
												{meal.name}
												{/* Meal price */}
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
											</Stack>
										</TableCell>
										{/* Number of orders for the meal */}
										<TableCell
											align="right"
											sx={{ fontSize: "1.5rem", fontFamily: "var(--font)" }}
										>
											{meal.ordersCount}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default BestMeals;
