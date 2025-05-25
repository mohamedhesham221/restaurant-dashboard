import * as React from "react";
import NotFoundImg from "../assets/404.png";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const NotFound = () => {
	// Render the NotFound page with an image, message, and a link to the home page
	return (
		<>
			<PageMeta
				title={metaData.notFound.title}
				description={metaData.notFound.description}
			/>
			<Container>
				<Box
					component="img"
					src={NotFoundImg}
					alt="Not found 404 page"
					sx={{
						width: "100%",
						height: "auto",
						maxWidth: { xs: "300px", md: "500px" },
						margin: "0 auto",
						display: "block",
					}}
				/>
				<Typography
					variant="h4"
					align="center"
					color="var(--secondary-text)"
					sx={{ margin: "20px 0" }}
				>
					The page you are looking for does not exist.
				</Typography>
				<Box
					component={Link}
					to="/"
					sx={{
						margin: "20px 0",
						textAlign: "center",
						display: "block",
						textDecoration: "none",
						color: "var(--highlight-color)",
					}}
				>
					home page
				</Box>
			</Container>
		</>
	);
};

export default NotFound;
