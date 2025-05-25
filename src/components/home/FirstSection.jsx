import * as React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import images from "../../utils/images";
const sectionContent = [
	{
		title: "MENU FOR EVERY TASTE",
		description:
			" Whether you're in the mood for classic comfort food or adventurous flavors, our menu is crafted to satisfy every craving. With fresh ingredients and a wide variety of options, there’s something here for everyone to enjoy.",
		icon: images.tray,
		alt: "Served meal icon",
	},
	{
		title: "ALWAYS QUALITY",
		description:
			" We never compromise on taste or standards. From carefully sourced ingredients to expert preparation, every dish reflects our commitment to quality. Consistency, freshness, and flavor — that's what sets us apart, every single time.",
		icon: images.reliability,
		alt: "Reliability icon",
	},
	{
		title: "EXPERIENCED CHEFS",
		description:
			" Our chefs bring years of culinary expertise to every plate. With passion, precision, and creativity, they craft dishes that not only taste amazing but leave a lasting impression. Great food starts with great talent — and we’ve got the best in the kitchen.",
		icon: images.chef,
		alt: "Chef icon",
	},
];
const FirstSection = () => {
	return (
		<>
			<Container maxWidth="lg" sx={{ padding: "2rem" }}>
				<Stack
					direction="column"
					spacing={4}
					sx={{
						alignItems: "center",
					}}
				>
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
						FEATURES
					</Typography>
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
						Why people choose us?
					</Typography>
					<Typography
						variant="body2"
						sx={{
							color: "var(--secondary-text)",
							fontFamily: "var(--font)",
							fontSize: { xs: "1rem", lg: "1.1rem" },
						}}
					>
						Fresh ingredients, bold flavors, and a menu that satisfies every
						craving — all served with a side of great hospitality.{" "}
					</Typography>
				</Stack>
				{/* Services row*/}
				<Stack
					direction={{ xs: "column", md: "row" }}
					spacing={4}
					sx={{
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
						marginTop: "2rem",
						paddingTop: "50px",
					}}
				>
					{sectionContent.map((item, index) => {
						return (
							<Stack
								direction="column"
								spacing={2}
								sx={{ alignItems: "center", cursor: "pointer" }}
								key={index}
							>
								<Box
									component="img"
									src={item.icon}
									alt={item.alt}
									loading="lazy"
									sx={{
										filter: "invert(1)",
										width: "50px",
										transition: "transform 0.3s ease-in-out",
										"&:hover": { transform: "translateY(-5px)" },
									}}
								/>
								<Typography
									variant="body1"
									sx={{
										color: "var(--primary-text)",
										fontFamily: "var(--font)",
									}}
								>
									{item.title}
								</Typography>
								<Typography
									variant="body2"
									sx={{
										color: "var(--secondary-text)",
										fontFamily: "var(--font)",
									}}
								>
									{item.description}{" "}
								</Typography>
							</Stack>
						);
					})}
				</Stack>
			</Container>
		</>
	);
};

export default FirstSection;
