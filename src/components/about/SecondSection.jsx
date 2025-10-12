import * as React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import CountUp from "react-countup";

const stats = [
	{
		count: 500,
		title: "VISITORS DAILY",
	},
	{
		count: 320,
		title: "DELIVERIES MONTHLY",
	},
	{
		count: 1020,
		title: "POSITIVE FEEDBACK",
	},
	{
		count: 40,
		title: "AWARDS AND HONORS",
	},
];
const SecondSection = () => {
	return (
		<>
			<Container maxWidth="lg" sx={{ padding: "2rem", marginY: {md: "3rem"} }}>
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
										
										fontFamily: "var(--font)",
									}}
								>
									<CountUp start={0} end={stat.count} duration={2} style={{fontSize: "2rem",}} suffix="+" enableScrollSpy scrollSpyOnce/>
								</Typography>
								<Typography
									variant="body2"
									sx={{ fontSize: "0.7rem", fontFamily: "var(--font)" }}
								>
									{stat.title}
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
