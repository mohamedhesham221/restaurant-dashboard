import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addReservation,
	updateReservation,
	getReservationById,
} from "../../firebase/reservationDB";
import {
	Box,
	TextField,
	FormControl,
	Button,
	Grid,
	Snackbar,
	Alert,
} from "@mui/material";

const fields = [
	{
		label: "name",
		variant: "outlined",
		type: "text",
		pattern: /^[A-Za-z\s'-]{2,50}$/, // Letters, spaces, hyphens, apostrophes, 2–50 chars
		message:
			"Please enter a valid name (2–50 characters, letters, spaces, hyphens, or apostrophes only).",
	},
	{
		label: "mobile",
		variant: "outlined",
		type: "tel", // Use 'tel' for phone numbers
		pattern: /^\+?\d{10,15}$/, // Optional + followed by 10–15 digits
		message:
			"Please enter a valid phone number (10–15 digits, optional country code).",
	},
	{
		label: "email",
		variant: "outlined",
		type: "email", // Use 'email' for email validation
		pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email format
		message: "Please enter a valid email address (e.g., example@domain.com).",
	},
	{
		label: "guests",
		variant: "outlined",
		type: "number", // Numeric input for party size
		min: 1, // Minimum 1 guest
		max: 10, // Maximum 12 guests (per reservation policy)
		message: "Please enter a valid number of guests (1–10).",
	},
	{
		label: "date",
		variant: "outlined",
		type: "date", // Date picker input
		min: new Date().toISOString().split("T")[0], // Restrict to today or later
		message: "Please select a valid date (today or later).",
	},
	{
		label: "time",
		variant: "outlined",
		type: "time", // Time picker input
		min: "12:00", // Earliest time (based on Sat–Wed hours)
		max: "24:00", // Latest time (based on Thu-Fri hours)
		message:
			"Please select a time within our operating hours (12:00 PM–00:00 AM).",
	},
	{
		label: "notes",
		variant: "outlined",
		type: "text",
		multiline: true,
		rows: 4,
		pattern: /^[A-Za-z0-9\s.,!?'"()-]{0,500}$/, //spaces, punctuation, up to 500 chars
		message:
			"If you haven't type 'NA' and Notes must be 500 characters or less and contain valid letters and numbers only.",
	},
];
const ReservationForm = ({ formType, reservationId, setReservationId, handleModalClose }) => {
	const [open, setOpen] = React.useState(false);
	const [dataWillEdit, setDataWillEdit] = React.useState({});

	// Handles the opening of the success notification
	const handleClick = () => {
			setOpen(true);
	};

	// Handles the closing of the success notification
	const handleClose = () => setOpen(false);

	const queryClient = useQueryClient();
	const addMutation = useMutation({
		mutationFn: addReservation,
		onSuccess: () => {
			queryClient.invalidateQueries(["reservations"]);
		},
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => updateReservation({ id, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: "reservations" });
			setReservationId(null);
		},
	});
	React.useEffect(() => {
		if (!reservationId || reservationId.length === 0) return;
		const getDataWillEdit = async () => {
			const data = await getReservationById(reservationId);
			setDataWillEdit(data);
		};
		getDataWillEdit();
	}, [reservationId]);

	const { name, mobile, email, date, time, guests, notes } = dataWillEdit || {};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: name || "",
			mobile: mobile || "",
			email: email || "",
			date: date || "",
			time: time || "",
			guests: guests || "",
			notes: notes || "",
		},
	});
	React.useEffect(() => {
		if (reservationId) {
			reset({
				name,
				mobile,
				email,
				date,
				time,
				guests,
				notes,
			});
		} else {
			reset({
				name: "",
				mobile: "",
				email: "",
				date: "",
				time: "",
				guests: "",
				notes: "",
			});
		}
	}, [date, email, guests, mobile, name, notes, reservationId, reset, time]);
	// Form submission handler
	const onSubmit = (data) => {
		if (formType === "edit") {
			updateMutation.mutate({ id: reservationId, data });
			console.log("Reservation data Updated:", data);
		} else {
			addMutation.mutate(data);
			handleClick();
			console.log("Reservation data submitted:", data);
		}
		handleModalClose()
		reset();
	};

	return (
		<>
			<Box
				component={"form"}
				sx={{ marginTop: "20px" }}
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<FormControl fullWidth sx={{ gap: 2 }}>
					<Grid container spacing={2}>
						{fields.map((field, index) => {
							return (
								<Grid size={{ xs: 12, lg: field.label === "notes" ? 12 : 6 }}>
									<TextField
										label={field.label}
										variant={field.variant}
										name={field.label}
										type={field.type}
										{...register(field.label, {
											required: "this is a required field",
											setValueAs: (value) => typeof value === "string" ? value.trim() : value,
											...(field.pattern && {
												pattern: {
													value: field.pattern,
													message: field.message,
												},
											}),
											...(field.min && {
												min: {
													value: field.min,
													message: field.message,
												},
											}),
											...(field.max && {
												max: {
													value: field.max,
													message: field.message,
												},
											}),
										})}
										error={!!errors[field.label]}
										helperText={errors[field.label]?.message}
										fullWidth
										focused
										key={index}
										sx={{
											"& .MuiInputBase-root": {
												backgroundColor: "var(--input-bg-color)",
												color: "var(--primary-text)",
												fontFamily: "var(--font)",
												'& input[type="date"]::-webkit-calendar-picker-indicator, & input[type="time"]::-webkit-calendar-picker-indicator':
													{
														filter:
															"invert(56%) sepia(81%) saturate(1748%) hue-rotate(7deg) brightness(94%) contrast(88%)",
														cursor: "pointer",
													},
											},
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "var(--highlight-color)",
												},
											},
											"& .MuiInputLabel-root": {
												color: "var(--primary-text)",
												textTransform: "capitalize",
												fontFamily: "var(--font)",
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "var(--highlight-color)",
											},
											"& .MuiFormHelperText-root": {
												color: errors[field.label]
													? "#D32F2F"
													: "var(--secondary-text)",
											},
										}}
									/>
								</Grid>
							);
						})}
					</Grid>

					{/* Submit button */}
					<Button
						variant="contained"
						type="submit"
						sx={{
							backgroundColor: "var(--highlight-color)",
							fontWeight: "500",
							fontSize: "1.5rem",
							color: "var(--primary-text)",
							textTransform: "none",
							fontFamily: "var(--font)",
						}}
					>
						Book
					</Button>
				</FormControl>
			</Box>
			{/* Success notification */}
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{
						width: { xs: "300px", md: "400px" },
						fontFamily: "var(--font)",
					}}
				>
					Table booked successfully!
				</Alert>
			</Snackbar>
		</>
	);
};

export default ReservationForm;
