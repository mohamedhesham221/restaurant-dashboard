import * as React from "react";
import {
	Box,
	TextField,
	FormControl,
	Typography,
	Button,
	Stack,
	FormControlLabel,
	FormLabel,
	Radio,
	FormHelperText,
	RadioGroup,
	Snackbar,
	Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import useOrderStore from "../../store/useOrderStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder } from "../../firebase/ordersDB";
import { useNavigate } from "react-router-dom";
// Component for capturing customer data and placing an order
const CustomerData = () => {
	const navigate = useNavigate();
	const clearOrders = useOrderStore((state) => state.clearOrders);
	const orderBag = useOrderStore((state) => state.orders);
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	const addMutation = useMutation({
		mutationFn: addOrder,
		onSuccess: () => {
			// Invalidate the "orders" query to refresh the data after a successful mutation
			queryClient.invalidateQueries({ queryKey: "orders" });
		},
	});

	// Form submission handler
	const onSubmit = (data) => {
		console.log("Order data submitted:", { ...data, orderBag });
		// Trigger the mutation to add the order
		addMutation.mutate({ ...data, orderBag });
		// Show success message
		setOpen(true);
		// Clear the order bag and reset the form
		clearOrders();
		reset();
		// Navigate back to the menu page
		setTimeout(() => {
			navigate("/menu");
		}, 1500);
	};

	// Styles for the form fields
	const styles = {
		flexGrow: 1,
		fontFamily: "var(--font)",
		"& .MuiInputBase-root": {
			backgroundColor: "var(--input-bg-color)",
			color: "var(--primary-text)",
			fontFamily: '"Poppins", sans-serif',
		},
		"& .MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: "var(--highlight-color)",
			},
		},
		"& .MuiInputLabel-root": {
			color: "var(--primary-text)",
			fontFamily: '"Poppins", sans-serif',
		},
		"& .MuiInputLabel-root.Mui-focused": {
			color: "var(--highlight-color)",
		},
	};

	return (
		<>
			{/* Form for capturing customer details */}
			<Box
				component={"form"}
				sx={{ marginTop: "20px" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormControl fullWidth sx={{ gap: 2 }}>
					{/* Input field for Name */}
					<Stack direction={{ xs: "column", lg: "row" }} spacing="8px">
						<TextField
							label="Name"
							variant="outlined"
							name="name"
							type="text"
							{...register("name", {
								required: "Name is required",
								pattern: {
									value: /^[A-Za-z\s]{2,50}$/,
									message: "Enter a valid name (only letters, 2-50 chars)",
								},
							})}
							error={!!errors.name}
							helperText={errors.name?.message}
							fullWidth
							sx={styles}
						/>
						{/* Input field for Email */}
						<TextField
							label="Email"
							variant="outlined"
							name="email"
							type="email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
									message: "Enter a valid email address",
								},
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
							fullWidth
							sx={styles}
						/>
					</Stack>
					{/* Input field for Phone Number */}
					<Stack direction={{ xs: "column", lg: "row" }} spacing="8px">
						<TextField
							label="Phone Number"
							variant="outlined"
							name="phone"
							type="tel"
							{...register("phone", {
								required: "Phone number is required",
								pattern: {
									value: /^[0-9]{10,15}$/,
									message: "Enter a valid phone number",
								},
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
							fullWidth
							sx={{ ...styles, width: { xs: "100%", lg: "40%" } }}
						/>

						{/* Input field for City */}
						<TextField
							label="City"
							variant="outlined"
							name="city"
							type="text"
							{...register("city", {
								required: "City is required",
								pattern: {
									value: /^[A-Za-z\s]{2,50}$/,
									message: "Enter a valid city name (only letters)",
								},
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
							fullWidth
							sx={{ ...styles, width: { xs: "100%", lg: "40%" } }}
						/>
						{/* Radio buttons for Payment Method */}
						<FormControl
							component="fieldset"
							error={!!errors.payment}
							sx={{ ...styles, width: { xs: "100%", lg: "20%" } }}
						>
							<FormLabel
								component="legend"
								sx={{
									color: "var(--primary-text)",
									fontFamily: "var(--font)",
									"&.Mui-focused": {
										color: "var(--primary-text)", 
									},
								}}
							>
								Payment Method
							</FormLabel>
							<Controller
								name="payment"
								control={control}
                defaultValue=""
								rules={{ required: "Please select a payment method" }}
								render={({ field }) => (
									<RadioGroup row {...field}>
										<FormControlLabel
											value="cash"
											control={
												<Radio
													sx={{
														color: "#ad8985",
														"&.Mui-checked": {
															color: "var(--highlight-color)",
														},
													}}
												/>
											}
											label="Cash"
											sx={{ color: "var(--primary-text)",fontFamily: "var(--font)" }}
										/>
										<FormControlLabel
											value="visa"
											control={
												<Radio
													sx={{
														color: "#ad8985",
														"&.Mui-checked": {
															color: "var(--highlight-color)",
														},
													}}
												/>
											}
											label="Visa"
											sx={{ color: "var(--primary-text)", fontFamily: "var(--font)" }}
										/>
									</RadioGroup>
								)}
							/>{" "}
							<FormHelperText>{errors.payment?.message}</FormHelperText>
						</FormControl>
					</Stack>
					{/* Input field for Address */}
					<TextField
						label="Address"
						variant="outlined"
						name="address"
						type="text"
						{...register("address", {
							required: "Address is required",
							pattern: {
								value: /^[\w\s\-,.#]{5,100}$/,
								message: "Enter a valid address (5-100 characters)",
							},
						})}
						error={!!errors.address}
						helperText={errors.address?.message}
						fullWidth
						sx={styles}
					/>
					{/* Submit button */}
					<Button
						variant="contained"
						type="submit"
						sx={{
							width: "fit-content",
							backgroundColor: "var(--highlight-color)",
							color: "var(--primary-text)",
							fontSize: { xs: "0.8rem", md: "1rem" },
							padding: ".5rem 1rem",
							borderRadius: "4px",
							fontFamily: "var(--font)",
							"&:hover": {
								transform: "scale(1.05)",
							},
							marginX: 0,
						}}
					>
						Place Order
					</Button>
				</FormControl>
			</Box>
			{/* Snackbar to display successfully Order placed  message*/}
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={open}
				autoHideDuration={5000}
			>
				<Alert severity="success" variant="filled" sx={{ width: "100%", fontFamily: "var(--font)" }}>
					Order placed successfully!
				</Alert>
			</Snackbar>
		</>
	);
};

export default CustomerData;
