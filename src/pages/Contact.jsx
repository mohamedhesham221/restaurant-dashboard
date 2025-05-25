import * as React from "react";
import Layout from "../layouts/layout";
import { ContactHeader, ContactForm } from "../components/contact";
import { Container, Box, useTheme, alpha } from "@mui/material";
import images from "../utils/images";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const Contact = () => {
	const theme = useTheme();

	return (
		<>
			<PageMeta
				title={metaData.contact.title}
				description={metaData.contact.description}
			/>
			<Layout>
				<Box
					sx={{
						position: "relative",
						height: "100vh",
						display: "flex",
						alignItems: "center",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundImage: `url(${images.ContactBG})`,
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
							backgroundColor: alpha(theme.palette.common.black, 0.6), //
							zIndex: -1,
						},
					}}
				>
					<Container maxWidth="lg" sx={{ padding: "2rem" }}>
						<ContactHeader />
						<ContactForm />
					</Container>
				</Box>
			</Layout>
		</>
	);
};

export default Contact;
