import * as React from "react";
import {
	Box,
	Typography,
	Container,
	Stack,
	Button,
	TextField,
	useTheme,
	alpha,
	Snackbar,
	Alert,
} from "@mui/material";
import images from "../../utils/images";

// ThirdSection component renders a newsletter subscription section with a background image, form, and success notification
const ThirdSection = () => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	// Handles the opening of the success notification
	const handleClick = () => setOpen(true);

	// Handles the closing of the success notification
	const handleClose = () => setOpen(false);

	// Handles the subscription form submission
	const handleSubscription = (e) => {
		e.preventDefault();
		handleClick();
		console.log("Subscription form submitted");
		e.target.reset();
	};

	return (
		<>
			{/* Main container with background image and overlay */}
			<Box
				sx={{
					position: "relative",
					height: "400px",
					display: "flex",
					alignItems: "center",
					marginTop: "2.5rem",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundImage: `url(${images.Newsletter})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						zIndex: -2,
					},
					"&::after": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: alpha(theme.palette.common.black, 0.8),
						zIndex: -1,
					},
				}}
			>
				{/* Content container */}
				<Container maxWidth="lg" sx={{ padding: "2rem" }}>
					<Stack
						direction="column"
						spacing={2}
						sx={{
							alignItems: "center",
						}}
					>
						{/* Newsletter title */}
						<Typography
							variant="body2"
							sx={{
								color: "var(--primary-text)",
								fontSize: { xs: "0.5rem", sm: "1rem" },
								textAlign: "center",
								fontFamily: "var(--font)",
								"&::after": {
									content: '""',
									display: "block",
									width: "50px",
									height: "2px",
									backgroundColor: "var(--highlight-color)",
									margin: "0.5rem auto",
								},
							}}
						>
							NEWS LETTER
						</Typography>
						{/* Main heading */}
						<Typography
							variant="h2"
							sx={{
								color: "var(--primary-text)",
								fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
								fontWeight: 700,
								lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
								textAlign: { xs: "center", sm: "left" },
								fontFamily: "var(--font)",
							}}
						>
							Subscribe Our Newsletter{" "}
						</Typography>
						{/* Description */}
						<Typography
							variant="body2"
							sx={{
								color: "var(--secondary-text)",
								fontSize: { xs: "0.8rem", sm: "1rem" },
								fontFamily: "var(--font)",
								textAlign: "center",
							}}
						>
							Be the first to hear about our latest dishes, exclusive offers,
							seasonal menus, and behind-the-scenes stories from our kitchen.
							Join our food-loving community and never miss a tasty update!
						</Typography>
						{/* Subscription form */}
						<Box
							component={"form"}
							sx={{
								display: "flex",
								gap: 2,
								flexDirection: { xs: "column", sm: "row" },
								width: "100%",
							}}
							onSubmit={handleSubscription}
						>
							{/* Email input field */}
							<TextField
								id="outlined-basic"
								label="Your Email"
								placeholder="example@mail.com"
								variant="outlined"
								required
								sx={{
									flexGrow: 1,
									fontFamily: "var(--font)",
									"& .MuiInputBase-root": {
										backgroundColor: "var(--input-bg-color)",
										color: "var(--primary-text)",
									},
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "var(--highlight-color)",
										},
									},
									"& .MuiInputLabel-root": {
										color: "var(--primary-text)",
									},
									"& .MuiInputLabel-root.Mui-focused": {
										color: "var(--highlight-color)",
									},
									"& .MuiFormLabel-asterisk": {
										display: "none",
									},
								}}
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
								Subscribe
							</Button>
						</Box>
					</Stack>
				</Container>
			</Box>
			{/* Success notification */}
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: { xs: "300px", md: "400px" }, fontFamily: "var(--font)", }}>
					Subscription successful! <br /> Stay tuned for delicious updates!
				</Alert>
			</Snackbar>
		</>
	);
};

export default ThirdSection;
