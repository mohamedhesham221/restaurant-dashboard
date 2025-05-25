import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Box,
	TableCell,
	TableRow,
	Button,
	ButtonGroup,
	tableCellClasses,
	Avatar,
} from "@mui/material";

const RendeReservationRow = ({
	styled,
	setFormType,
	setReservationId,
	reservation,
	handleModalOpen,
	setOpenDeleteModal,
}) => {
	// StyledTableCell: Custom styled table cell using MUI's styling system
	const StyledTableCell = styled(TableCell)(() => ({
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			fontFamily: "var(--font)",
			whiteSpace: "nowrap",
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

	const date = new Date(reservation.date);
	const options = { day: "2-digit", month: "short", year: "numeric" };
	const formattedDate = date.toLocaleDateString("en-US", options);
	return (
		<>
			<StyledTableRow key={reservation.id}>
				{/* reservation image */}
				<StyledTableCell component="th" scope="row" align="center">
					<Avatar>{reservation.name.slice(0, 1)}</Avatar>
				</StyledTableCell>
				{/* reservation details */}
				<StyledTableCell align="center">{reservation.name}</StyledTableCell>
				<StyledTableCell align="center">{reservation.mobile}</StyledTableCell>
				<StyledTableCell align="center">{reservation.email}</StyledTableCell>
				<StyledTableCell align="center">{formattedDate}</StyledTableCell>
				<StyledTableCell align="center">{reservation.time} </StyledTableCell>
				<StyledTableCell align="center">{reservation.guests} </StyledTableCell>
				<StyledTableCell align="center">{reservation.notes} </StyledTableCell>

				{/* Action buttons for editing and deleting reservations */}
				<StyledTableCell align="center">
					<ButtonGroup variant="taxt">
						<Button
							variant="text"
							startIcon={<EditIcon />}
							sx={{
								fontWeight: "500",
								color: "#73946B",
								textTransform: "none",
								fontFamily: "var(--font)",
							}}
							onClick={() => {
								setFormType("edit");
								setReservationId(reservation.id);
								handleModalOpen();
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
								fontFamily: "var(--font)",
							}}
							onClick={() => {
								setReservationId(reservation.id);
								setOpenDeleteModal(true)
							}}
						>
							Delete
						</Button>
					</ButtonGroup>
				</StyledTableCell>
			</StyledTableRow>
		</>
	);
};

export default RendeReservationRow;
