import * as React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";

const stats = [
	{
		name: "1287",
		description: "VISITORS DAILY",
	},
	{
		name: "578",
		description: "DELIVERIES MONTHLY",
	},
	{
		name: "1440",
		description: "POSITIVE FEEDBACK",
	},
	{
		name: "40",
		description: "AWARDS AND HONORS",
	},
];
const SecondSection = () => {
	return (
		<>
			<Container maxWidth="lg" sx={{ padding: "2rem" }}>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={3}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					{stats.map((stat, index) => {
						return (
							<Box
								component="div"
								key={index}
								sx={{ color: "var(--primary-text)" }}
							>
								<Typography
									variant="body1"
									sx={{
										textAlign: "center",
										fontWeight: "600",
										fontSize: "2rem",
										fontFamily: "var(--font)",
									}}
								>
									{stat.name}+
								</Typography>
								<Typography
									variant="body2"
									sx={{ fontSize: "0.7rem", fontFamily: "var(--font)" }}
								>
									{stat.description}
								</Typography>
							</Box>
						);
					})}
				</Stack>
			</Container>
		</>
	);
};

export default SecondSection;
