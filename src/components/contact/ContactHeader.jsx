import * as React from "react";
import { Typography, Stack } from "@mui/material";

// This component renders the header section for the Contact page, including a title and a description.
const ContactHeader = () => {
	return (
		<>
			<Stack
				direction="column"
				spacing={2}
				sx={{
					alignItems: "center",
				}}
			>
				<Typography
					variant="h2"
					sx={{
						color: "var(--primary-text)",
						fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
						fontFamily: "var(--font)",
						fontWeight: 700,
						lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
						textAlign: { xs: "center", sm: "left" },
					}}
				>
					Contact Us{" "}
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: "var(--secondary-text)",
						fontSize: { xs: "0.8rem", sm: "1.1rem" },
						fontFamily: "var(--font)",
						textAlign: "center",
					}}
				>
					We're here to help! Whether it’s a reservation, catering inquiry, or just feedback — reach out and we’ll get back to you as soon as possible.
				</Typography>
			</Stack>
		</>
	);
};

export default ContactHeader;
