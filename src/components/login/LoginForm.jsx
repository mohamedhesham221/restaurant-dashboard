import * as React from "react";
import { TextField, Button, Box, FormControl, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../firebase/firebaseAuth";
import { useForm } from "react-hook-form";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const LoginForm = () => {
	const [formMessage, setFormMessage] = React.useState(null);
	const navigate = useNavigate();
	// Destructure methods from useForm hook for form handling
	const {
		register, // Used to register input fields for validation
		handleSubmit, // Handles form submission
		reset, // Resets the form fields
	} = useForm({
		// Set default values for the form fields
		defaultValues: {
			email: "",
			password: "",
		},
	});
	// Function to handle form submission
	const onSubmit = async (data) => {
		console.log("Form Data:", data); // Log form data for debugging
		const { email, password } = data; // Destructure form data
		try {
			// Attempt to register the user with provided credentials
			await signInUser(email, password);
			setFormMessage("success"); // Set success message
			setTimeout(() => {
				navigate("/"); // Redirect to login page after 1.5 seconds
			}, 1500);
		} catch (error) {
			// Handle specific error for email already in use
			if (error.code === "auth/invalid-credential") {
				return setFormMessage("fails"); // Set failure message
			}
		}
		reset(); // Reset the form fields
	};
	return (
		<>
			<Box component="div">
				<Typography
					variant="h1"
					sx={{
						color: "var(--primary-text)",
						fontSize: { xs: "2rem", md: "3rem" },
						fontFamily: "var(--font)",
					}}
				>
					Welcome Back!
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<FormControl fullWidth margin="normal">
						<TextField
							type="email"
							variant="filled"
							label="email"
							placeholder="example@mail.com"
							{...register("email", {
								required: "This field is required",
							})}
							sx={{
								"& .MuiInputBase-root": {
									backgroundColor: "var(--input-bg-color)",
									color: "var(--secondary-text)",
									fontFamily: "Poppins, sans-serif",
								},
								"& input::placeholder": {
									color: "var(--secondary-text)",
									opacity: 1,
									fontFamily: "Poppins, sans-serif",
								},
								"& .MuiInputLabel-root": {
									color: "var(--secondary-text)",
									fontFamily: "Poppins, sans-serif",
								},
							}}
						/>
					</FormControl>

					<FormControl fullWidth margin="normal">
						<TextField
							type="password"
							variant="filled"
							label="password"
							{...register("password", {
								required: "This field is required",
							})}
							sx={{
								"& .MuiInputBase-root": {
									backgroundColor: "var(--input-bg-color)",
									color: "var(--secondary-text)",
									fontFamily: "Poppins, sans-serif",
								},
								"& input::placeholder": {
									color: "var(--secondary-text)",
									opacity: 1,
									fontFamily: "Poppins, sans-serif",
								},
								"& .MuiInputLabel-root": {
									color: "var(--secondary-text)",
									fontFamily: "Poppins, sans-serif",
								},
							}}
						/>
					</FormControl>
					<Button
						type="submit"
						variant="contained"
						sx={{
							width: "100%",
							backgroundColor: "var(--highlight-color)",
							color: "var(--primary-text)",
							fontSize: { xs: "0.8rem" },
							padding: "0.5rem ",
							borderRadius: "4px",
							fontFamily: "Poppins, sans-serif",
							transform: "scaleX(1)",
							transition: "all 0.3s ease",
							"&:hover": {
								transform: "scaleX(0.96)",
							},
							marginX: 0,
						}}
					>
						log in
					</Button>
					{/**render message if form success or failed */}
					{formMessage === "success" && (
						<Typography
							variant="body2"
							color="success"
							marginY={"10px"}
							display={"flex"}
							justifyContent={"start"}
							alignItems={"end"}
							gap={"8px"}
						>
							<CheckCircleOutlineIcon /> Successfuly login
						</Typography>
					)}

					{formMessage === "fails" && (
						<Typography
							variant="body2"
							color="error"
							marginY={"10px"}
							display={"flex"}
							justifyContent={"start"}
							alignItems={"end"}
							gap={"8px"}
						>
							<WarningAmberIcon /> Email or Password is incorrect
						</Typography>
					)}

					<Typography
						variant="body1"
						sx={{
							color: "var(--secondary-text)",
							textAlign: "center",
							marginTop: "1rem",
							fontFamily: "Poppins, sans-serif",
						}}
					>
						- Don't have an account?{" "}
						<Link
							to="/register"
							style={{
								color: "var(--highlight-color)",
								fontFamily: "Poppins, sans-serif",
							}}
						>
							Sign up
						</Link>{" "}
						-
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default LoginForm;
