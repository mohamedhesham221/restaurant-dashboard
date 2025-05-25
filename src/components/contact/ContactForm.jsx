import * as React from "react";
import { TextField, Button, Box, FormControl, FormLabel } from "@mui/material";

// ContactForm component handles a simple contact form with fields for name, email, and message.
// It uses Material-UI components for styling and state management with React's useState hook.
const ContactForm = () => {
	const [formData, setFormData] = React.useState({
		name: "",
		email: "",
		message: "",
	});

	// Handles form submission and logs the form data to the console.
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ formData });
	};

	return (
		<>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					maxWidth: 400,
					mx: "auto",
					my: 5,
					p: 2,
					backgroundColor: "var(--primary-text)",
					borderRadius: "5px",
				}}
			>
				{/* Name input field */}
				<FormControl fullWidth margin="normal">
					<FormLabel
						sx={{
							color: "var(--input-bg-color)",
							fontFamily: "var(--font)",
						}}
					>
						Name
					</FormLabel>
					<TextField
						value={formData.name}
						variant="standard"
						placeholder="John Doe"
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						required
						sx={{
							fontFamily: "var(--font)",
							"& .MuiInputBase-root": {
								color: "var(--secondary-text)",
							},
							"& .MuiInput-underline:before": {
								borderBottomColor: "var(--input-bg-color)",
							},
							"& .MuiInput-underline:after": {
								borderBottomColor: "var(--highlight-color)",
							},
							"& input::placeholder": {
								color: "var(--secondary-text)",
								opacity: 1,
							},
						}}
					/>
				</FormControl>

				{/* Email input field */}
				<FormControl fullWidth margin="normal">
					<FormLabel
						sx={{
							color: "var(--input-bg-color)",
							fontFamily: "var(--font)",
						}}
					>
						Email
					</FormLabel>
					<TextField
						type="email"
						variant="standard"
						placeholder="example@mail.com"
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						required
						sx={{
							fontFamily: "var(--font)",
							"& .MuiInputBase-root": {
								color: "var(--secondary-text)",
							},
							"& .MuiInput-underline:before": {
								borderBottomColor: "var(--input-bg-color)",
							},
							"& .MuiInput-underline:after": {
								borderBottomColor: "var(--highlight-color)",
							},
							"& input::placeholder": {
								color: "var(--secondary-text)",
								opacity: 1,
							},
						}}
					/>
				</FormControl>

				{/* Message input field */}
				<FormControl fullWidth margin="normal">
					<FormLabel
						sx={{
							color: "var(--input-bg-color)",
							fontFamily: "var(--font)",
						}}
					>
						Message
					</FormLabel>
					<TextField
						multiline
						variant="standard"
						rows={4}
						value={formData.message}
						onChange={(e) =>
							setFormData({ ...formData, message: e.target.value })
						}
						required
						sx={{
							fontFamily: "var(--font)",
							"& .MuiInputBase-root": {
								backgroundColor: "transparent",
								color: "var(--secondary-text)",
								padding: "0.5rem",
								border: "1px solid var(--input-bg-color)",
								borderRadius: "4px",
							},
							"& .MuiInput-underline:before": {
								borderBottomColor: "transparent",
							},
							"& .MuiInput-underline:after": {
								borderBottomColor: "transparent",
							},
						}}
					/>
				</FormControl>

				{/* Submit button */}
				<Button
					variant="contained"
					type="submit"
					fullWidth
					sx={{
						backgroundColor: "var(--highlight-color)",
						color: "var(--primary-text)",
						fontSize: { xs: "0.8rem", md: "1rem" },
						fontFamily: "var(--font)",
						padding: ".5rem 1rem",
						borderRadius: "4px",
						"&:hover": {
							transform: "scale(1.05)",
						},
						marginX: 0,
					}}
				>
					Send Message
				</Button>
			</Box>
		</>
	);
};

export default ContactForm;
