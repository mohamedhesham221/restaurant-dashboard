import * as React from "react";
import { Typography, Stack, Container } from "@mui/material";

// MenuHeader component renders the header section of the menu page
// It includes a title, subtitle, and a description with styled typography and layout
const MenuHeader = () => {
	return (
		<>
			<Container maxWidth="lg" sx={{ padding: "2rem" }}>
				<Stack
					direction="column"
					spacing={2}
					sx={{
						alignItems: "center",
					}}
				>
					{/* Section title */}
					<Typography
						variant="body2"
						sx={{
							color: "var(--primary-text)",
							fontFamily: "var(--font)",
							"&::after": {
								content: '""',
								display: "block",
								width: "100%",
								height: "2px",
								backgroundColor: "var(--highlight-color)",
								margin: "0.5rem auto",
							},
						}}
					>
						Menu
					</Typography>
					{/* Main header */}
					<Typography
						variant="h2"
						sx={{
							color: "var(--primary-text)",
							fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
							fontWeight: 700,
							fontFamily: "var(--font)",
							lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
							textAlign: { xs: "center", sm: "left" },
						}}
					>
						Explore Our Foods{" "}
					</Typography>
					{/* Description text */}
					<Typography
						variant="body2"
						sx={{
							color: "var(--secondary-text)",
							fontSize: { xs: "0.8rem", sm: "1rem" },
							textAlign: "center",
							fontFamily: "var(--font)",
						}}
					>
						Discover a world of flavor with our handpicked selection of dishes
						crafted from the freshest ingredients. Whether you're craving
						something comforting or adventurous, our menu has something to
						satisfy every taste.
					</Typography>
				</Stack>
			</Container>
		</>
	);
};

export default MenuHeader;
