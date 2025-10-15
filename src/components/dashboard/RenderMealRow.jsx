import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
	Box,
	TableCell,
	TableRow,
	Button,
	ButtonGroup,
	tableCellClasses,
	Typography,
	Stack,
} from "@mui/material";
import {deleteMeal} from "../../firebase/mealsDB";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Component to render a single meal row in the dashboard table
// RenderMealRow: Component to render a single meal row in the dashboard table
const RenderMealRow = ({ meal, styled, setModalType , setOpenModal, setMealId}) => { 
	// StyledTableCell: Custom styled table cell using MUI's styling system
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: "#10181B",
			color: theme.palette.common.white,
			fontFamily: "var(--font)",
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			fontFamily: "var(--font)",
		},
	}));

	// StyledTableRow: Custom styled table row using MUI's styling system
	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
		// Hide the border for the last row
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	}));

	// Initialize query client for react-query
	const queryClient = useQueryClient();

	// Mutation for deleting a meal
	const deleteMutation = useMutation({
		mutationFn: deleteMeal,
		onSuccess: () => queryClient.invalidateQueries({queryKey: "meals"})
	});

	// Handle delete action
	const onDelete = () => {
		deleteMutation.mutate(meal.id);
	};
	
	return (
		<>
			<StyledTableRow key={meal.id}>
				{/* Meal image */}
				<StyledTableCell component="th" scope="row" align="center">
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
					/>
				</StyledTableCell>
				{/* Meal details */}
				<StyledTableCell align="center">{meal.name}</StyledTableCell>
				<StyledTableCell align="center">${meal.price}</StyledTableCell>
				<StyledTableCell align="center">{meal.ordersCount}</StyledTableCell>
				<StyledTableCell align="center">
					{/* Meal rating with trend icon */}
					<Stack direction={"row"} spacing={1}>
						<Typography
							variant="body1"
							color={meal.rate >= 4.5 ? "#73946B" : " #E55050"}
						>
							{meal.rate >= 4.5 ? <TrendingUpIcon /> : <TrendingDownIcon />}
						</Typography>
						<Typography variant="body1" fontFamily="var(--font)">{meal.rate}</Typography>
					</Stack>
				</StyledTableCell>
				<StyledTableCell align="center">{meal.serves}</StyledTableCell>
				<StyledTableCell align="center">{meal.time} min</StyledTableCell>
				{/* Action buttons for editing and deleting meals */}
				<StyledTableCell align="center">
					<ButtonGroup variant="taxt">
						<Button
							variant="text"
							startIcon={<EditIcon />}
							sx={{
								fontWeight: "500",
								color: "#73946B",
								textTransform: "none",
								fontFamily:"var(--font)",
							}}
							onClick={() => {
								setModalType("edit");
								setOpenModal(true);
								setMealId(meal.id);
							}}
						>
							Edit
						</Button>
						<Button
							variant="text"
							startIcon={<DeleteIcon />}
							sx={{
								fontWeight: "500",
								color: "#E55050",
								textTransform: "none",
								fontFamily:"var(--font)",

							}}
							onClick={onDelete}
						>
							Delete
						</Button>
					</ButtonGroup>
				</StyledTableCell>
			</StyledTableRow>
		</>
	);
};

export default RenderMealRow;
