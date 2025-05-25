import * as React from "react";
import { Box, Typography, Container, Stack, Grid, Button } from "@mui/material";
import images from "../../utils/images";

// Content for the sections displayed in the SecondSection component
// Each object represents a section with a tagline, title, description, image, and alt text
const sectionContent = [
	{
		tagline: "About Us",
		title: "We Invite You to Visit Our Restaurant",
		description:
			"Step into a warm, welcoming space where every meal is made with passion and served with care. Come hungry — leave happy.",
		img: images.firstGroup,
		alt: "Chef cooking in the kitchen",
	},
	{
		tagline: "Our Menu",
		title: "Quality Ingredients, Freshly Prepared",
		description:
			"We handpick the freshest ingredients to create meals that are full of flavor, nutrition, and love. Quality you can taste in every bite.",
		img: images.secondGroup,
		alt: "Chef preparing fresh ingredients",
	},
	{
		tagline: "Our Team",
		title: "Discover Tips & Recipes from Our Chef",
		description:
			"Get a behind-the-scenes look at our kitchen! Try chef-approved tips and recipes to bring restaurant magic home.",
		img: images.thirdGroup,
		alt: "Chef sharing tips and recipes",
	},
];
// SecondSection component renders a section with multiple content blocks
// Each block contains a title, description, image, and a button to explore the menu
const SecondSection = ({goMenu}) => {
	return (
		<>
			<Container maxWidth="lg" sx={{ padding: "2rem" }}>
				<Grid container>
					{sectionContent.map((item, index) => {
						return (
							<Stack
								direction={{ xs: "column", md: "row" }}
								key={index}
								sx={{
									padding: { xs: "1rem", md: "0 1rem" },
									gap: "2rem",
								}}
							>
								{/* Text content section */}
								<Stack
									direction="column"
									spacing={2}
									order={{ xs: 0, md: index % 2 === 0 ? 0 : 1 }}
									alignItems="start"
									justifyContent="center"
								>
									{/* Tagline */}
									<Typography
										variant="body2"
										sx={{
											color: "var(--primary-text)",
											fontFamily:"var(--font)",
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
										{item.tagline}
									</Typography>
									{/* Title */}
									<Typography
										variant="h3"
										sx={{
											color: "var(--primary-text)",
											fontSize: { xs: "1rem", md: "1.5rem"},
											lineHeight: { xs: "1.5rem", md: "2.5rem", lg: "3.5rem" },
											fontWeight: "bold",
											textAlign: "left",
											fontFamily:"var(--font)",
										}}
									>
										{item.title}
									</Typography>
									{/* Description */}
									<Typography
										variant="body1"
										sx={{
											color: "var(--secondary-text)",
											fontSize: { xs: "1rem", md: "1.5rem" },
											lineHeight: { xs: "1.2rem", md: "2rem" },
											textAlign: "left",
											fontFamily:"var(--font)",
										}}
									>
										{item.description}
									</Typography>
									{/* Button to explore menu */}
									<Button
										variant="contained"
										sx={{
											backgroundColor: "var(--highlight-color)",
											color: "var(--primary-text)",
											fontSize: { xs: "0.8rem", md: "1rem" },
											padding: "0.5rem 1rem",
											borderRadius: "4px",
											fontFamily:"var(--font)",
											"&:hover": {
												transform: "scale(1.05)",
											},
											marginX:0
										}}
										onClick={goMenu}>Explore Menu</Button>
								</Stack>
								{/* Image section */}
								<Box
									component="img"
									src={item.img}
									alt={item.alt}
									loading="lazy"
									sx={{
										width: "100%",
										height: "auto",
										maxWidth: "560px",
									}}
									order={{ xs: 0, md: index % 2 === 0 ? 1 : 0 }}
								/>
							</Stack>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};

export default SecondSection;
